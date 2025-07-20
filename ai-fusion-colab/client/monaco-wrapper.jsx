import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as monaco from 'monaco-editor';

const Editor = forwardRef(function Editor({ value, onChange }, refHandle) {
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

  useImperativeHandle(refHandle, () => ({
    insertText(text) {
      const editor = editorRef.current;
      const pos = editor.getPosition();
      editor.executeEdits('', [
        {
          range: new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
          text
        }
      ]);
      editor.focus();
    }
  }));

  return <div ref={ref} style={{ height: '100%' }} />;
});

export default Editor;
