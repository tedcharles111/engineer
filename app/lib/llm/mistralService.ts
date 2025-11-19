import { Mistral } from '@mistralai/mistralai';

const MISTRAL_API_KEY = "8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu";
const HUGGINGFACE_API_KEY = "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";

export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
  };
}

export class MultiverseAIService {
  private mistral: Mistral;
  private models = {
    free: {
      'nebula-mistral': 'mistral-large-latest',
      'quantum-kimi': 'kimi-k2-thinking'
    },
    premium: {
      'stellar-coder': 'qwen3-coder-30B-A3B-Instruct',
      'cosmos-vision': 'Qwen-VL-235B-A22B-Instruct', 
      'pulsar-deepseek': 'Deepseek-coder-v2-Instruct-0724',
      'nova-r1': 'Deepseek-R1-0528-Qwen3-8B'
    }
  };

  constructor() {
    this.mistral = new Mistral({ apiKey: MISTRAL_API_KEY });
  }

  async generateStream(messages: LLMMessage[], modelId: string, onChunk: (chunk: string) => void) {
    const modelMap = { ...this.models.free, ...this.models.premium };
    const modelName = modelMap[modelId];

    if (!modelName) {
      throw new Error(`Model ${modelId} not found`);
    }

    if (modelId === 'nebula-mistral') {
      return this.generateMistralStream(messages, modelName, onChunk);
    } else {
      return this.generateHuggingFaceStream(messages, modelName, onChunk);
    }
  }

  private async generateMistralStream(messages: LLMMessage[], model: string, onChunk: (chunk: string) => void) {
    const stream = await this.mistral.chat.stream({
      model,
      messages: messages as any,
      maxTokens: 8000,
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      if (chunk.data?.choices[0]?.delta?.content) {
        onChunk(chunk.data.choices[0].delta.content);
      }
    }
  }

  private async generateHuggingFaceStream(messages: LLMMessage[], model: string, onChunk: (chunk: string) => void) {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: messages.map(m => m.content).join("\n"),
          parameters: {
            max_new_tokens: 8000,
            temperature: 0.7,
            return_full_text: false
          },
          options: {
            stream: true
          }
        }),
      }
    );

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.token?.text) {
              onChunk(data.token.text);
            }
          } catch (e) {
            // Continue processing other lines
          }
        }
      }
    }
  }

  async generateWithAllModels(messages: LLMMessage[], onProgress: (model: string, chunk: string) => void) {
    const allModels = Object.keys({ ...this.models.free, ...this.models.premium });
    const promises = allModels.map(modelId => 
      this.generateStream(messages, modelId, (chunk) => {
        onProgress(modelId, chunk);
      })
    );

    await Promise.allSettled(promises);
  }
}
