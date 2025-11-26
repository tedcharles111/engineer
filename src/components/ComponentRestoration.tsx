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
  const [error, setError] = useState('');
  const recognitionRef = useRef<any>(null);

  // Load ResponsiveVoice
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=WkAsgle4';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('✅ ResponsiveVoice loaded successfully');
    };

    script.onerror = () => {
      console.log('❌ Failed to load ResponsiveVoice');
    };

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

    recognition.onstart = () => {
      console.log('🎤 Speech recognition started');
      setIsListening(true);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + ' ' + transcript);
      console.log('🎤 Speech captured:', transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('🎤 Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      console.log('🎤 Speech recognition ended');
      setIsListening(false);
    };

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
    
    try {
      if ((window as any).responsiveVoice) {
        (window as any).responsiveVoice.speak(text, 'US English Female', {
          onstart: () => console.log('🔊 TTS started'),
          onend: () => console.log('🔊 TTS ended')
        });
      } else {
        // Fallback to Web Speech API
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('🔊 TTS error:', error);
    }
  };

  const generateCode = async () => {
    if (!inputText.trim()) {
      setError('Please enter a description of what you want to build');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      console.log('🚀 Sending request to backend...');
      
      const response = await fetch('http://localhost:5000/api/generate-code', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputText })
      });

      console.log('📥 Received response:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (data.success) {
        setCodeFiles(data.files);
        if (data.files.length > 0) {
          setActiveFile(0);
        }
        speakText('Code generated successfully with Mistral AI');
        setError('');
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error: any) {
      console.error('❌ Generation error:', error);
      const errorMessage = error.message || 'Failed to generate code. Please check if the backend is running.';
      setError(errorMessage);
      speakText('Code generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const testMistralConnection = async () => {
    try {
      setError('');
      const response = await fetch('http://localhost:5000/api/test-mistral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Mistral AI connection test successful!');
        speakText('Mistral AI is working properly');
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      setError('Mistral AI test failed: ' + error.message);
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
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            onClick={testMistralConnection}
            style={{
              padding: '0.5rem 1rem',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🧪 Test Connection
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.1)',
            color: '#e74c3c',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid rgba(231, 76, 60, 0.3)'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
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
        </div>
      </div>

      {/* Right Panel - Code & Preview */}
      <div style={{ 
        flex: 2, 
        display: 'flex', 
        flexDirection: 'column',
        background: '#111'
      }}>
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
                padding: '0.75rem 1.5rem',
                background: activeView === 'code' ? '#667eea' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px 0 0 6px',
                borderRight: '1px solid #444'
              }}
            >
              📝 Code View
            </button>
            <button
              onClick={() => setActiveView('preview')}
              style={{
                padding: '0.75rem 1.5rem',
                background: activeView === 'preview' ? '#667eea' : '#333',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '0 6px 6px 0'
              }}
            >
              👁️ Live Preview
            </button>
            
            <button
              onClick={previewInNewTab}
              disabled={!codeFiles.find(f => f.name.endsWith('.html'))}
              style={{
                padding: '0.75rem 1rem',
                background: '#e67e22',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '6px',
                marginLeft: 'auto',
                marginRight: '0.5rem'
              }}
            >
              🔗 Open in New Tab
            </button>
          </div>
        )}

        {/* File Tabs */}
        {codeFiles.length > 0 && activeView === 'code' && (
          <div style={{ 
            display: 'flex', 
            background: '#1a1a1a',
            borderBottom: '1px solid #333',
            flexWrap: 'wrap',
            overflowX: 'auto'
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
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem'
                }}
              >
                {file.name}
              </button>
            ))}
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
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Welcome to Multiverse AI</h3>
              <p style={{ lineHeight: '1.6', maxWidth: '400px' }}>
                Describe your web application using text or voice input.<br />
                Our Mistral Large AI will generate complete, production-ready code.
              </p>
              <div style={{ marginTop: '2rem', color: '#999', fontSize: '0.9rem' }}>
                <p>💡 <strong>Tip:</strong> Be specific in your descriptions for better results</p>
                <p>🎯 <strong>Example:</strong> "Create a weather dashboard with dark theme"</p>
              </div>
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
              fontSize: '0.85rem',
              lineHeight: '1.4',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace'
            }}>
              {codeFiles[activeFile]?.content || '// No content available'}
            </pre>
          ) : (
            <iframe
              srcDoc={codeFiles.find(file => file.name.endsWith('.html'))?.content || '<html><body style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #1a1a1a; color: white;"><h1>No HTML file generated for preview</h1></body></html>'}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: 'white'
              }}
              title="live-preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>

        {/* Status Bar */}
        <div style={{
          background: '#1a1a1a',
          padding: '0.5rem 1rem',
          borderTop: '1px solid #333',
          color: '#ccc',
          fontSize: '0.8rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>
            {codeFiles.length > 0 
              ? `📁 ${codeFiles.length} files generated • ${activeView === 'code' ? codeFiles[activeFile]?.name : 'Preview'}`
              : 'Ready to generate code'
            }
          </span>
          <span>
            {isGenerating ? '🔄 Generating...' : '✅ Ready'}
          </span>
        </div>
      </div>
    </div>
  );
}
