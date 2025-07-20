import React from 'react';

export default function SuggestionPanel({ items = [], loading, onSelect }) {
  return (
    <div
      style={{
        background: '#222',
        color: '#eee',
        padding: '1rem',
        width: '250px',
        overflowY: 'auto'
      }}
    >
      <h3>AI Suggestions</h3>
      {loading && <div style={{ marginBottom: '0.5rem' }}>Generating...</div>}
      {items.map((s, idx) => (
        <div
          key={idx}
          onClick={() => onSelect && onSelect(s.suggestion)}
          style={{
            marginBottom: '0.5rem',
            padding: '0.5rem',
            background: '#333',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <strong>{s.name}:</strong> {s.suggestion}
        </div>
      ))}
    </div>
  );
}
