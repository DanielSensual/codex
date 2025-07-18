import React from 'react';

export default function Suggestions({ items = [] }) {
  return (
    <div style={{ background: '#222', color: '#eee', padding: '1rem', width: '250px', overflowY: 'auto' }}>
      <h3>AI Suggestions</h3>
      {items.map((s, idx) => (
        <div key={idx} style={{ marginBottom: '0.5rem' }}>
          <strong>{s.name}:</strong> {s.suggestion}
        </div>
      ))}
    </div>
  );
}
