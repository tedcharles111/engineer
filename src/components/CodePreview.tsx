import React, { useEffect, useRef } from 'react';
import './CodePreview.css';

interface CodePreviewProps {
  code: string;
  view: 'code' | 'preview';
}

export default function CodePreview({ code, view }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (view === 'preview' && iframeRef.current && code) {
      const iframe = iframeRef.current;
      const htmlContent = extractHTML(code) || generateBasicHTML(code);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
      }
    }
  }, [code, view]);

  const extractHTML = (fullCode: string): string | null => {
    const htmlMatch = fullCode.match(/```html\n([\s\S]*?)\n```/) || 
                     fullCode.match(/```\n([\s\S]*?)\n```/) ||
                     fullCode.match(/<html[\s\S]*<\/html>/i);
    
    if (htmlMatch) {
      return htmlMatch[1] || htmlMatch[0];
    }
    
    // Check if it's pure HTML without code blocks
    if (fullCode.includes('<') && fullCode.includes('>')) {
      return fullCode;
    }
    
    return null;
  };

  const generateBasicHTML = (content: string): string => {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Multiverse Generated App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .code-content {
            white-space: pre-wrap;
            font-family: 'Monaco', 'Consolas', monospace;
            background: #1a1a1a;
            color: #00ff00;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Multiverse Generated App</h1>
        <p>This is a preview of your generated code:</p>
        <div class="code-content">${content}</div>
    </div>
</body>
</html>`;
  };

  if (view === 'code') {
    return (
      <div className="code-panel">
        <div className="code-header">
          <span>Generated Code</span>
          <button 
            onClick={() => navigator.clipboard.writeText(code)}
            className="copy-btn"
            disabled={!code}
          >
            📋 Copy
          </button>
        </div>
        <pre className="code-content">
          {code || '// Code will appear here after generation...'}
        </pre>
      </div>
    );
  }

  return (
    <div className="preview-panel">
      <iframe
        ref={iframeRef}
        title="preview"
        className="preview-iframe"
        sandbox="allow-scripts allow-same-origin"
      />
      {!code && (
        <div className="preview-placeholder">
          <div className="placeholder-content">
            <h3>👁️ Preview</h3>
            <p>Generate some code to see the live preview here</p>
          </div>
        </div>
      )}
    </div>
  );
}
