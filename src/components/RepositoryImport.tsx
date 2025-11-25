import { useState } from 'react';

export function RepositoryImport() {
  const [repoUrl, setRepoUrl] = useState('');

  const handleImport = () => {
    if (!repoUrl.trim()) {
      alert('Please enter a GitHub repository URL');
      return;
    }
    alert(`Would import repository: ${repoUrl}`);
  };

  return (
    <div style={{ 
      background: '#333',
      padding: '2rem',
      borderRadius: '8px',
      marginTop: '1rem'
    }}>
      <h3>📥 Import GitHub Repository</h3>
      <p>Paste the URL of any GitHub repository to import it:</p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#1a1a1a',
            border: '1px solid #444',
            borderRadius: '6px',
            color: 'white',
            fontSize: '1rem'
          }}
        />
        
        <button
          onClick={handleImport}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Import
        </button>
      </div>
      
      <div style={{ 
        background: '#2a2a2a', 
        padding: '1rem', 
        borderRadius: '6px',
        fontSize: '0.9rem',
        color: '#ccc'
      }}>
        <p><strong>Example URLs:</strong></p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>https://github.com/tedcharles111/engineer</li>
          <li>https://github.com/facebook/react</li>
          <li>https://github.com/tensorflow/tensorflow</li>
        </ul>
      </div>
    </div>
  );
}
