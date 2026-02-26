import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Session ID ────────────────────────────────────────────────────────────────
function getSessionId() {
    let id = localStorage.getItem('chat_session_id')
    if (!id) {
        id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        localStorage.setItem('chat_session_id', id)
    }
    return id
}

// ─── Audio MIME type detection ─────────────────────────────────────────────────
function getSupportedMimeType() {
    const candidates = [
        'audio/webm;codecs=opus', 'audio/webm',
        'audio/ogg;codecs=opus', 'audio/ogg',
        'audio/mp4;codecs=mp4a', 'audio/mp4',
    ]
    for (const type of candidates) {
        if (MediaRecorder.isTypeSupported(type)) return type
    }
    return ''
}

// ─── Contextual fallback suggestion chips ──────────────────────────────────────
function getContextualFallbacks(messageCount) {
    if (messageCount <= 1) return ['What do you offer?', 'How can you help me?']
    if (messageCount <= 3) return ['Tell me more', 'Get a quote']
    return ['Talk to a human']
}

// ─── Filter and limit suggestions ──────────────────────────────────────────────
function filterAndLimitSuggestions(suggestions, shownChipsHistory) {
    if (!suggestions || !Array.isArray(suggestions)) return []
    const shouldSkip = Math.random() < 0.2
    if (shouldSkip && suggestions.length > 0) return []
    const filtered = suggestions.filter(text => {
        const count = shownChipsHistory.current.get(text) || 0
        return count < 2
    })
    let finalChips = filtered.slice(0, 3)
    if (finalChips.length === 3 && Math.random() < 0.7) {
        finalChips = finalChips.slice(0, 2)
    }
    finalChips.forEach(text => {
        shownChipsHistory.current.set(text, (shownChipsHistory.current.get(text) || 0) + 1)
    })
    return finalChips
}

// ─── Delay helper ──────────────────────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms))

// ─── Message Bubble Component ──────────────────────────────────────────────────
function MessageBubble({ text, isUser }) {
    return (
        <div className={`chat-message ${isUser ? 'chat-user' : 'chat-bot'}`}>
            <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                {text}
            </div>
        </div>
    )
}

// ─── Typing Indicator Component ────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <div className="chat-message chat-bot">
            <div className="chat-bubble chat-bubble-bot">
                <div className="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    )
}

