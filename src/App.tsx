import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 Multiverse AI</h1>
            <p>Build web apps with AI power</p>
          </div>
          <div className="user-section">
            <span className="user-email">Welcome!</span>
            <button className="logout-btn">Sign In</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-container">
          <div className="chat-panel" style={{ 
            background: 'white', 
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2>🎉 Multiverse AI Builder is Working!</h2>
            <p>Your app is successfully deployed and running.</p>
            <p>Next: The full chat interface will load here.</p>
          </div>

          <div className="preview-panel" style={{ 
            background: 'white', 
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h2>👁️ Code Preview</h2>
            <p>Generated code will appear here.</p>
            <p>Toggle between code and preview views.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
