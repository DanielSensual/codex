import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

export default function Editor({ value, onChange }) {
  const ref = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = monaco.editor.create(ref.current, {
      value,
      language: 'markdown',
      theme: 'vs-dark'
    });
    editorRef.current.onDidChangeModelContent(() => {
      onChange(editorRef.current.getValue());
    });
    return () => editorRef.current.dispose();
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value);
    }
  }, [value]);

  return <div ref={ref} style={{ height: '100%' }} />;
}
