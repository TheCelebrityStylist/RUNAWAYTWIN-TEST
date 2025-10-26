'use client';
import { useState } from 'react';

type Msg = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Hi! Tell me about your occasion, vibe, climate, and budget.' },
  ]);
  const [input, setInput] = useState('');

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput('');

    // ✅ Explicitly cast new message as Msg to satisfy TS literal type
    const newMessage: Msg = { role: 'user', content: text };
    const next: Msg[] = [...messages, newMessage];
    setMessages(next);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      const reply: Msg = { role: 'assistant', content: data.reply || '...' };
      setMessages((m) => [...m, reply]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Error: could not reach server.' },
      ]);
    }
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>Chat with RunwayTwin</h1>

      <div
        style={{
          display: 'grid',
          gap: 10,
          maxHeight: '50vh',
          overflow: 'auto',
          padding: '10px',
          background: '#0f0f12',
          borderRadius: 12,
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                background: m.role === 'user' ? '#DE7600' : '#333',
              }}
            />
            <div
              style={{
                background: '#121214',
                border: '1px solid #232326',
                padding: '10px 12px',
                borderRadius: 12,
                whiteSpace: 'pre-wrap',
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a look..."
          style={{
            flex: 1,
            padding: '12px 14px',
            borderRadius: 12,
            border: '1px solid var(--border)',
            background: '#0f0f12',
            color: 'var(--fg)',
          }}
        />
        <button onClick={send} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}


