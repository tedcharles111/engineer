import { useState, useEffect } from 'react';
import { useAuthInstant } from './hooks/useAuthInstant';
import { ComponentRestoration } from './components/ComponentRestoration';
import { RepositoryImport } from './components/RepositoryImport';
import './index.css';

// Project History Component
function ProjectHistoryPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading projects
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: 'Portfolio Website',
          description: 'Modern portfolio with dark theme',
          createdAt: '2024-01-15',
          files: 5
        },
        {
          id: 2, 
          name: 'E-commerce Store',
          description: 'Online store with shopping cart',
          createdAt: '2024-01-14',
          files: 8
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100%' }}>
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>📊 Project History</h1>
      <p style={{ color: '#ccc', marginBottom: '2rem' }}>Your previously created projects</p>
      
      {loading ? (
        <div style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
          Loading projects...
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {projects.map(project => (
            <div key={project.id} style={{
              background: '#111',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #333'
            }}>
              <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>{project.name}</h3>
              <p style={{ color: '#ccc', margin: '0 0 1rem 0' }}>{project.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>
                  Created: {project.createdAt} • Files: {project.files}
                </span>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Open Project
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Projects Grid Component
function ProjectsGridPage() {
  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', minHeight: '100%' }}>
      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>📁 Project Gallery</h1>
      <p style={{ color: '#ccc', marginBottom: '2rem' }}>All your created projects in one place</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} style={{
            background: '#111',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              opacity: 0.7
            }}>
              {['⚡', '🚀', '🎨', '💼', '🛒', '📊'][item-1]}
            </div>
            <h3 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>
              Project {item}
            </h3>
            <p style={{ color: '#ccc', margin: '0 0 1rem 0' }}>
              Description of project #{item}
            </p>
            <button style={{
              padding: '0.5rem 1rem',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%'
            }}>
              Open Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App Component
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

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#000',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
          <h2>Loading Multiverse AI...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#111',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          width: '100%',
          maxWidth: '450px',
          border: '1px solid #333'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              margin: '0 0 0.5rem 0', 
              color: '#fff',
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>🚀 Multiverse AI</h1>
            <p style={{ color: '#ccc', margin: 0, fontSize: '1.1rem' }}>Build web apps with AI power</p>
          </div>

          {authError && (
            <div style={{
              background: 'rgba(231, 76, 60, 0.1)',
              color: '#e74c3c',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              border: '1px solid rgba(231, 76, 60, 0.3)'
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
                  padding: '1rem',
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#fff'
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
                padding: '1rem',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#fff'
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={authForm.password}
              onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
              required
              style={{
                padding: '1rem',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '8px',
                fontSize: '1rem',
                color: '#fff'
              }}
            />
            <button 
              type="submit" 
              disabled={isAuthLoading}
              style={{
                padding: '1rem',
                background: isAuthLoading ? '#666' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: isAuthLoading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                marginTop: '0.5rem'
              }}
            >
              {isAuthLoading ? '🔄 Creating Account...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              style={{
                background: 'none',
                border: 'none',
                color: '#667eea',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '1rem'
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a',
      color: 'white'
    }}>
      {/* Navigation */}
      <nav style={{
        background: '#111',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #333'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ 
            margin: 0,
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>🚀 Multiverse AI</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['home', 'create', 'grid', 'history', 'import'].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '0.5rem 1rem',
                  background: currentPage === page ? '#333' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {page === 'home' && '🏠 Home'}
                {page === 'create' && '✨ Create'}
                {page === 'grid' && '📁 Projects'}
                {page === 'history' && '📊 History'}
                {page === 'import' && '�� Import'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#ccc' }}>Welcome, {user.name}</span>
          <button 
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        {currentPage === 'home' && (
          <div style={{ padding: '2rem' }}>
            <div style={{ 
              background: '#111', 
              padding: '3rem', 
              borderRadius: '16px',
              marginBottom: '2rem',
              textAlign: 'center',
              border: '1px solid #333'
            }}>
              <h1 style={{ 
                margin: '0 0 1rem 0',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '2.5rem'
              }}>🎉 Welcome to Multiverse AI</h1>
              <p style={{ color: '#ccc', fontSize: '1.2rem', margin: 0 }}>
                Build complete web applications with AI power. Start by creating a new project!
              </p>
            </div>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'create' && (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#fff', marginBottom: '1rem' }}>✨ Create New Project</h1>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>Build your next amazing web application with AI</p>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'grid' && <ProjectsGridPage />}
        {currentPage === 'history' && <ProjectHistoryPage />}
        {currentPage === 'import' && (
          <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#fff', marginBottom: '1rem' }}>📥 Import Repository</h1>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>Import existing GitHub projects into Multiverse AI</p>
            <RepositoryImport />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
