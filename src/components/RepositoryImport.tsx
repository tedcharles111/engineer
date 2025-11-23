import { useState } from 'react';

export function RepositoryImport() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  
  const importRepo = async () => {
    if (!repoUrl) return;
    
    setIsImporting(true);
    try {
      // Extract owner and repo from URL
      const match = repoUrl.match(/github.com\/([^/]+)\/([^/]+)/);
      if (match) {
        const [_, owner, repo] = match;
        
        // This would be replaced with actual GitHub API integration
        console.log(`Importing repository: ${owner}/${repo}`);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        alert(`Repository ${owner}/${repo} imported successfully!`);
        setRepoUrl('');
      } else {
        alert('Please enter a valid GitHub repository URL');
      }
    } catch (error) {
      console.error('Repository import failed:', error);
      alert('Failed to import repository. Please check the URL and try again.');
    } finally {
      setIsImporting(false);
    }
  };
  
  return (
    <div className="repo-import-section">
      <h3>📥 Import GitHub Repository</h3>
      <div className="repo-input-group">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          className="repo-input"
        />
        <button 
          onClick={importRepo} 
          className="import-btn"
          disabled={!repoUrl || isImporting}
        >
          {isImporting ? '🔄 Importing...' : '📥 Import Repository'}
        </button>
      </div>
      <p className="repo-help">
        Paste a GitHub URL to import an existing repository into your projects.
      </p>
    </div>
  );
}
