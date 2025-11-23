import { useState, useEffect, useRef } from 'react';

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

export function ComponentRestoration() {
  const [activeView, setActiveView] = useState<'code' | 'preview'>('preview');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [activeFile, setActiveFile] = useState<number>(0);

  // Speech-to-text implementation
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
    }
  };

  // Text-to-speech implementation
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const generateMultiFileProject = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const projectName = inputText || 'My Awesome Project';
    
    const generatedFiles: CodeFile[] = [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to ${projectName}</h1>
            <nav>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
        
        <main>
            <section id="home">
                <h2>Home Section</h2>
                <p>This is a beautifully designed ${projectName} built with Multiverse AI.</p>
                <button onclick="showAlert()">Click Me!</button>
            </section>
            
            <section id="about">
                <h2>About Us</h2>
                <p>Learn more about what we do and how we can help you.</p>
            </section>
            
            <section id="contact">
                <h2>Contact</h2>
                <form id="contactForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </main>
        
        <footer>
            <p>&copy; 2024 ${projectName}. All rights reserved.</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

header {
    background: #2c3e50;
    color: white;
    padding: 1rem 0;
}

header h1 {
    text-align: center;
    margin-bottom: 1rem;
}

nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.3s;
}

nav a:hover {
    background: #34495e;
}

main {
    padding: 2rem;
}

section {
    margin-bottom: 3rem;
    padding: 2rem;
    border-radius: 8px;
    background: #f8f9fa;
}

h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
}

button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #2980b9;
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
}

input, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

footer {
    background: #34495e;
    color: white;
    text-align: center;
    padding: 1rem;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    
    main {
        padding: 1rem;
    }
    
    section {
        padding: 1rem;
    }
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `// JavaScript for ${projectName}
function showAlert() {
    alert('Hello! Welcome to ${projectName}!');
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Additional interactive features
console.log('${projectName} is running successfully!');`
      },
      {
        name: 'README.md',
        language: 'markdown',
        content: `# ${projectName}

## Project Description
This project was generated using Multiverse AI Builder. It's a responsive web application with modern design and interactive features.

## Features
- Responsive design
- Smooth scrolling navigation
- Contact form with validation
- Modern CSS with gradients
- Interactive JavaScript elements

## File Structure
- \`index.html\` - Main HTML structure
- \`styles.css\` - Styling and responsive design
- \`script.js\` - JavaScript functionality
- \`README.md\` - Project documentation

## Getting Started
1. Open \`index.html\` in your web browser
2. Or deploy to any web server

## Customization
Feel free to modify any of the files to suit your needs. The code is well-structured and commented for easy understanding.`
      }
    ];
    
    setCodeFiles(generatedFiles);
    setIsGenerating(false);
  };

  const getFileIcon = (language: string) => {
    switch (language) {
      case 'html': return '🌐';
      case 'css': return '🎨';
      case 'javascript': return '⚡';
      case 'markdown': return '📝';
      default: return '📄';
    }
  };

  const getPreviewContent = () => {
    if (codeFiles.length === 0) {
      return '<div style="padding: 2rem; text-align: center; color: #666;">Preview will appear here after code generation</div>';
    }
    
    const htmlFile = codeFiles.find(file => file.name === 'index.html');
    return htmlFile ? htmlFile.content : codeFiles[0].content;
  };

  return (
    <div className="component-restoration">
      {/* Input Section */}
      <div className="input-section">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your web app or use voice input... (e.g., 'Create a portfolio website with dark mode')"
            rows={3}
            className="chat-input"
          />
          <div className="input-controls">
            <button 
              onClick={startListening}
              className={`voice-btn ${isListening ? 'listening' : ''}`}
              disabled={isListening}
            >
              {isListening ? '🛑 Listening...' : '🎤 Voice Input'}
            </button>
            <button 
              onClick={() => speakText(inputText)}
              className="speak-btn"
              disabled={!inputText || isSpeaking}
            >
              {isSpeaking ? '🔊 Speaking...' : '📢 Speak'}
            </button>
            <button 
              onClick={generateMultiFileProject}
              className="send-button"
              disabled={!inputText.trim() || isGenerating}
            >
              {isGenerating ? '🔄 Generating...' : '🚀 Generate Multi-File Project'}
            </button>
          </div>
        </div>
      </div>

      {/* File Tabs and Toggle Switch */}
      <div className="view-controls">
        <div className="file-tabs">
          {codeFiles.map((file, index) => (
            <button
              key={file.name}
              className={`file-tab ${activeFile === index ? 'active' : ''}`}
              onClick={() => setActiveFile(index)}
            >
              {getFileIcon(file.language)} {file.name}
            </button>
          ))}
        </div>
        
        <div className="toggle-group">
          <button 
            className={`toggle-btn ${activeView === 'code' ? 'active' : ''}`}
            onClick={() => setActiveView('code')}
          >
            💻 Code Editor
          </button>
          <button 
            className={`toggle-btn ${activeView === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveView('preview')}
          >
            👁️ Live Preview
          </button>
        </div>
        
        {/* Code Editor */}
        {activeView === 'code' && codeFiles.length > 0 && (
          <div className="code-editor-section">
            <div className="file-header">
              <span>{getFileIcon(codeFiles[activeFile].language)} {codeFiles[activeFile].name}</span>
            </div>
            <textarea
              value={codeFiles[activeFile].content}
              onChange={(e) => {
                const updatedFiles = [...codeFiles];
                updatedFiles[activeFile].content = e.target.value;
                setCodeFiles(updatedFiles);
              }}
              className="code-editor"
              rows={20}
            />
            <div className="editor-actions">
              <button 
                onClick={() => navigator.clipboard.writeText(codeFiles[activeFile].content)}
                className="copy-btn"
              >
                📋 Copy Code
              </button>
              <button 
                onClick={() => {
                  const updatedFiles = codeFiles.filter((_, index) => index !== activeFile);
                  setCodeFiles(updatedFiles);
                  setActiveFile(Math.max(0, activeFile - 1));
                }}
                className="delete-btn"
              >
                🗑️ Delete File
              </button>
              <button 
                onClick={() => {
                  const blob = new Blob([codeFiles[activeFile].content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = codeFiles[activeFile].name;
                  a.click();
                }}
                className="download-btn"
              >
                📥 Download File
              </button>
            </div>
          </div>
        )}
        
        {/* Preview Pane */}
        {activeView === 'preview' && (
          <div className="preview-section">
            <iframe
              srcDoc={getPreviewContent()}
              className="preview-iframe"
              title="live-preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        )}

        {/* Empty State */}
        {codeFiles.length === 0 && activeView === 'code' && (
          <div className="empty-state">
            <h3>No files generated yet</h3>
            <p>Describe your project and click "Generate Multi-File Project" to start coding!</p>
          </div>
        )}
      </div>
    </div>
  );
}
