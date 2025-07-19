# AI Fusion Colab

This is a minimal full-stack example using React, Socket.io and Node.js to simulate collaborating AI agents on a document.

## Setup

1. From the `server` directory (TypeScript):
   ```bash
   npm install
   npm start
   ```
2. From the `client` directory:
   ```bash
   npm install
   npm start
   ```

Create a `.env` file in `server` based on `.env.example` to configure `PORT`,
`JWT_SECRET` and future AI keys like `GEMINI_API_KEY`.

## Deployment

The project is deployable to platforms like Vercel or Netlify. Configure the
server to run on a serverless function or Node environment and the client as a
static build. Environment variables such as `JWT_SECRET` should be provided in
the platform settings.
