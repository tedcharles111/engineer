export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class MultiverseAIService {
  private apiKey: string;
  private baseURL = 'https://api.mistral.ai/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_MISTRAL_API_KEY || '';
    
    if (!this.apiKey) {
      console.error('Mistral API key is missing. Please check your environment variables.');
    }
  }

  async generateStream(messages: LLMMessage[], onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) {
      onChunk('\n\n❌ Error: Mistral API key not configured. Please set VITE_MISTRAL_API_KEY in your environment variables.');
      return;
    }

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
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
              content: `You are an expert web developer. Generate complete, working HTML/CSS/JavaScript code. After generating the main application code, also create a promotional advertisement section that the user can add to their website. Always wrap code in markdown code blocks.`
            },
            ...messages
          ],
          stream: true,
          max_tokens: 4000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

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
      onChunk(`\n\n❌ API Error: ${error.message}. Please check your API key and network connection.`);
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
