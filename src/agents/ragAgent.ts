import Anthropic from '@anthropic-ai/sdk';
import { config } from '../utils/config.js';
import { hybridSearch, buildContext } from '../rag/hybridSearch.js';

const client = new Anthropic({ apiKey: config.anthropicApiKey });

export interface Message {
  role:    'user' | 'assistant';
  content: string;
}

export interface AgentResponse {
  answer:   string;
  sources:  string[];
  methods:  string[];
}

const SYSTEM_PROMPT = `You are a helpful customer support assistant.
Answer questions using ONLY the context provided below.
If the context does not contain enough information, say so clearly — do not make things up.
Always cite which source [1], [2], etc. your answer comes from.
Be concise, friendly, and accurate.`;

export async function ragAgent(
  query:   string,
  history: Message[] = [],
): Promise<AgentResponse> {
  // 1. Retrieve relevant chunks via hybrid search
  const results = await hybridSearch(query, config.topK);
  const context = buildContext(results);

  // 2. Build messages array with conversation history
  const messages: Anthropic.MessageParam[] = [
    ...history.map(m => ({
      role:    m.role as 'user' | 'assistant',
      content: m.content,
    })),
    {
      role:    'user',
      content: `Context:\n${context}\n\nQuestion: ${query}`,
    },
  ];

  // 3. Stream response from Claude
  let answer = '';

  const stream = await client.messages.stream({
    model:      config.claudeModel,
    max_tokens: 1024,
    system:     SYSTEM_PROMPT,
    messages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      answer += chunk.delta.text;
    }
  }

  return {
    answer,
    sources: [...new Set(results.map(r => r.source))],
    methods: [...new Set(results.map(r => r.method))],
  };
}

/**
 * Streaming variant — yields text deltas for WebSocket use.
 */
export async function* ragAgentStream(
  query:   string,
  history: Message[] = [],
): AsyncGenerator<string> {
  const results = await hybridSearch(query, config.topK);
  const context = buildContext(results);

  const messages: Anthropic.MessageParam[] = [
    ...history.map(m => ({
      role:    m.role as 'user' | 'assistant',
      content: m.content,
    })),
    {
      role:    'user',
      content: `Context:\n${context}\n\nQuestion: ${query}`,
    },
  ];

  const stream = await client.messages.stream({
    model:      config.claudeModel,
    max_tokens: 1024,
    system:     SYSTEM_PROMPT,
    messages,
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text;
    }
  }
}
