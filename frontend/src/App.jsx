import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const editorRef = useRef(null);
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    setCode(getBoilerplateCode(language));
  }, [language]);

  function getBoilerplateCode(lang) {
    switch (lang) {
      case 'cpp':
        return `#include <bits/stdc++.h>
using namespace std;

int main() {
    //Code
    return 0;
}`;
      case 'python':
        return `#Code`;
      case 'javascript':
        return `//Code`;
      case 'java':
        return `public class code {
    public static void main(String[] args) {
        // Code (Imp: dont change the public class name)
    }
}`;
      default:
        return '';
    }
  }

  async function executeCode() {
    const code = editorRef.current.getValue();
    try {
      const response = await fetch('http://localhost:3000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          input,
          language,
        }),
      });

      const result = await response.json();
      setOutput(result.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code. Please try again.');
    }
  }

  function copyCode() {
    const currentCode = editorRef.current.getValue();
    navigator.clipboard.writeText(currentCode).then(() => {
      alert('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  }

  function downloadCode() {
    const currentCode = editorRef.current.getValue();
    const element = document.createElement("a");
    const file = new Blob([currentCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function getFileExtension(lang) {
    switch (lang) {
      case 'cpp': return 'cpp';
      case 'python': return 'py';
      case 'javascript': return 'js';
      case 'java': return 'java';
      default: return 'txt';
    }
  }

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
        <button 
          onClick={copyCode} 
          className="w-10 h-10 bg-gray-700 rounded-lg mb-4 flex items-center justify-center hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          onClick={downloadCode} 
          className="w-10 h-10 bg-gray-700 rounded-lg mb-4 flex items-center justify-center hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-12 bg-gray-900 flex items-center px-4 justify-between">
          <div className="w-1/3"></div> 
          <h1 className="text-xl font-bold text-center flex-1">Code Slate</h1>
          <div className="w-1/3 flex justify-end items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={executeCode}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded"
            >
              Run
            </button>
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{ 
                fontSize: 16,
                padding: { top: 10 }
              }}
              theme="vs-dark"
            />
          </div>
          <div className="w-1/3 bg-gray-900 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="p-2 text-sm font-semibold bg-gray-700">Input</div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-gray-800 p-4 font-mono text-sm resize-none"
                placeholder="Input"
              ></textarea>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="p-2 text-sm font-semibold bg-gray-700">Output</div>
              <pre className="flex-1 bg-gray-800 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;