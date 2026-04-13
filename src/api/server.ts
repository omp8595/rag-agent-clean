import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config } from '../utils/config.js';
import { ragAgent, ragAgentStream, type Message } from '../agents/ragAgent.js';
import { ingestDirectory, ingestText } from '../ingestion/ingest.js';
import { getBM25DocCount } from '../rag/bm25Index.js';
import { getCollectionCount } from '../rag/vectorStore.js';

const app    = express();
const server = createServer(app);
const io     = new SocketIO(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

const limiter = rateLimit({ windowMs: 60_000, max: 60 });
app.use('/api', limiter);

app.get('/api/health', async (_req, res) => {
  const [vectorCount, bm25Count] = await Promise.all([
    getCollectionCount(),
    Promise.resolve(getBM25DocCount()),
  ]);
  res.json({
    status:      'ok',
    vectorDocs:  vectorCount,
    bm25Docs:    bm25Count,
    model:       config.claudeModel,
  });
});

app.post('/api/chat', async (req, res) => {
  const { query, history = [] } = req.body as {
    query:    string;
    history?: Message[];
  };
  if (!query?.trim()) return res.status(400).json({ error: 'query is required' });
  try {
    const response = await ragAgent(query, history);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Agent error' });
  }
});

app.post('/api/ingest', async (req, res) => {
  const { text, source, metadata = {} } = req.body as {
    text:      string;
    source:    string;
    metadata?: Record<string, string>;
  };
  if (!text || !source) return res.status(400).json({ error: 'text and source are required' });
  try {
    const count = await ingestText(text, source, metadata);
    res.json({ chunksIndexed: count, source });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ingestion error' });
  }
});

io.on('connection', (socket) => {
  console.log(`[ws] client connected: ${socket.id}`);

  socket.on('chat', async (data: { query: string; history?: Message[] }) => {
    const { query, history = [] } = data;
    if (!query?.trim()) { socket.emit('error', { message: 'query is required' }); return; }
    socket.emit('start');
    try {
      for await (const delta of ragAgentStream(query, history)) {
        socket.emit('delta', { text: delta });
      }
      socket.emit('done');
    } catch (err) {
      console.error(err);
      socket.emit('error', { message: 'Stream error' });
    }
  });

  socket.on('disconnect', () => {
    console.log(`[ws] client disconnected: ${socket.id}`);
  });
});

// ── Auto-ingest docs on startup, then start server ───────────────────────────
console.log('Ingesting documents...');
await ingestDirectory('./data/docs');

server.listen(config.port, () => {
  console.log(`
  ┌─────────────────────────────────────────┐
  │  RAG Agent running                      │
  │  http://localhost:${config.port}                 │
  │  Model: ${config.claudeModel.padEnd(31)}│
  └─────────────────────────────────────────┘
  `);
});

export { app, server };
