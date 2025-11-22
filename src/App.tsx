import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div style={{
        minHeight: '100vh',
        background: 'var(--light-background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div className="bolt-card" style={{ padding: '3rem', maxWidth: '600px' }}>
          <h1 style={{ 
            color: 'var(--primary-blue)', 
            fontSize: '3rem', 
            marginBottom: '1rem' 
          }}>
            🚀 Multiverse AI
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            marginBottom: '2rem',
            color: 'var(--text-secondary)'
          }}>
            Build web apps with AI power
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="bolt-button-primary">
              Get Started Free
            </button>
            <button className="bolt-button-secondary">
              View Demo
            </button>
          </div>

          <div style={{ 
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--editor-dark)',
            borderRadius: '8px',
            color: '#E8E8E8',
            fontFamily: 'monospace',
            textAlign: 'left'
          }}>
            <p>// Your AI-powered web builder is loading...</p>
            <p>// Bolt.new theme applied successfully!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
