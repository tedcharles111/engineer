import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { ComponentRestoration } from './components/ComponentRestoration';
import { RepositoryImport } from './components/RepositoryImport';
import './index.css';

// Project Management Component
function ProjectsPage() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Weather Dashboard', description: 'Responsive weather app', lastUpdated: '2 hours ago' },
    { id: 2, name: 'E-commerce Store', description: 'Online shopping platform', lastUpdated: '1 day ago' },
    { id: 3, name: 'Portfolio Website', description: 'Professional portfolio', lastUpdated: '3 days ago' }
  ]);

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Your Projects</h1>
        <p>Manage and edit your created projects</p>
      </div>
      
      <div className="projects-actions">
        <button className="new-project-btn">+ Create New Project</button>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-actions">
              <button className="open-btn">Open</button>
              <button className="delete-btn">Delete</button>
            </div>
            <span className="project-date">Last updated: {project.lastUpdated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { user, signUp, login, logout, loginWithGitHub, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'create' | 'import'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [authError, setAuthError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    try {
      if (authMode === 'signup') {
        await signUp(authForm.email, authForm.password, authForm.name);
      } else {
        await login(authForm.email, authForm.password);
      }
    } catch (error: any) {
      setAuthError(error.message);
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
            <p>Build web apps with AI power</p>
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
            <button type="submit" className="auth-submit">
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button onClick={loginWithGitHub} className="github-auth">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>

          <div className="auth-footer">
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="auth-toggle"
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

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="main-navigation">
        <div className="nav-brand">
          <h2>🚀 Multiverse AI Builder</h2>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 Builder
          </button>
          <button 
            className={`nav-link ${currentPage === 'projects' ? 'active' : ''}`}
            onClick={() => setCurrentPage('projects')}
          >
            📁 Projects
          </button>
          <button 
            className={`nav-link ${currentPage === 'create' ? 'active' : ''}`}
            onClick={() => setCurrentPage('create')}
          >
            ✨ New Project
          </button>
          <button 
            className={`nav-link ${currentPage === 'import' ? 'active' : ''}`}
            onClick={() => setCurrentPage('import')}
          >
            📥 Import Repo
          </button>
        </div>

        <div className="nav-user">
          <span>Welcome, {user.name}</span>
          <button onClick={logout} className="logout-btn">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'home' && (
          <div className="builder-page">
            <div className="page-header">
              <h1>AI Web App Builder</h1>
              <p>Describe your application and watch AI generate the code instantly</p>
            </div>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'projects' && <ProjectsPage />}

        {currentPage === 'create' && (
          <div className="create-page">
            <div className="page-header">
              <h1>Create New Project</h1>
              <p>Start building your next amazing web application</p>
            </div>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'import' && (
          <div className="import-page">
            <div className="page-header">
              <h1>Import Repository</h1>
              <p>Bring your existing GitHub projects into Multiverse AI</p>
            </div>
            <RepositoryImport />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
