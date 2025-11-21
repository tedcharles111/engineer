import { useState, useRef, useEffect } from 'react';
import { MultiverseAIService } from '../lib/llm/mistralService';
import { GitHubService } from '../lib/github/githubService';
import { useSpeechToText } from '../hooks/useSpeechToText';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import './BaseChat.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

interface BaseChatProps {
  onCodeGenerated: (code: string) => void;
}

export default function BaseChat({ onCodeGenerated }: BaseChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [githubStatus, setGithubStatus] = useState<'disconnected' | 'connected' | 'checking'>('checking');
  const [showGithubExport, setShowGithubExport] = useState(false);
  
  const aiServiceRef = useRef(new MultiverseAIService());
  const githubServiceRef = useRef(new GitHubService());
  
  // Speech features
  const { 
    isListening, 
    transcript, 
    isSupported: isSpeechSupported, 
    startListening, 
    stopListening,
    resetTranscript 
  } = useSpeechToText();
  
  const { 
    isSpeaking, 
    speak, 
    stop: stopSpeaking, 
    isSupported: isTtsSupported 
  } = useTextToSpeech();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  useEffect(() => {
    checkGithubConnection();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkGithubConnection = async () => {
    setGithubStatus('checking');
    const isConnected = await githubServiceRef.current.isConnected();
    setGithubStatus(isConnected ? 'connected' : 'disconnected');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    resetTranscript();

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const chatHistory = [
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        })),
        { role: 'user', content: input.trim() }
      ];

      let fullResponse = '';
      let codeContent = '';

      await aiServiceRef.current.generateStream(chatHistory, (chunk) => {
        fullResponse += chunk;
        codeContent = extractCodeFromResponse(fullResponse);
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: fullResponse, isStreaming: true }
            : msg
        ));

        if (codeContent) {
          onCodeGenerated(codeContent);
        }
      });

      // Final update after streaming complete
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: fullResponse, isStreaming: false }
          : msg
      ));

      if (!codeContent) {
        codeContent = extractCodeFromResponse(fullResponse);
        if (codeContent) {
          onCodeGenerated(codeContent);
        }
      }

      setShowGithubExport(true);

    } catch (error: any) {
      console.error('Generation error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { 
              ...msg, 
              content: msg.content + `\n\n❌ Error: ${error.message}`,
              isStreaming: false 
            }
          : msg
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const extractCodeFromResponse = (response: string): string => {
    const htmlMatch = response.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) return htmlMatch[1];

    const genericMatch = response.match(/```\n([\s\S]*?)\n```/);
    if (genericMatch) return genericMatch[1];

    if (response.includes('<html') || response.includes('<div') || response.includes('<h1')) {
      return response;
    }

    return '';
  };

  const handleGithubExport = async () => {
    const latestMessage = messages.filter(m => m.role === 'assistant').pop();
    if (!latestMessage) return;

    try {
      const code = extractCodeFromResponse(latestMessage.content);
      if (!code) {
        alert('No code found to export.');
        return;
      }

      const repoName = `multiverse-app-${Date.now()}`;
      const description = 'Web app generated with Multiverse AI Builder';
      
      const result = await githubServiceRef.current.createProjectFromCode(
        [{ path: 'index.html', content: code }],
        repoName,
        description
      );

      alert(`🎉 Successfully exported to GitHub!\n\n📁 Repository: ${result.repoUrl}\n🌐 Live Site: ${result.pagesUrl}`);
      
    } catch (error: any) {
      alert(`❌ Export failed: ${error.message}`);
    }
  };

  const handleSpeakMessage = (content: string) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      // Extract just the text content, not code blocks
      const textContent = content.replace(/```[\s\S]*?```/g, '').trim();
      if (textContent) {
        speak(textContent);
      }
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const examplePrompts = [
    "Create a modern weather dashboard with dark/light mode toggle",
    "Build a task management app with drag and drop functionality",
    "Make a responsive portfolio website with smooth animations",
    "Create a real-time chat interface with message bubbles",
    "Build a crypto price tracker with live updating charts",
    "Make a restaurant website with menu and reservation system"
  ];

  const hasApiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  return (
    <div className="base-chat">
      <div className="chat-header">
        <h3>🚀 Multiverse AI Builder</h3>
        <p>Real-time code generation with advanced features</p>
        <div className="status-badges">
          <div className={`status-badge api-status ${hasApiKey ? 'connected' : 'disconnected'}`}>
            {hasApiKey ? '🤖 API Connected' : '❌ API Needed'}
          </div>
          <div className={`status-badge github-status ${githubStatus}`}>
            {githubStatus === 'connected' ? '🔗 GitHub Ready' : 
             githubStatus === 'checking' ? '🔍 Checking GitHub...' : '📝 Connect GitHub'}
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h4>🎉 Welcome to Multiverse AI Builder!</h4>
            <p>Describe any web app and get real, working code instantly:</p>
            <div className="example-prompts">
              {examplePrompts.map((prompt, index) => (
                <div 
                  key={index}
                  className="prompt"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </div>
              ))}
            </div>
            <div className="feature-highlights">
              <div className="feature">
                <span className="feature-icon">🎤</span>
                <span>Voice Input: Click microphone to speak</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔊</span>
                <span>Text-to-Speech: Click speaker to hear responses</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔗</span>
                <span>GitHub Export: One-click deployment</span>
              </div>
            </div>
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-header">
                <span className="message-sender">
                  {message.role === 'assistant' ? '🤖 Multiverse AI' : '👤 You'}
                </span>
                <div className="message-actions">
                  {message.role === 'assistant' && isTtsSupported && (
                    <button 
                      className={`speak-btn ${isSpeaking ? 'speaking' : ''}`}
                      onClick={() => handleSpeakMessage(message.content)}
                      title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
                    >
                      {isSpeaking ? '⏹️' : '🔊'}
                    </button>
                  )}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="message-content">
                {message.content}
                {message.isStreaming && (
                  <span className="streaming-cursor">▊</span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {showGithubExport && githubStatus === 'connected' && (
        <div className="github-export-section">
          <h4>🚀 Ready to Deploy</h4>
          <p>Export your project directly to GitHub with one click</p>
          <button onClick={handleGithubExport} className="github-export-btn">
            📦 Export to GitHub
          </button>
        </div>
      )}

      {showGithubExport && githubStatus === 'disconnected' && (
        <div className="github-connect-section">
          <h4>🔗 Connect GitHub to Export</h4>
          <p>Sign in with GitHub to deploy your projects instantly</p>
          <button 
            onClick={() => window.location.href = '/?tab=auth'} 
            className="github-connect-btn"
          >
            Connect GitHub Account
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your web app or click microphone to speak..."
            rows={3}
            disabled={isGenerating}
            className="chat-input"
          />
          <div className="input-controls">
            {isSpeechSupported && (
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`voice-btn ${isListening ? 'listening' : ''}`}
                disabled={isGenerating}
              >
                {isListening ? '🔴' : '🎤'}
              </button>
            )}
            <button 
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="send-button"
            >
              {isGenerating ? (
                <>
                  <div className="loading-spinner"></div>
                  Generating...
                </>
              ) : (
                '🚀 Generate Code'
              )}
            </button>
          </div>
        </div>
        {isListening && (
          <div className="voice-indicator">
            <div className="voice-pulse"></div>
            <span>Listening... {transcript && `"${transcript}"`}</span>
          </div>
        )}
        {!hasApiKey && (
          <div className="api-warning">
            ⚠️ Mistral API key not configured. Please set VITE_MISTRAL_API_KEY in your Netlify environment variables.
          </div>
        )}
      </form>
    </div>
  );
}
