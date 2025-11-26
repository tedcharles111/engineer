import { useState, useRef, useEffect } from 'react';

interface CodeFile {
  name: string;
  language: string;
  content: string;
}

export function ComponentRestoration() {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([]);
  const [activeFile, setActiveFile] = useState<number>(0);
  const [activeView, setActiveView] = useState<'code' | 'preview'>('preview');
  const [projectName, setProjectName] = useState('');
  const recognitionRef = useRef<any>(null);

  // Load ResponsiveVoice
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=WkAsgle4';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Chrome.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + ' ' + transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (!text.trim()) return;
    if ((window as any).responsiveVoice) {
      (window as any).responsiveVoice.speak(text, 'US English Female');
    }
  };

  const generateCode = async () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputText })
      });

      const data = await response.json();

      if (data.success) {
        setCodeFiles(data.files);
        if (data.files.length > 0) {
          setActiveFile(0);
        }
        speakText('Code generated successfully with Mistral AI');
      } else {
        alert('Generation failed: ' + data.error);
      }
    } catch (error) {
      alert('Generation failed: ' + error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportToGitHub = async () => {
    if (codeFiles.length === 0) {
      alert('No code to export. Please generate code first.');
      return;
    }

    const name = projectName || `multiverse-project-${Date.now()}`;
    
    try {
      const response = await fetch('http://localhost:5000/api/export-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          files: codeFiles, 
          projectName: name 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Project "${name}" is ready for GitHub export!`);
        speakText('Project exported successfully');
      } else {
        alert('Export failed: ' + data.error);
      }
    } catch (error) {
      alert('Export failed: ' + error);
    }
  };

  const previewInNewTab = () => {
    const htmlFile = codeFiles.find(file => file.name.endsWith('.html'));
    if (!htmlFile) {
      alert('No HTML file found for preview');
      return;
    }

    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(htmlFile.content);
      previewWindow.document.close();
    }
  };

  const saveProject = async () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    if (codeFiles.length === 0) {
      alert('No code to save');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: projectName,
          description: `Generated from: ${inputText}`,
          files: codeFiles,
          userId: 'current-user'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Project "${projectName}" saved successfully!`);
        speakText('Project saved successfully');
      }
    } catch (error) {
      alert('Save failed: ' + error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '80vh', 
      gap: '1rem',
      background: '#0a0a0a',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Left Panel - Chat Input */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#111',
        padding: '2rem',
        borderRight: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '1rem' }}>🤖 AI Code Generator</h2>
        
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe your web application... (e.g., Create a portfolio website with dark mode, contact form, and animations)"
          rows={6}
          style={{
            width: '100%',
            padding: '1rem',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '1rem',
            marginBottom: '1rem',
            resize: 'vertical'
          }}
        />
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={isListening ? stopListening : startListening}
            style={{
              padding: '0.75rem 1rem',
              background: isListening ? '#e74c3c' : '#34495e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isListening ? '🔴 Stop' : '🎤 Voice Input'}
          </button>

          <button
            onClick={() => speakText(inputText)}
            disabled={!inputText.trim()}
            style={{
              padding: '0.75rem 1rem',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            🔊 Speak Text
          </button>

          <button
            onClick={generateCode}
            disabled={isGenerating || !inputText.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              background: isGenerating ? '#666' : '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              marginLeft: 'auto'
            }}
          >
            {isGenerating ? '🚀 Generating...' : '⚡ Generate Code'}
          </button>
        </div>

        {/* Project Management */}
        <div style={{ marginTop: 'auto' }}>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '6px',
              color: '#fff',
              marginBottom: '0.5rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={saveProject}
              disabled={!projectName.trim() || codeFiles.length === 0}
              style={{
                padding: '0.75rem 1rem',
                background: !projectName.trim() || codeFiles.length === 0 ? '#666' : '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: !projectName.trim() || codeFiles.length === 0 ? 'not-allowed' : 'pointer',
                flex: 1
              }}
            >
              💾 Save Project
            </button>
            <button
              onClick={exportToGitHub}
              disabled={codeFiles.length === 0}
              style={{
                padding: '0.75rem 1rem',
                background: codeFiles.length === 0 ? '#666' : '#e67e22',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: codeFiles.length === 0 ? 'not-allowed' : 'pointer',
                flex: 1
              }}
            >
              📤 Export to GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Code & Preview */}
      <div style={{ 
        flex: 2, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#111'
      }}>
        {/* File Tabs */}
        {codeFiles.length > 0 && (
          <div style={{ 
            display: 'flex', 
            background: '#1a1a1a',
            borderBottom: '1px solid #333',
            flexWrap: 'wrap'
          }}>
            {codeFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveFile(index)}
                style={{
                  padding: '0.75rem 1rem',
                  background: activeFile === index ? '#333' : 'transparent',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  borderRight: '1px solid #333',
                  whiteSpace: 'nowrap'
                }}
              >
                {file.name}
              </button>
            ))}
          </div>
        )}

        {/* View Toggle */}
        {codeFiles.length > 0 && (
          <div style={{ 
            display: 'flex', 
            background: '#1a1a1a',
            borderBottom: '1px solid #333',
            padding: '0.5rem'
          }}>
            <button
              onClick={() => setActiveView('code')}
              style={{
                padding: '0.5rem 1rem',
                background: activeView === 'code' ? '#27ae60' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                marginRight: '0.5rem'
              }}
            >
              📝 Code
            </button>
            <button
              onClick={() => setActiveView('preview')}
              style={{
                padding: '0.5rem 1rem',
                background: activeView === 'preview' ? '#27ae60' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              👁️ Preview
            </button>
            <button
              onClick={previewInNewTab}
              style={{
                padding: '0.5rem 1rem',
                background: '#3498db',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                marginLeft: 'auto'
              }}
            >
              🔗 Open in New Tab
            </button>
          </div>
        )}

        {/* Content Area */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {codeFiles.length === 0 ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#666',
              flexDirection: 'column',
              padding: '2rem'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Welcome to Multiverse AI</h3>
              <p style={{ textAlign: 'center', lineHeight: '1.6' }}>
                Describe your web application using text or voice input.<br />
                Our Mistral Large AI will generate complete, production-ready code<br />
                including frontend, backend, and deployment files.
              </p>
            </div>
          ) : activeView === 'code' ? (
            <pre style={{ 
              margin: 0, 
              padding: '1rem',
              background: '#1a1a1a',
              color: '#f8f8f2',
              height: '100%',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}>
              {codeFiles[activeFile].content}
            </pre>
          ) : (
            <iframe
              srcDoc={codeFiles.find(file => file.name.endsWith('.html'))?.content || '<html><body><h1>No HTML file generated</h1></body></html>'}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
              title="preview"
            />
          )}
        </div>
      </div>
    </div>
  );
}
