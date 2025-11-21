import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import BaseChat from './BaseChat';
import CodePreview from './CodePreview';
import './BuilderPage.css';

interface BuilderPageProps {
  user: User;
}

export default function BuilderPage({ user }: BuilderPageProps) {
  const [currentView, setCurrentView] = useState<'code' | 'preview'>('code');
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="builder-page">
      <header className="builder-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Multiverse AI Builder</h1>
            <p>Welcome back, {user.email}!</p>
          </div>
          <div className="user-section">
            <div className="user-info">
              <span className="user-email">{user.email}</span>
              <span className="user-plan">✨ Pro Builder</span>
            </div>
            <button onClick={handleSignOut} className="logout-btn">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="builder-main">
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
                  💻 Code
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
