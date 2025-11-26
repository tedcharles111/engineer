const express = require('express');
const cors = require('cors');
const { generateCodeWithMistral } = require('./mistral-service');
const simpleGit = require('simple-git');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage for projects
const projects = new Map();
const users = new Map();

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Multiverse AI Backend with Mistral is running' });
});

// Real Mistral AI code generation
app.post('/api/generate-code', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('🚀 Generating code with Mistral AI...');
    const files = await generateCodeWithMistral(prompt);
    
    res.json({
      success: true,
      files: files,
      message: 'Code generated successfully with Mistral Large'
    });
  } catch (error) {
    console.error('Code generation error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

// GitHub export functionality
app.post('/api/export-github', async (req, res) => {
  try {
    const { files, projectName } = req.body;
    
    if (!files || !projectName) {
      return res.status(400).json({ error: 'Files and project name are required' });
    }

    // Create temporary directory
    const tempDir = path.join('/tmp', `multiverse-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });
    
    // Write files
    for (const file of files) {
      const filePath = path.join(tempDir, file.name);
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, file.content);
    }
    
    // Initialize git repo and push to GitHub
    const git = simpleGit(tempDir);
    await git.init();
    await git.add('.');
    await git.commit(`Initial commit: ${projectName}`);
    
    res.json({
      success: true,
      message: 'Project ready for GitHub export',
      downloadUrl: `/api/download-project?dir=${path.basename(tempDir)}`,
      files: files.map(f => f.name)
    });
  } catch (error) {
    console.error('GitHub export error:', error);
    res.status(500).json({ 
      success: false,
      error: 'GitHub export failed: ' + error.message 
    });
  }
});

// Real repository import
app.post('/api/import-repo', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    // Extract owner and repo from URL
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid GitHub URL' });
    }

    const [, owner, repo] = match;
    
    // Get repository contents from GitHub API
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents`, {
      headers: {
        'User-Agent': 'Multiverse-AI-Builder',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const files = [];
    
    // Process files (simplified - in real implementation, we'd recursively get all files)
    for (const item of response.data.slice(0, 10)) { // Limit to first 10 files for demo
      if (item.type === 'file') {
        try {
          const fileResponse = await axios.get(item.download_url);
          files.push({
            name: item.path,
            language: getLanguageFromFile(item.path),
            content: fileResponse.data
          });
        } catch (error) {
          console.log(`Could not fetch file: ${item.path}`);
        }
      }
    }

    res.json({
      success: true,
      files: files,
      message: `Imported ${files.length} files from ${owner}/${repo}`
    });
  } catch (error) {
    console.error('Repository import error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Repository import failed: ' + error.message 
    });
  }
});

// Project management
app.post('/api/projects', (req, res) => {
  const { name, description, files, userId } = req.body;
  
  const project = {
    id: 'project-' + Date.now(),
    name,
    description,
    files,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  projects.set(project.id, project);
  res.json({ success: true, project });
});

app.get('/api/projects', (req, res) => {
  const { userId } = req.query;
  const userProjects = Array.from(projects.values())
    .filter(p => p.userId === userId)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
  res.json({ success: true, projects: userProjects });
});

function getLanguageFromFile(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    'html': 'html', 'css': 'css', 'js': 'javascript', 'jsx': 'javascript',
    'ts': 'typescript', 'tsx': 'typescript', 'py': 'python', 'json': 'json',
    'md': 'markdown', 'txt': 'text', 'java': 'java', 'cpp': 'cpp', 'c': 'c'
  };
  return languageMap[ext] || 'text';
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Multiverse AI Backend running on port ${PORT}`);
  console.log(`✅ Mistral AI: ACTIVE (API Key: 8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu)`);
  console.log(`✅ GitHub Export: READY`);
  console.log(`✅ Repository Import: READY`);
});
