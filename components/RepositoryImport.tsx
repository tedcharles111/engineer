// components/RepositoryImport.tsx
export function RepositoryImport() {
  const [repoUrl, setRepoUrl] = useState('');
  
  const importRepo = async () => {
    // Extract owner and repo from URL
    const match = repoUrl.match(/github.com\/([^/]+)\/([^/]+)/);
    if (match) {
      const [_, owner, repo] = match;
      
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
        const files = await response.json();
        
        // Process repository files
        const projectCode = await processRepositoryFiles(files);
        return projectCode;
      } catch (error) {
        console.error('Repository import failed:', error);
      }
    }
  };
  
  return (
    <div className="repo-import-section">
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="https://github.com/username/repository"
        className="repo-input"
      />
      <button onClick={importRepo} className="import-btn">
        📥 Import Repository
      </button>
    </div>
  );
}
