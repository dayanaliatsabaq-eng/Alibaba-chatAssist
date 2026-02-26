# Stitch Marketplace - AI Chatbot & Transcription

Stitch Marketplace is a modern web application featuring an AI-powered marketplace assistant with RAG (Retrieval-Augmented Generation) capabilities and voice-to-text transcription.

## 🚀 Tech Stack

### Frontend
- **React 18**: A JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development and optimized builds.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

### Backend & API
- **Vercel Serverless Functions**: Node.js functions used for production API endpoints (`/api/chat` and `/api/transcribe`).
- **Express (Local)**: Used as a middleware for the local development server to simulate API behavior.

### External Services
- **n8n**: Hosted RAG chatbot workflow that processes user messages and returns intelligent responses based on marketplace data.
- **Deepgram**: Leading AI speech-to-text API used for transcribing voice messages in the chat widget.

### Security
- **CORS Protection**: API endpoints are restricted to authorized origins (localhost and Vercel domains).
- **Environment Variables**: Sensitive credentials are managed via `.env` files (locally) and the Vercel dashboard (production), ensuring they are never exposed in Git.

## 📂 Project Structure

- `api/`: Vercel serverless functions for production.
- `server/`: Local development API implementation.
- `src/`: Frontend React components and logic.
    - `src/components/ChatWidget.jsx`: The core interactive chat interface.
- `index.html`: Main entry point for the web application.
- `vercel.json`: Deployment configuration for Vercel.
- `vite.config.js`: Build and development configuration for Vite.

## 🛠️ Local Development Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/dayanaliatsabaq-eng/Alibaba-chatAssist.git
    cd Alibaba-chatAssist
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a `.env` file in the root directory and add your credentials:
    ```env
    N8N_WEBHOOK_URL=your_n8n_webhook_url
    DEEPGRAM_API_KEY=your_deepgram_api_key
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 🌐 Deployment (Vercel)

For detailed instructions on setting up environment variables in production, see [VERCEL_SETUP.md](./VERCEL_SETUP.md).

1.  Push your changes to GitHub.
2.  Import the project into Vercel.
3.  Add your environment variables (`N8N_WEBHOOK_URL` and `DEEPGRAM_API_KEY`) in the Vercel dashboard.
4.  Redeploy.

## 📝 License

Private / Confidential
