import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { ComponentRestoration } from './components/ComponentRestoration';
import { RepositoryImport } from './components/RepositoryImport';
import './index.css';

// About Us Component
function AboutUsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>About Multiverse AI</h1>
        <p>Revolutionizing web development with artificial intelligence</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>🚀 Our Mission</h2>
          <p>
            Multiverse AI is building the future of web development by combining the power of 
            artificial intelligence with intuitive design. We believe everyone should be able to 
            create amazing web applications, regardless of their coding experience.
          </p>
        </div>

        <div className="about-section">
          <h2>💡 What We Do</h2>
          <p>
            Our platform allows you to describe your web application in natural language, and 
            watch as AI generates complete, production-ready code with multiple files, responsive 
            design, and modern best practices.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🎤 Voice & Text Input</h3>
            <p>Describe your app using voice or text commands</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Real-time Generation</h3>
            <p>Instantly generate HTML, CSS, JavaScript files</p>
          </div>
          <div className="feature-card">
            <h3>🎨 Professional Templates</h3>
            <p>Beautiful, responsive designs out of the box</p>
          </div>
          <div className="feature-card">
            <h3>🔧 Editable Code</h3>
            <p>Fine-tune generated code to perfection</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Docs Component
function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  return (
    <div className="docs-container">
      <div className="docs-sidebar">
        <h3>Documentation</h3>
        <nav className="docs-nav">
          <button 
            className={activeSection === 'getting-started' ? 'active' : ''}
            onClick={() => setActiveSection('getting-started')}
          >
            🚀 Getting Started
          </button>
          <button 
            className={activeSection === 'builder' ? 'active' : ''}
            onClick={() => setActiveSection('builder')}
          >
            🛠️ AI Builder
          </button>
          <button 
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={() => setActiveSection('projects')}
          >
            📁 Projects
          </button>
          <button 
            className={activeSection === 'import' ? 'active' : ''}
            onClick={() => setActiveSection('import')}
          >
            📥 Repository Import
          </button>
        </nav>
      </div>

      <div className="docs-content">
        {activeSection === 'getting-started' && (
          <div>
            <h1>Getting Started with Multiverse AI</h1>
            <p>Welcome to Multiverse AI! Here's how to build your first web application:</p>
            
            <div className="docs-step">
              <h3>1. Create an Account</h3>
              <p>Sign up using your email or GitHub account to get started.</p>
            </div>

            <div className="docs-step">
              <h3>2. Describe Your App</h3>
              <p>Use the AI Builder to describe what you want to build. You can use text or voice input.</p>
            </div>

            <div className="docs-step">
              <h3>3. Generate & Customize</h3>
              <p>AI will generate complete code. You can edit and customize it as needed.</p>
            </div>

            <div className="docs-step">
              <h3>4. Export & Deploy</h3>
              <p>Download your project files or deploy directly to your hosting platform.</p>
            </div>
          </div>
        )}

        {activeSection === 'builder' && (
          <div>
            <h1>AI Builder Guide</h1>
            <p>Learn how to use our powerful AI Builder to create web applications.</p>
            
            <h3>Voice Commands</h3>
            <p>Click the microphone icon to describe your app using voice commands.</p>
            
            <h3>Text Descriptions</h3>
            <p>Be specific in your descriptions for better results. Examples:</p>
            <ul>
              <li>"Create a portfolio website with dark mode"</li>
              <li>"Build an e-commerce store with shopping cart"</li>
              <li>"Make a weather dashboard with charts"</li>
            </ul>
          </div>
        )}

        {activeSection === 'projects' && (
          <div>
            <h1>Project Management</h1>
            <p>Organize and manage your created projects.</p>
            
            <h3>Project Grid</h3>
            <p>View all your projects in a beautiful grid layout.</p>
            
            <h3>Project History</h3>
            <p>Track changes and versions of your projects over time.</p>
          </div>
        )}

        {activeSection === 'import' && (
          <div>
            <h1>Repository Import</h1>
            <p>Import existing GitHub repositories into Multiverse AI.</p>
            
            <h3>How to Import</h3>
            <p>Paste any GitHub repository URL to import the code and start enhancing it with AI.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Project Grid Component
function ProjectsGridPage() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Weather Dashboard', description: 'Responsive weather app with real-time data', lastUpdated: '2 hours ago', type: 'web-app' },
    { id: 2, name: 'E-commerce Store', description: 'Online shopping platform with cart', lastUpdated: '1 day ago', type: 'ecommerce' },
    { id: 3, name: 'Portfolio Website', description: 'Professional portfolio with dark mode', lastUpdated: '3 days ago', type: 'portfolio' },
    { id: 4, name: 'Task Manager', description: 'Productivity app with drag & drop', lastUpdated: '1 week ago', type: 'web-app' },
    { id: 5, name: 'Blog Platform', description: 'Modern blogging platform with CMS', lastUpdated: '2 weeks ago', type: 'blog' },
    { id: 6, name: 'Social Network', description: 'Community platform with profiles', lastUpdated: '1 month ago', type: 'social' }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Project Gallery</h1>
        <p>Explore and manage all your created projects</p>
      </div>
      
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-type">{project.type}</div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-actions">
              <button className="open-btn">Open Project</button>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
            <span className="project-date">Updated: {project.lastUpdated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Project History Component
function ProjectHistoryPage() {
  const [projectHistory, setProjectHistory] = useState([
    { id: 1, name: 'Weather Dashboard', action: 'Code generated', timestamp: '2 hours ago', user: 'You' },
    { id: 2, name: 'E-commerce Store', action: 'Project updated', timestamp: '1 day ago', user: 'You' },
    { id: 3, name: 'Portfolio Website', action: 'Project created', timestamp: '3 days ago', user: 'You' },
    { id: 4, name: 'Task Manager', action: 'Files exported', timestamp: '1 week ago', user: 'You' },
    { id: 5, name: 'Blog Platform', action: 'Repository imported', timestamp: '2 weeks ago', user: 'You' }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Project History</h1>
        <p>Track all activities and changes across your projects</p>
      </div>
      
      <div className="history-timeline">
        {projectHistory.map(history => (
          <div key={history.id} className="history-item">
            <div className="history-dot"></div>
            <div className="history-content">
              <h4>{history.name}</h4>
              <p>{history.action} • {history.timestamp}</p>
              <span className="history-user">{history.user}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const { user, signUp, login, logout, loginWithGitHub, loading } = useAuth();
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
            <button 
              type="submit" 
              className="auth-submit"
              disabled={isAuthLoading}
            >
              {isAuthLoading ? '🔄 Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
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
          <h2>🚀 Multiverse AI</h2>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`nav-link ${currentPage === 'create' ? 'active' : ''}`}
            onClick={() => setCurrentPage('create')}
          >
            ✨ Create Project
          </button>
          <button 
            className={`nav-link ${currentPage === 'grid' ? 'active' : ''}`}
            onClick={() => setCurrentPage('grid')}
          >
            📁 Project Grid
          </button>
          <button 
            className={`nav-link ${currentPage === 'history' ? 'active' : ''}`}
            onClick={() => setCurrentPage('history')}
          >
            📊 Project History
          </button>
          <button 
            className={`nav-link ${currentPage === 'import' ? 'active' : ''}`}
            onClick={() => setCurrentPage('import')}
          >
            📥 Import Repo
          </button>
          <button 
            className={`nav-link ${currentPage === 'docs' ? 'active' : ''}`}
            onClick={() => setCurrentPage('docs')}
          >
            📚 Docs
          </button>
          <button 
            className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => setCurrentPage('about')}
          >
            👥 About Us
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

        {currentPage === 'create' && (
          <div className="create-page">
            <div className="page-header">
              <h1>Create New Project</h1>
              <p>Start building your next amazing web application</p>
            </div>
            <ComponentRestoration />
          </div>
        )}

        {currentPage === 'grid' && <ProjectsGridPage />}
        {currentPage === 'history' && <ProjectHistoryPage />}
        {currentPage === 'import' && (
          <div className="import-page">
            <div className="page-header">
              <h1>Import Repository</h1>
              <p>Bring your existing GitHub projects into Multiverse AI</p>
            </div>
            <RepositoryImport />
          </div>
        )}
        {currentPage === 'docs' && <DocsPage />}
        {currentPage === 'about' && <AboutUsPage />}
      </main>
    </div>
  );
}

export default App;
