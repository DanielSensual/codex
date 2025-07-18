# Mediageekz Operator AI

This example shows a simple Node.js server for handling inbound calls using Twilio and storing appointment requests in a JSON file.

## Setup

1. Ensure you have Node.js installed (version 18 or newer).
   This example does not use any external packages so there is
   nothing to install.

2. Set your server's public URL as the voice webhook for your Twilio phone number and point it to `/voice`.

3. Start the server:
   ```bash
   node server.js
   ```
   The server listens on port `3000` by default.

4. View stored appointments by visiting `http://localhost:3000/appointments`.

## How it works

- Incoming calls hit `/voice`. The caller is prompted to say their name and preferred time for an appointment.
- Twilio sends the transcribed speech to `/schedule`.
- The transcription is stored in `appointments.json` for later review.

This example keeps things intentionally lightweight. For real production use you may want to integrate natural language parsing, calendar APIs, or a database.
