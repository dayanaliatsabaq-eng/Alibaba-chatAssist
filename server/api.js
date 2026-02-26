import express from 'express'

// ─── Helper: fetch with timeout ─────────────────────────────────────────────
async function fetchWithTimeout(url, options, timeoutMs = 55000) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    try {
        const response = await fetch(url, { ...options, signal: controller.signal })
        return response
    } finally {
        clearTimeout(timer)
    }
}

// ─── Helper: fetch with retry ───────────────────────────────────────────────
async function fetchWithRetry(url, options, { retries = 2, delayMs = 2000, timeoutMs = 55000 } = {}) {
    let lastError
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url, options, timeoutMs)
            if (response.status >= 500 && attempt < retries) {
                const text = await response.text()
                console.warn(`Attempt ${attempt} got ${response.status}, retrying in ${delayMs}ms`)
                await new Promise(r => setTimeout(r, delayMs))
                continue
            }
            return response
        } catch (err) {
            lastError = err
            console.warn(`Attempt ${attempt} failed (${err.name === 'AbortError' ? 'TIMEOUT' : err.message})`)
            if (attempt < retries) await new Promise(r => setTimeout(r, delayMs))
        }
    }
    throw lastError || new Error('All retry attempts failed')
}

// ─── Helper: extract response text from n8n payload ─────────────────────────
function extractResponseText(data) {
    const candidates = Array.isArray(data) ? data : [data]
    for (const item of candidates) {
        if (!item || typeof item !== 'object') continue
        const direct = item.response || item.output || item.text || item.message || item.answer
        if (direct && typeof direct === 'string' && direct.trim()) return direct.trim()
        const nested =
            item?.json?.response || item?.json?.output || item?.json?.text ||
            item?.data?.response || item?.data?.output || item?.body?.response
        if (nested && typeof nested === 'string' && nested.trim()) return nested.trim()
    }
    return null
}

// ─── Helper: extract suggestions from n8n payload ───────────────────────────
function extractSuggestions(data) {
    const candidates = Array.isArray(data) ? data : [data]
    for (const item of candidates) {
        if (!item || typeof item !== 'object') continue
        const s = item.suggestions || item?.json?.suggestions || item?.data?.suggestions
        if (Array.isArray(s)) return s.map(String).filter(Boolean).slice(0, 3)
    }
    return []
}

// ─── Create the Express API router ──────────────────────────────────────────
export function createApiRouter() {
    const router = express.Router()
    router.use(express.json({ limit: '10mb' }))

    // ── POST /api/chat ──────────────────────────────────────────────────────────
    router.post('/api/chat', async (req, res) => {
        try {
            const { message, timestamp, sessionId } = req.body || {}
            if (!message) return res.status(400).json({ error: 'Message is required' })

            const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
            if (!n8nWebhookUrl) {
                console.error('N8N_WEBHOOK_URL not configured in .env')
                return res.status(500).json({
                    error: 'Server configuration error',
                    response: 'Chat server is not configured yet. Please set N8N_WEBHOOK_URL in your .env file.'
                })
            }

            const n8nResponse = await fetchWithRetry(
                n8nWebhookUrl,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message,
                        timestamp: timestamp || new Date().toISOString(),
                        sessionId: sessionId || 'unknown'
                    })
                },
                { retries: 2, delayMs: 2000, timeoutMs: 55000 }
            )

            const rawText = await n8nResponse.text()
            if (!n8nResponse.ok) {
                console.error(`n8n returned HTTP ${n8nResponse.status}:`, rawText.substring(0, 500))
                throw new Error(`n8n webhook error: ${n8nResponse.status}`)
            }

            let data
            try { data = JSON.parse(rawText) }
            catch { throw new Error('Invalid JSON from n8n') }

            const responseText = extractResponseText(data)
            if (!responseText) throw new Error('No response text found in n8n payload')

            const suggestions = extractSuggestions(data)
            const payload = Array.isArray(data) ? data[0] : data
            const returnedSessionId = payload?.sessionId || payload?.json?.sessionId || sessionId

            return res.json({
                response: responseText,
                output: responseText,
                text: responseText,
                suggestions,
                sessionId: returnedSessionId,
                timestamp: payload?.timestamp || new Date().toISOString()
            })

        } catch (error) {
            const isTimeout = error.name === 'AbortError' || error.message?.includes('abort')
            console.error('Chat API error:', error.message)
            const userMessage = isTimeout
                ? "I'm taking a bit longer than usual — please send your message again."
                : "I ran into a hiccup, please try again in a moment."
            return res.status(500).json({ error: 'Failed to process message', message: error.message, response: userMessage })
        }
    })

    // ── POST /api/transcribe ────────────────────────────────────────────────────
    router.post('/api/transcribe', async (req, res) => {
        try {
            const { audio, mimeType } = req.body || {}
            if (!audio) return res.status(400).json({ error: 'Audio data is required' })

            const deepgramApiKey = process.env.DEEPGRAM_API_KEY
            if (!deepgramApiKey) {
                console.error('DEEPGRAM_API_KEY not configured in .env')
                return res.status(500).json({ error: 'Server configuration error' })
            }

            let base64Data = audio
            let detectedMimeType = mimeType || 'audio/webm;codecs=opus'

            if (typeof audio === 'string' && audio.startsWith('data:')) {
                const matches = audio.match(/^data:([^;]+);base64,(.+)$/)
                if (matches) {
                    detectedMimeType = matches[1]
                    base64Data = matches[2]
                } else {
                    return res.status(400).json({ error: 'Malformed audio data URL' })
                }
            }

            const audioBuffer = Buffer.from(base64Data, 'base64')
            if (audioBuffer.length === 0) return res.status(400).json({ error: 'Audio buffer is empty' })

            const baseType = detectedMimeType.split(';')[0].trim().toLowerCase()
            const mimeMap = {
                'audio/x-m4a': 'audio/mp4',
                'audio/mpeg': 'audio/mp3',
                'video/webm': 'audio/webm',
                'video/mp4': 'audio/mp4',
            }
            const contentType = mimeMap[baseType] || baseType

            const deepgramUrl = 'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true&language=en'
            const deepgramResponse = await fetch(deepgramUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${deepgramApiKey}`,
                    'Content-Type': contentType,
                },
                body: audioBuffer
            })

            const rawText = await deepgramResponse.text()
            if (!deepgramResponse.ok) throw new Error(`Deepgram API error: ${deepgramResponse.status}`)

            let data
            try { data = JSON.parse(rawText) }
            catch { throw new Error('Invalid JSON from Deepgram') }

            const transcript = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || ''
            return res.json({ transcript, success: true })

        } catch (error) {
            console.error('Transcription error:', error.message)
            return res.status(500).json({ error: 'Transcription failed', message: error.message })
        }
    })

    return router
}
