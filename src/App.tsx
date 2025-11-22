import { useState } from 'react';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple inline components to avoid import errors
  const AuthPage = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1588FD 0%, #0C7AE6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(21, 136, 253, 0.3)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#1588FD', 
          fontSize: '2.5rem',
          marginBottom: '0.5rem'
        }}>
          🚀 Multiverse AI
        </h1>
        <p style={{ 
          color: '#6B7280', 
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          Build web apps with AI power
        </p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="email" 
            placeholder="Email address"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '1rem',
              marginBottom: '1rem',
              boxSizing: 'border-box'
            }}
          />
          <input 
            type="password" 
            placeholder="Password"
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '1rem',
              marginBottom: '1.5rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <button style={{
          background: '#1588FD',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          width: '100%',
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'all 0.2s ease'
        }}>
          Sign In
        </button>
        
        <button style={{
          background: '#2F313F',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          width: '100%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Sign In with GitHub
        </button>
      </div>
    </div>
  );

  const BuilderPage = () => (
    <div style={{
      minHeight: '100vh',
      background: '#F9FAFB'
    }}>
      <header style={{
        background: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          color: '#1588FD', 
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          🚀 Builder
        </h1>
        <button style={{
          background: '#FFD43D',
          color: '#2F313F',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
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
        height: 'calc(100vh - 80px)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ 
            color: '#1588FD', 
            marginBottom: '1rem',
            fontSize: '1.25rem'
          }}>
            💬 Chat with AI
          </h3>
          <p style={{ color: '#6B7280' }}>
            Describe your web app and watch AI generate the code instantly.
          </p>
        </div>
        
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ 
            color: '#1588FD', 
            marginBottom: '1rem',
            fontSize: '1.25rem'
          }}>
            👁️ Preview
          </h3>
          <p style={{ color: '#6B7280' }}>
            See your generated code come to life in real-time.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {isAuthenticated ? <BuilderPage /> : <AuthPage />}
      
      {/* Debug buttons - remove in production */}
      <div style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        display: 'flex',
        gap: '0.5rem',
        background: 'white',
        padding: '0.75rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <button 
          onClick={() => setIsAuthenticated(false)}
          style={{
            background: '#1588FD',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}
        >
          Show Auth
        </button>
        <button 
          onClick={() => setIsAuthenticated(true)}
          style={{
            background: '#FFD43D',
            color: '#2F313F',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}
        >
          Show Builder
        </button>
      </div>
    </div>
  );
}

export default App;
