import { useState } from 'react';

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

export function RepositoryImport() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importedFiles, setImportedFiles] = useState<CodeFile[]>([]);

  const handleImport = async () => {
    if (!repoUrl.trim()) {
      alert('Please enter a GitHub repository URL');
      return;
    }

    setIsImporting(true);
    try {
      const response = await fetch('http://localhost:5000/api/import-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: repoUrl })
      });

      const data = await response.json();

      if (data.success) {
        setImportedFiles(data.files);
        alert(`Successfully imported ${data.files.length} files from repository!`);
      } else {
        alert('Import failed: ' + data.error);
      }
    } catch (error) {
      alert('Import failed: ' + error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div style={{ 
      background: '#111',
      padding: '2rem',
      borderRadius: '12px',
      marginTop: '1rem'
    }}>
      <h3 style={{ color: '#fff', marginBottom: '1rem' }}>📥 Import GitHub Repository</h3>
      <p style={{ color: '#ccc', marginBottom: '1.5rem' }}>
        Import any public GitHub repository to analyze and modify the code with AI.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          style={{
            flex: 1,
            padding: '0.75rem',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '1rem'
          }}
        />
        
        <button
          onClick={handleImport}
          disabled={isImporting}
          style={{
            padding: '0.75rem 1.5rem',
            background: isImporting ? '#666' : '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isImporting ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {isImporting ? '🔄 Importing...' : '🚀 Import Repository'}
        </button>
      </div>
      
      {/* Imported Files Preview */}
      {importedFiles.length > 0 && (
        <div style={{ 
          background: '#1a1a1a', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>
            📁 Imported Files ({importedFiles.length})
          </h4>
          <div style={{ maxHeight: '200px', overflow: 'auto' }}>
            {importedFiles.map((file, index) => (
              <div key={index} style={{ 
                padding: '0.5rem',
                borderBottom: '1px solid #333',
                color: '#ccc',
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>{file.name}</span>
                <span style={{ 
                  background: '#333', 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {file.language}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ 
        background: '#1a1a1a', 
        padding: '1rem', 
        borderRadius: '8px',
        marginTop: '1rem',
        border: '1px solid #333'
      }}>
        <p style={{ color: '#ccc', margin: 0, fontSize: '0.9rem' }}>
          <strong>💡 Examples:</strong><br />
          • https://github.com/facebook/react<br />
          • https://github.com/tensorflow/tensorflow<br />
          • https://github.com/tedcharles111/engineer
        </p>
      </div>
    </div>
  );
}
