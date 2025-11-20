import { Mistral } from '@mistralai/mistralai';
import { HfInference } from '@huggingface/inference';

const MISTRAL_API_KEY = "8sco68RTiZlzi3DbcmOMM8uYKiJwbOvu";
const HUGGINGFACE_API_KEY = "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";

export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class MultiverseAIService {
  private mistral: Mistral;
  private hf: HfInference;
  
  public models = {
    free: {
      'nebula-mistral': 'mistral-large-latest',
      'quantum-kimi': 'mistralai/Mistral-7B-Instruct-v0.2'
    },
    premium: {
      'stellar-coder': 'Qwen/Qwen2.5-Coder-32B-Instruct',
      'cosmos-vision': 'Qwen/Qwen2-VL-72B-Instruct',
      'pulsar-deepseek': 'deepseek-ai/DeepSeek-Coder-V2-Instruct',
      'nova-r1': 'deepseek-ai/DeepSeek-R1'
    }
  };

  constructor() {
    this.mistral = new Mistral({ apiKey: MISTRAL_API_KEY });
    this.hf = new HfInference(HUGGINGFACE_API_KEY);
  }

  async generateStream(messages: LLMMessage[], modelId: string, onChunk: (chunk: string) => void) {
    const modelMap = { ...this.models.free, ...this.models.premium };
    const modelName = modelMap[modelId];

    if (!modelName) {
      throw new Error(`Model ${modelId} not found`);
    }

    try {
      if (modelId === 'nebula-mistral') {
        await this.generateMistralStream(messages, modelName, onChunk);
      } else {
        await this.generateHuggingFaceStream(messages, modelName, onChunk);
      }
    } catch (error) {
      console.error(`Error with model ${modelId}:`, error);
      onChunk(`\n\nError: Failed to generate response from ${modelId}. Please try again.`);
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
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n');
    
    const response = await this.hf.textGenerationStream({
      model,
      inputs: prompt,
      parameters: {
        max_new_tokens: 8000,
        temperature: 0.7,
        return_full_text: false
      }
    });

    for await (const chunk of response) {
      if (chunk.token.text) {
        onChunk(chunk.token.text);
      }
    }
  }

  async generateWithAllModels(messages: LLMMessage[], onProgress: (model: string, chunk: string) => void) {
    const allModels = Object.keys({ ...this.models.free, ...this.models.premium });
    
    const promises = allModels.map(modelId => 
      this.generateStream(messages, modelId, (chunk) => {
        onProgress(modelId, chunk);
      }).catch(error => {
        console.error(`Model ${modelId} failed:`, error);
        onProgress(modelId, `\nError: ${error.message}`);
      })
    );

    await Promise.allSettled(promises);
  }

  async generateMarketingAd(projectDescription: string): Promise<string> {
    const prompt = `Create a compelling marketing advertisement for this web application: ${projectDescription}. 
    Make it engaging, include benefits, and make it suitable for social media platforms.`;
    
    let adContent = '';
    await this.generateMistralStream(
      [{ role: 'user', content: prompt }],
      'mistral-large-latest',
      (chunk) => { adContent += chunk; }
    );
    
    return adContent;
  }
}
