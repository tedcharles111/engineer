import React from 'react';
import './index.css';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--light-background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'var(--white)',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid var(--border-color)',
        maxWidth: '600px'
      }}>
        <h1 style={{ 
          color: 'var(--primary-blue)', 
          fontSize: '2.5rem', 
          marginBottom: '1rem' 
        }}>
          🚀 Multiverse AI Builder
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '2rem',
          color: 'var(--text-secondary)'
        }}>
          Your AI-powered web app builder is working!
        </p>
        
        <div style={{ 
          background: 'var(--editor-dark)',
          color: '#E8E8E8',
          padding: '1.5rem',
          borderRadius: '8px',
          fontFamily: 'monospace',
          textAlign: 'left',
          marginBottom: '2rem'
        }}>
          <p>// ✅ Bolt.new theme applied</p>
          <p>// ✅ React is running</p>
          <p>// ✅ CSS variables working</p>
          <p>// ✅ Build successful</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Get Started
          </button>
          <button style={{
            background: 'var(--electric-yellow)',
            color: 'var(--dark-charcoal)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
