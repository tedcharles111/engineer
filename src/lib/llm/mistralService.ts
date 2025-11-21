export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class MultiverseAIService {
  private apiKey: string;
  private baseURL = 'https://api.mistral.ai/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_MISTRAL_API_KEY || '';
  }

  private async makeRequestWithRetry(
    url: string, 
    options: RequestInit, 
    retries: number = 3,
    delay: number = 1000
  ): Promise<Response> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, options);
        
        if (response.status === 429) {
          // Rate limited - wait and retry
          const waitTime = delay * Math.pow(2, attempt - 1);
          console.log(`Rate limited. Waiting ${waitTime}ms before retry ${attempt}/${retries}`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        if (response.ok) {
          return response;
        }

        // For other errors, throw immediately
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
        console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('All retry attempts failed');
  }

  async generateStream(messages: LLMMessage[], onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) {
      onChunk('\n\n❌ Error: Mistral API key not configured. Please set VITE_MISTRAL_API_KEY in your environment variables.');
      return;
    }

    try {
      const response = await this.makeRequestWithRetry(
        `${this.baseURL}/chat/completions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'mistral-large-latest',
            messages: [
              {
                role: 'system',
                content: `You are an expert web developer. Generate complete, working HTML/CSS/JavaScript code based on user requests. 
                
IMPORTANT GUIDELINES:
1. Always return COMPLETE, SELF-CONTAINED HTML files with embedded CSS and JavaScript
2. Use modern, responsive design with flexbox/grid
3. Include beautiful gradients and professional styling
4. Make it mobile-friendly
5. Add interactive elements where appropriate
6. Use semantic HTML5 elements
7. Include proper error handling
8. Ensure the code works immediately when copied

Format your response with the complete HTML code in a markdown code block.`
              },
              ...messages
            ],
            stream: true,
            max_tokens: 4000,
            temperature: 0.7,
            top_p: 0.9
          })
        }
      );

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (trimmedLine === '') continue;
          if (trimmedLine === 'data: [DONE]') break;

          if (trimmedLine.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(trimmedLine.slice(6));
              const chunk = jsonData.choices[0]?.delta?.content;
              if (chunk) {
                onChunk(chunk);
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Mistral API error:', error);
      
      if (error.message.includes('rate limit')) {
        onChunk('\n\n⚠️ Rate limit exceeded. Please wait a moment and try again.');
      } else if (error.message.includes('API key')) {
        onChunk('\n\n❌ Invalid API key. Please check your Mistral API configuration.');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        onChunk('\n\n🌐 Network error. Please check your connection and try again.');
      } else {
        onChunk(`\n\n❌ Error: ${error.message}. Please try again.`);
      }
    }
  }

  async generateWithAllModels(messages: LLMMessage[], onProgress: (model: string, chunk: string) => void): Promise<void> {
    await this.generateStream(messages, (chunk) => {
      onProgress('mistral-large', chunk);
    });
  }

  async checkAPIHealth(): Promise<boolean> {
    if (!this.apiKey) return false;

    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
