import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import Editor from './monaco-wrapper.jsx';
import Suggestions from './Suggestions.jsx';

const socket = io('http://localhost:3001', {
  auth: { token: localStorage.getItem('token') }
});

function App() {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    socket.emit('join', 'default');
    socket.on('document', setContent);
    socket.on('ai-suggestions', setSuggestions);
    return () => {
      socket.off('document');
      socket.off('ai-suggestions');
    };
  }, []);

  const onChange = value => {
    setContent(value);
    socket.emit('edit', { docId: 'default', content: value });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Editor value={content} onChange={onChange} />
      </div>
      <Suggestions items={suggestions} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
