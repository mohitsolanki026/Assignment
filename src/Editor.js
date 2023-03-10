import React, { useState, useRef } from 'react';

function TextEditor() {
  const [content, setContent] = useState('');
  const editorRef = useRef(null);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);

  function handleChange(event) {
    setContent(event.target.innerHTML);
  }

  function handleBoldClick() {
    document.execCommand('bold', false, null);
  }

  function handleItalicClick() {
    document.execCommand('italic', false, null);
  }

  function handleSelectionChange() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const parentElement = range.commonAncestorContainer.parentNode;
    const boldActive = parentElement.tagName === 'B' || parentElement.style.fontWeight === 'bold';
    const italicActive = parentElement.tagName === 'I' || parentElement.style.fontStyle === 'italic';
    setBoldActive(boldActive);
    setItalicActive(italicActive);
  }

  return (
    <div className="text-editor">
      <div className="toolbar">
        <button onClick={handleBoldClick}>Bold</button>
        <button onClick={handleItalicClick}>Italic</button>
      </div>
      <div
       style={{border:"2px solid black"}}
        contentEditable
        ref={editorRef}
        onInput={handleChange}
        onKeyUp={handleSelectionChange}
        onMouseUp={handleSelectionChange}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
    </div>
  );
}

export default TextEditor;