// ─── Suggestion Chips Component ────────────────────────────────────────────────
function SuggestionChips({ chips, onChipClick, disabled }) {
    if (!chips || chips.length === 0) return null
    return (
        <div className="chat-suggestions">
            {chips.map((text, i) => (
                <button
                    key={i}
                    className={`chat-chip ${disabled ? 'chat-chip-used' : ''}`}
                    onClick={() => !disabled && onChipClick(text)}
                    disabled={disabled}
                >
                    {text}
                </button>
            ))}
        </div>
    )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ChatWidget Component ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])   // { id, text, isUser, chips?, chipsUsed? }
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    const messageCount = useRef(0)
    const shownChipsHistory = useRef(new Map())
    const activeRequests = useRef(0)
    const messagesEndRef = useRef(null)
    const mediaRecorderRef = useRef(null)
    const audioStreamRef = useRef(null)
    const audioChunksRef = useRef([])
    const recordedMimeTypeRef = useRef('audio/webm')

    // ─── Auto-scroll ─────────────────────────────────────────────────────────────
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    // ─── Send message ────────────────────────────────────────────────────────────
    const sendMessage = useCallback(async (text, retryCount = 0) => {
        if (retryCount === 0) {
            const userMsg = { id: Date.now(), text, isUser: true }
            setMessages(prev => [...prev, userMsg])
            activeRequests.current++
        }

        setIsTyping(true)

        try {
            const controller = new AbortController()
            const clientTimeout = setTimeout(() => controller.abort(), 58000)

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    message: text,
                    timestamp: new Date().toISOString(),
                    sessionId: getSessionId()
                })
            })

            clearTimeout(clientTimeout)
            activeRequests.current = Math.max(0, activeRequests.current - 1)
            if (activeRequests.current === 0) setIsTyping(false)

            const data = await response.json()

            if (!response.ok) {
                const serverMsg = data?.response || data?.message
                if (serverMsg) {
                    setMessages(prev => [...prev, { id: Date.now(), text: serverMsg, isUser: false }])
                } else if (retryCount < 1) {
                    activeRequests.current++
                    await delay(2500)
                    return sendMessage(text, retryCount + 1)
                } else {
                    setMessages(prev => [...prev, { id: Date.now(), text: "I'm having trouble right now — please try again in a moment.", isUser: false }])
                }
                return
            }

            const botResponse = data.response || data.message
            if (botResponse && botResponse.trim()) {
                messageCount.current++
                const rawChips = (Array.isArray(data.suggestions) && data.suggestions.length > 0)
                    ? data.suggestions
                    : getContextualFallbacks(messageCount.current)
                const filteredChips = filterAndLimitSuggestions(rawChips, shownChipsHistory)

                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: botResponse.trim(),
                    isUser: false,
                    chips: filteredChips,
                    chipsUsed: false
                }])
            } else if (retryCount < 1) {
                activeRequests.current++
                await delay(2000)
                return sendMessage(text, retryCount + 1)
            } else {
                setMessages(prev => [...prev, { id: Date.now(), text: "I didn't catch that — could you send it again?", isUser: false }])
            }

        } catch (error) {
            setIsTyping(false)
            const isTimeout = error.name === 'AbortError'

            if (retryCount < 1 && !isTimeout) {
                activeRequests.current++
                await delay(3000)
                return sendMessage(text, retryCount + 1)
            }

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: isTimeout
                    ? "I'm taking longer than usual — please send your message again."
                    : "I ran into a hiccup — please try again in a moment.",
                isUser: false
            }])
        }
    }, [])

    // ─── Handle chip click ──────────────────────────────────────────────────────
    const handleChipClick = useCallback((msgId, chipText) => {
        setMessages(prev => prev.map(m =>
            m.id === msgId ? { ...m, chipsUsed: true } : m
        ))
        sendMessage(chipText)
    }, [sendMessage])

    // ─── Handle send ─────────────────────────────────────────────────────────────
    const handleSend = useCallback(() => {
        const text = inputValue.trim()
        if (text) {
            sendMessage(text)
            setInputValue('')
        }
    }, [inputValue, sendMessage])

    // ─── Handle key press ────────────────────────────────────────────────────────
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') handleSend()
    }, [handleSend])

    // ─── Start recording ─────────────────────────────────────────────────────────
    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
            })
            audioStreamRef.current = stream
            audioChunksRef.current = []

            const mimeType = getSupportedMimeType()
            const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
            recordedMimeTypeRef.current = recorder.mimeType || mimeType || 'audio/webm'

            recorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
            recorder.onstop = async () => {
                const blob = new Blob(audioChunksRef.current, { type: recordedMimeTypeRef.current })
                if (blob.size === 0) {
                    setMessages(prev => [...prev, { id: Date.now(), text: 'No audio captured. Please try again.', isUser: false }])
                    return
                }
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onloadend = async () => {
                    await transcribeAudio(reader.result.split(',')[1], recordedMimeTypeRef.current)
                }
            }

            recorder.start(250)
            mediaRecorderRef.current = recorder
            setIsRecording(true)
        } catch (err) {
            console.error('Mic error:', err)
            setMessages(prev => [...prev, { id: Date.now(), text: 'Could not access microphone. Please check permissions.', isUser: false }])
        }
    }, [])

    // ─── Stop recording ──────────────────────────────────────────────────────────
    const stopRecording = useCallback(() => {
        setIsRecording(false)
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(t => t.stop())
        }
        mediaRecorderRef.current = null
        audioStreamRef.current = null
    }, [])

    // ─── Transcribe audio ────────────────────────────────────────────────────────
    const transcribeAudio = useCallback(async (base64Audio, mimeType) => {
        try {
            setIsTyping(true)
            const response = await fetch('/api/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ audio: base64Audio, mimeType })
            })
            setIsTyping(false)

            if (!response.ok) throw new Error(`Transcription error: ${response.status}`)
            const data = await response.json()

            if (data.transcript && data.transcript.trim()) {
                sendMessage(data.transcript.trim())
            } else {
                setMessages(prev => [...prev, { id: Date.now(), text: 'Could not understand audio. Please speak clearly and try again.', isUser: false }])
            }
        } catch (err) {
            console.error('Transcription error:', err)
            setIsTyping(false)
            setMessages(prev => [...prev, { id: Date.now(), text: 'Error transcribing audio. Please try again.', isUser: false }])
        }
    }, [sendMessage])

    // ─── Toggle mic ──────────────────────────────────────────────────────────────
    const toggleMic = useCallback(() => {
        if (!isRecording) startRecording()
        else stopRecording()
    }, [isRecording, startRecording, stopRecording])

    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window" id="chat-window">
                    {/* Header */}
                    <div className="chat-header">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Marketplace Assistant</h3>
                                <p className="text-[10px] opacity-80">Powered by AI</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="chat-body">
                        {/* Welcome message */}
                        {messages.length === 0 && (
                            <div className="chat-welcome">
                                <div className="chat-welcome-icon">
                                    <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <p className="text-sm font-semibold text-slate-700">How can I help you today?</p>
                                <p className="text-xs text-gray-400 mt-1">Ask about products, shipping, or anything else</p>
                                <SuggestionChips
                                    chips={['What do you offer?', 'How can you help me?']}
                                    onChipClick={(text) => sendMessage(text)}
                                    disabled={false}
                                />
                            </div>
                        )}

                        {/* Messages */}
                        {messages.map(msg => (
                            <div key={msg.id}>
                                <MessageBubble text={msg.text} isUser={msg.isUser} />
                                {msg.chips && msg.chips.length > 0 && (
                                    <SuggestionChips
                                        chips={msg.chips}
                                        onChipClick={(text) => handleChipClick(msg.id, text)}
                                        disabled={msg.chipsUsed}
                                    />
                                )}
                            </div>
                        ))}

                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chat-input-area">
                        {isRecording && (
                            <div className="chat-recording-badge">
                                <span className="chat-recording-dot"></span>
                                Recording...
                            </div>
                        )}
                        <div className="chat-input-row">
                            <button
                                onClick={toggleMic}
                                className={`chat-mic-btn ${isRecording ? 'chat-mic-recording' : ''}`}
                                title={isRecording ? 'Stop recording' : 'Start recording'}
                            >
                                {isRecording ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="6" y="6" width="12" height="12" rx="2" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 15a3 3 0 003-3V5a3 3 0 00-6 0v7a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                )}
                            </button>
                            <input
                                type="text"
                                className="chat-text-input"
                                placeholder="Ask anything…"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={handleSend} className="chat-send-btn" disabled={!inputValue.trim()}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 19V5m0 0l-7 7m7-7l7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <div className="fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-brand hover:bg-brand-dark text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
                >
                    {isOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    )}
                    {!isOpen && (
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
                            Chat Now
                        </span>
                    )}
                </button>
            </div>
        </>
    )
}

export default ChatWidget
