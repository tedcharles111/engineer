import { useState } from 'react';
import BaseChat from './components/BaseChat';
import CodePreview from './components/CodePreview';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'code' | 'preview'>('code');
  const [generatedCode, setGeneratedCode] = useState<string>('');

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Multiverse AI</h1>
            <p>Build web apps with AI power</p>
          </div>
          <div className="user-section">
            <span className="user-email">Welcome to Multiverse!</span>
            <button className="logout-btn">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-container">
          <div className="chat-panel">
            <BaseChat onCodeGenerated={setGeneratedCode} />
          </div>

          <div className="preview-panel">
            <div className="panel-header">
              <div className="view-toggles">
                <button 
                  className={`toggle-btn ${currentView === 'code' ? 'active' : ''}`}
                  onClick={() => setCurrentView('code')}
                >
                  �� Code
                </button>
                <button 
                  className={`toggle-btn ${currentView === 'preview' ? 'active' : ''}`}
                  onClick={() => setCurrentView('preview')}
                >
                  👁️ Preview
                </button>
                <button 
                  className="new-tab-btn"
                  onClick={() => {
                    if (generatedCode) {
                      const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Multiverse Generated App</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            background: #f8f9fa;
        }
    </style>
</head>
<body>${generatedCode}</body>
</html>`;
                      const newWindow = window.open();
                      if (newWindow) {
                        newWindow.document.write(htmlContent);
                        newWindow.document.close();
                      }
                    }
                  }}
                  disabled={!generatedCode}
                >
                  ↗ New Tab
                </button>
              </div>
            </div>
            <div className="panel-content">
              <CodePreview code={generatedCode} view={currentView} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
