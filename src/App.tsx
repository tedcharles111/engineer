import React from 'react'
import BaseChat from './components/BaseChat'

function App() {
  return (
    <div className="multiverse-app">
      <header className="app-header">
        <h1>🚀 Multiverse AI Builder</h1>
        <p>Create web apps with the power of multiple AI models</p>
      </header>
      <main>
        <div className="container">
          <BaseChat />
          <div className="features-sidebar">
            <div className="preview-tag">
              <small>✨ Edit with Multiverse</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
