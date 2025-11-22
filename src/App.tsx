import React, { useState, useEffect } from 'react';
import './index.css';

// Simple inline components to avoid import errors
const Auth = () => (
  <div style={{
    minHeight: '100vh',
    background: 'var(--light-background)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  }}>
    <div style={{
      background: 'var(--white)',
      padding: '3rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid var(--border-color)',
      maxWidth: '400px',
      width: '100%',
      textAlign: 'center'
    }}>
      <h1 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>🔐 Sign In</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Welcome to Multiverse AI</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="email" 
          placeholder="Email address"
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        />
        <input 
          type="password" 
          placeholder="Password"
          style={{
            width: '100%',
            padding: '1rem',
            border: '2px solid var(--border-color)',
            borderRadius: '8px',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        />
      </div>
      
      <button style={{
        background: 'var(--primary-blue)',
        color: 'white',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        width: '100%',
        cursor: 'pointer',
        marginBottom: '1rem'
      }}>
        Sign In
      </button>
      
      <button style={{
        background: 'var(--electric-yellow)',
        color: 'var(--dark-charcoal)',
        border: 'none',
        padding: '1rem 2rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        width: '100%',
        cursor: 'pointer'
      }}>
        Sign In with GitHub
      </button>
    </div>
  </div>
);

const BuilderPage = () => (
  <div style={{
    minHeight: '100vh',
    background: 'var(--light-background)'
  }}>
    <header style={{
      background: 'var(--white)',
      padding: '1rem 2rem',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ color: 'var(--primary-blue)', margin: 0 }}>🚀 Builder</h1>
      <button style={{
        background: 'var(--electric-yellow)',
        color: 'var(--dark-charcoal)',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
        Sign Out
      </button>
    </header>
    
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      padding: '2rem',
      height: 'calc(100vh - 80px)'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>💬 Chat with AI</h3>
        <p>AI chat interface will appear here</p>
      </div>
      
      <div style={{
        background: 'var(--white)',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>👁️ Preview</h3>
        <p>Code preview will appear here</p>
      </div>
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="app">
      {isAuthenticated ? <BuilderPage /> : <Auth />}
      
      {/* Debug buttons */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <button 
          onClick={() => setIsAuthenticated(false)}
          style={{
            background: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Show Auth
        </button>
        <button 
          onClick={() => setIsAuthenticated(true)}
          style={{
            background: 'var(--electric-yellow)',
            color: 'var(--dark-charcoal)',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}
        >
          Show Builder
        </button>
      </div>
    </div>
  );
}

export default App;
