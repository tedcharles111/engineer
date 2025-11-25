import { useState, useEffect } from 'react';
import { useAuthInstant } from './hooks/useAuthInstant';
import { ComponentRestoration } from './components/ComponentRestoration';
import { RepositoryImport } from './components/RepositoryImport';
import './index.css';

// ... (keep all your existing page components: AboutUsPage, DocsPage, ProjectsGridPage, ProjectHistoryPage)

function App() {
  const { user, signUp, login, logout, loading } = useAuthInstant();
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'create' | 'import' | 'about' | 'docs' | 'grid' | 'history'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
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
        // User is immediately logged in after signup - no waiting!
      } else {
        await login(authForm.email, authForm.password);
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Clear error when switching modes
  useEffect(() => {
    setAuthError('');
  }, [authMode]);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <h2>Loading Multiverse AI...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🚀 Multiverse AI</h1>
            <p>Build web apps with AI power - Instant Access!</p>
          </div>

          {authError && (
            <div className="auth-error">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuth} className="auth-form">
            {authMode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={authForm.name}
                onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={authForm.email}
              onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              required
            />
            <button 
              type="submit" 
              className="auth-submit"
              disabled={isAuthLoading}
            >
              {isAuthLoading ? '�� Creating Account...' : (authMode === 'login' ? 'Sign In' : 'Create Account Instantly')}
            </button>
          </form>

          <div className="auth-footer">
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="auth-toggle"
            >
              {authMode === 'login' 
                ? "Don't have an account? Sign up instantly!" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ... (rest of your App component with navigation and pages)
}

export default App;
