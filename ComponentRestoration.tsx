// Create this emergency UI restoration component
import { useState, useEffect } from 'react';

export function UIRestorationLayer() {
  const [activeView, setActiveView] = useState<'code' | 'preview'>('preview');
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Speech-to-text implementation
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="ui-restoration">
      {/* Input Bar Restoration */}
      <div className="input-section">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your web app or use voice input..."
            rows={3}
            className="chat-input"
          />
          <div className="input-controls">
            <button 
              onClick={startListening}
              className={`voice-btn ${isListening ? 'listening' : ''}`}
            >
              {isListening ? '🛑' : '🎤'}
            </button>
            <button className="send-button">
              🚀 Generate Code
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Switch Restoration */}
      <div className="view-controls">
        <div className="toggle-group">
          <button 
            className={`toggle-btn ${activeView === 'code' ? 'active' : ''}`}
            onClick={() => setActiveView('code')}
          >
            💻 Code
          </button>
          <button 
            className={`toggle-btn ${activeView === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveView('preview')}
          >
            👁️ Preview
          </button>
        </div>
        
        {/* Code Editor */}
        {activeView === 'code' && (
          <div className="code-editor-section">
            <textarea
              value={generatedCode}
              onChange={(e) => setGeneratedCode(e.target.value)}
              className="code-editor"
              placeholder="Generated code will appear here. You can edit it directly."
              rows={20}
            />
          </div>
        )}
        
        {/* Preview Pane */}
        {activeView === 'preview' && (
          <div className="preview-section">
            <iframe
              srcDoc={generatedCode || '<div>Preview will appear here</div>'}
              className="preview-iframe"
              title="live-preview"
            />
          </div>
        )}
      </div>
    </div>
  );
}
