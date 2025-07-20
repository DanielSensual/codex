import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import Editor from './monaco-wrapper.jsx';
import SuggestionPanel from './SuggestionPanel.jsx';

const socket = io('http://localhost:3001', {
  auth: { token: localStorage.getItem('token') }
});

function App() {
  const [content, setContent] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    socket.emit('join', 'default');
    socket.on('document', setContent);
    socket.on('ai-suggestions', suggs => {
      setSuggestions(suggs);
      setLoading(false);
    });
    return () => {
      socket.off('document');
      socket.off('ai-suggestions');
    };
  }, []);

  const onChange = value => {
    setContent(value);
    setLoading(true);
    socket.emit('edit', { docId: 'default', content: value });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <Editor ref={editorRef} value={content} onChange={onChange} />
      </div>
      <SuggestionPanel
        items={suggestions}
        loading={loading}
        onSelect={text => editorRef.current.insertText(text)}
      />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
