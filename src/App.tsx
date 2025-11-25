import { useState, useEffect } from 'react';
import { useAuthInstant } from './hooks/useAuthInstant';
import { ComponentRestoration } from './components/ComponentRestoration';
import { RepositoryImport } from './components/RepositoryImport';
import './index.css';

function App() {
  const { user, signUp, login, logout, loading } = useAuthInstant();
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);
    
    try {
      if (authMode === 'signup') {
        await signUp(authForm.email, authForm.password, authForm.name);
      } else {
        await login(authForm.email, authForm.password);
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Show loading spinner
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1a1a',
        color: 'white'
      }}>
        <div>Loading Multiverse AI...</div>
      </div>
    );
  }

  // Show authentication form if not logged in
  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>🚀 Multiverse AI</h1>
            <p style={{ color: '#666', margin: 0 }}>Build web apps with AI power</p>
          </div>

          {authError && (
            <div style={{
              background: '#fee',
              color: '#c33',
              padding: '0.75rem',
              borderRadius: '6px',
              marginBottom: '1rem',
              border: '1px solid #fcc'
            }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                required
                style={{
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              required
              style={{
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
            />
            <button 
              type="submit" 
              disabled={isAuthLoading}
              style={{
                padding: '0.75rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {isAuthLoading ? '🔄 Creating Account...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main app interface - SIMPLIFIED to ensure it works
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a1a',
      color: 'white'
    }}>
      {/* Simple Navigation */}
      <nav style={{
        background: '#2a2a2a',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333'
      }}>
        <h2 style={{ margin: 0 }}>🚀 Multiverse AI</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Welcome, {user.name}</span>
          <button 
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          background: '#2a2a2a', 
          padding: '2rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h1 style={{ marginTop: 0 }}>🎉 Welcome to Multiverse AI!</h1>
          <p>Your account is ready. Start building amazing web applications with AI.</p>
        </div>

        {/* Simple Navigation Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setCurrentPage('home')}
            style={{
              padding: '1rem 2rem',
              background: currentPage === 'home' ? '#667eea' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🏠 Home
          </button>
          <button 
            onClick={() => setCurrentPage('create')}
            style={{
              padding: '1rem 2rem',
              background: currentPage === 'create' ? '#667eea' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ✨ Create Project
          </button>
          <button 
            onClick={() => setCurrentPage('import')}
            style={{
              padding: '1rem 2rem',
              background: currentPage === 'import' ? '#667eea' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📥 Import Repo
          </button>
        </div>

        {/* Page Content */}
        {currentPage === 'home' && (
          <div style={{ background: '#2a2a2a', padding: '2rem', borderRadius: '8px' }}>
            <h2>🏠 Welcome Home</h2>
            <p>This is your dashboard. Start by creating a new project or importing an existing one.</p>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'create' && (
          <div style={{ background: '#2a2a2a', padding: '2rem', borderRadius: '8px' }}>
            <h2>✨ Create New Project</h2>
            <p>Use our AI builder to create amazing web applications.</p>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'import' && (
          <div style={{ background: '#2a2a2a', padding: '2rem', borderRadius: '8px' }}>
            <h2>📥 Import Repository</h2>
            <p>Bring your existing projects into Multiverse AI.</p>
            <RepositoryImport />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
