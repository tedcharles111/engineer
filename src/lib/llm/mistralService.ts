export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class MultiverseAIService {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
    if (!this.apiKey) {
      console.warn('Mistral API key not found. Please set VITE_MISTRAL_API_KEY in your environment variables.');
    }
  }

  async generateStream(messages: LLMMessage[], onChunk: (chunk: string) => void): Promise<void> {
    if (!this.apiKey) {
      onChunk('\n\n❌ Error: Mistral API key not configured. Please check your environment variables.');
      return;
    }

    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
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
              content: 'You are an expert web developer. Generate complete, working HTML/CSS/JavaScript code based on user requests. Always return clean, modern, and responsive code. Include all necessary HTML, CSS, and JavaScript in a single file. Make it visually appealing with gradients and modern design.'
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
    } catch (error) {
      console.error('Mistral API error:', error);
      onChunk(`\n\n❌ Error: ${error.message}. Please check your API key and try again.`);
    }
  }

  async generateWithAllModels(messages: LLMMessage[], onProgress: (model: string, chunk: string) => void): Promise<void> {
    // For now, we'll use just the main model
    await this.generateStream(messages, (chunk) => {
      onProgress('mistral-large', chunk);
    });
  }
}
