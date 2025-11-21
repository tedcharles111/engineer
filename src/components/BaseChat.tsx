import { useState, useRef, useEffect } from 'react';
import { MultiverseAIService } from '../lib/llm/mistralService';
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
  
  const aiServiceRef = useRef(new MultiverseAIService());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    } catch (error: any) {
      console.error('Generation error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { 
              ...msg, 
              content: msg.content + `\n\n❌ Error: ${error.message}. Please check your API key and try again.`,
              isStreaming: false 
            }
          : msg
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const extractCodeFromResponse = (response: string): string => {
    // Extract code from markdown code blocks
    const htmlMatch = response.match(/```html\n([\s\S]*?)\n```/);
    if (htmlMatch) return htmlMatch[1];

    const genericMatch = response.match(/```\n([\s\S]*?)\n```/);
    if (genericMatch) return genericMatch[1];

    // If no code blocks, check if there's HTML content
    if (response.includes('<html') || response.includes('<div') || response.includes('<h1')) {
      return response;
    }

    return '';
  };

  const examplePrompts = [
    "Create a modern weather dashboard with dark/light mode toggle",
    "Build a task management app with drag and drop functionality",
    "Make a responsive portfolio website with smooth animations",
    "Create a real-time chat interface with message bubbles"
  ];

  const hasApiKey = import.meta.env.VITE_MISTRAL_API_KEY;

  return (
    <div className="base-chat">
      <div className="chat-header">
        <h3>🚀 Multiverse AI Builder</h3>
        <p>Real-time code generation with Mistral Large</p>
        <div className="api-status">
          {hasApiKey ? '✅ API Connected' : '❌ API Key Missing'}
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h4>🎉 Welcome to Multiverse AI!</h4>
            <p>Describe any web app and get real, working code generated instantly:</p>
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
          </div>
        ) : (
          messages.map(message => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-header">
                <span className="message-sender">
                  {message.role === 'assistant' ? '🤖 Multiverse AI' : '👤 You'}
                </span>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
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

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the web app you want to build... (e.g., 'Create a modern dashboard with dark mode')"
            rows={3}
            disabled={isGenerating}
            className="chat-input"
          />
          <div className="input-controls">
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
                '🚀 Generate Real Code'
              )}
            </button>
          </div>
        </div>
        {!hasApiKey && (
          <div className="api-warning">
            ⚠️ Mistral API key not configured. Please set VITE_MISTRAL_API_KEY in your Netlify environment variables.
          </div>
        )}
      </form>
    </div>
  );
}
