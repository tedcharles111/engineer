import React, { useState, useEffect } from 'react';
import BaseChat from './components/BaseChat';
import CodePreview from './components/CodePreview';
import Auth from './components/Auth';
import { supabase } from './lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'code' | 'preview'>('code');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Multiverse AI...</h2>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Multiverse AI</h1>
            <p>Build web apps with AI power</p>
          </div>
          <div className="user-section">
            <span className="user-email">{user.email}</span>
            <button onClick={() => supabase.auth.signOut()} className="logout-btn">
              Sign Out
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
                <button className={`toggle-btn ${currentView === 'code' ? 'active' : ''}`} onClick={() => setCurrentView('code')}>
                  💻 Code
                </button>
                <button className={`toggle-btn ${currentView === 'preview' ? 'active' : ''}`} onClick={() => setCurrentView('preview')}>
                  👁️ Preview
                </button>
                <button className="new-tab-btn" onClick={() => window.open(`/preview?code=${encodeURIComponent(generatedCode)}`, '_blank')}>
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
