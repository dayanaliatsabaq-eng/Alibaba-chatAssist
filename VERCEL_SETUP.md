# Vercel Environment Configuration Guide

To ensure your webapp works correctly on Vercel, you need to add your environment variables to the Vercel dashboard.

## Required Environment Variables

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `N8N_WEBHOOK_URL` | Your n8n RAG chatbot webhook URL | `https://n8n.example.com/webhook/...` |
| `DEEPGRAM_API_KEY` | Your Deepgram API Key for voice-to-text | `561bd8fc1...` |

## How to add them in Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click on your **Project**.
3.  Go to the **Settings** tab at the top.
4.  Click on **Environment Variables** in the left sidebar.
5.  Add the `Key` and `Value` for each variable listed above.
6.  Click **Save**.
7.  **Redeploy** your project for the changes to take effect (go to **Deployments** -> **Redeploy**).

> [!IMPORTANT]
> Never commit your `.env` file to GitHub. Your project is already configured to ignore it. Always use the Vercel dashboard for production credentials.
