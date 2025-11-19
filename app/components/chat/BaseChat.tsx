import React, { useState, useRef, useEffect } from 'react';
import { MultiverseAIService } from '~/lib/llm/mistralService';
import { useSpeechToText } from '~/hooks/useSpeechToText';
import { SendButton } from './SendButton.client';
import { Messages } from './Messages.client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

export function BaseChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>(['nebula-mistral']);
  const aiServiceRef = useRef(new MultiverseAIService());
  const { isListening, transcript, startListening, stopListening } = useSpeechToText();

  // Sync speech transcript with input
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    const responses = new Map<string, string>();

    try {
      await aiServiceRef.current.generateWithAllModels(
        [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
        (model, chunk) => {
          const currentContent = responses.get(model) || '';
          responses.set(model, currentContent + chunk);
          
          // Update UI with streaming responses
          setMessages(prev => {
            const newMessages = [...prev];
            const existingAssistantMsgIndex = newMessages.findIndex(
              m => m.role === 'assistant' && m.model === model
            );

            if (existingAssistantMsgIndex !== -1) {
              newMessages[existingAssistantMsgIndex].content = responses.get(model)!;
            } else {
              newMessages.push({
                id: `${model}-${Date.now()}`,
                role: 'assistant',
                model,
                content: responses.get(model)!
              });
            }

            return newMessages;
          });
        }
      );
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const speakText = (text: string) => {
    if ('responsiveVoice' in window) {
      (window as any).responsiveVoice.speak(text, 'UK English Female', {
        rate: 0.9,
        pitch: 1,
        volume: 1
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="models-selector">
        <h3>Galaxian Models</h3>
        <div className="model-toggles">
          {Object.entries(aiServiceRef.current.models.free).map(([id, name]) => (
            <label key={id} className="model-toggle">
              <input
                type="checkbox"
                checked={selectedModels.includes(id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedModels(prev => [...prev, id]);
                  } else {
                    setSelectedModels(prev => prev.filter(m => m !== id));
                  }
                }}
              />
              {id} (Free)
            </label>
          ))}
          {Object.entries(aiServiceRef.current.models.premium).map(([id, name]) => (
            <label key={id} className="model-toggle premium">
              <input
                type="checkbox"
                checked={selectedModels.includes(id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedModels(prev => [...prev, id]);
                  } else {
                    setSelectedModels(prev => prev.filter(m => m !== id));
                  }
                }}
              />
              {id} ⭐
            </label>
          ))}
        </div>
      </div>

      <Messages messages={messages} onSpeak={speakText} />

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your web app or use voice input..."
            rows={3}
            disabled={isGenerating}
          />
          
          <div className="voice-controls">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`voice-btn ${isListening ? 'listening' : ''}`}
            >
              {isListening ? '🛑' : '🎤'}
            </button>
          </div>
        </div>

        <SendButton 
          disabled={!input.trim() || isGenerating}
          isLoading={isGenerating}
        />
      </form>

      <script src="https://code.responsivevoice.org/responsivevoice.js?key=WkAsgle4"></script>
    </div>
  );
}
