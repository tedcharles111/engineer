import React, { useState, useEffect } from 'react';
import './App.css';

// Simple placeholder components
const HomePage = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <div style={{ maxWidth: '800px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 Multiverse AI Builder</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
        Transform your ideas into production-ready code instantly
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#333',
          padding: '2rem',
          borderRadius: '12px'
        }}>
          <h3>🎤 Voice Commands</h3>
          <p>Speak your ideas and watch them become code</p>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#333',
          padding: '2rem',
          borderRadius: '12px'
        }}>
          <h3>🔗 GitHub Export</h3>
          <p>One-click deployment to GitHub Pages</p>
        </div>
      </div>
      
      <button style={{
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        marginTop: '2rem'
      }}>
        Get Started Free
      </button>
    </div>
  </div>
);

const BuilderPage = () => (
  <div style={{ 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem'
  }}>
    <header style={{
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 2rem',
      borderRadius: '12px',
      marginBottom: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0 }}>🚀 Builder</h1>
      <button style={{
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.3)',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Sign Out
      </button>
    </header>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem',
      height: 'calc(100vh - 100px)'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>💬 Chat with AI</h3>
        <div style={{
          flex: 1,
          background: '#f8f9fa',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ color: '#666', textAlign: 'center', margin: '2rem 0' }}>
            AI chat interface will appear here
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Describe your web app..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
          <button style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Send
          </button>
        </div>
      </div>
      
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Code
          </button>
          <button style={{
            background: '#f1f5f9',
            color: '#333',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Preview
          </button>
        </div>
        <div style={{
          flex: 1,
          background: '#1a1a1a',
          borderRadius: '8px',
          padding: '1rem',
          color: '#00ff00',
          fontFamily: 'monospace',
          overflow: 'auto'
        }}>
          <p>// Generated code will appear here</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState('homepage'); // 'homepage' or 'builder'

  return (
    <div className="app">
      {currentView === 'homepage' ? <HomePage /> : <BuilderPage />}
      
      {/* Debug: Add buttons to switch views */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <button 
          onClick={() => setCurrentView('homepage')}
          style={{
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentView('builder')}
          style={{
            background: '#764ba2',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Builder
        </button>
      </div>
    </div>
  );
}

export default App;
