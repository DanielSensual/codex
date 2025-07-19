import { createServer } from 'http';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

import { simulateAIs } from './ai-agents';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

interface AuthedSocket extends Socket {
  user: string | jwt.JwtPayload;
}

app.use(cors());
app.use(express.json());

const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET ?? 'replace-me';

app.post('/register', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send('Username required');
  if (users.has(username)) return res.status(400).send('User exists');
  users.set(username, {});
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({ token });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!users.has(username)) return res.status(400).send('User not found');
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({ token });
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    (socket as AuthedSocket).user = user;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
});

const documents = new Map();

io.on('connection', (socket) => {
  socket.on('join', (docId) => {
    socket.join(docId);
    if (!documents.has(docId)) documents.set(docId, '');
    socket.emit('document', documents.get(docId));
  });

  socket.on('edit', ({ docId, content }) => {
    documents.set(docId, content);
    socket.to(docId).emit('document', content);
    const suggestions = simulateAIs(content);
    io.to(docId).emit('ai-suggestions', suggestions);
  });
});

const PORT = Number(process.env.PORT) || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
