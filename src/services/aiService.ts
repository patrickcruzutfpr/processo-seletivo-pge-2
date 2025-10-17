import { chatWithGemini } from './providers/gemini';
import type { Job } from '../types';

/**
 * Defines a generic interface for an AI chat provider.
 * This allows for different AI models (like Gemini, OpenAI, etc.) to be used interchangeably.
 */
export interface AiChatProvider {
  /**
   * Sends a query to the AI model along with relevant context.
   * @param query The user's question or message.
   * @param contextJobs An array of relevant job objects to provide context to the AI.
   * @returns A promise that resolves to the AI's string response.
   */
  chat(query: string, contextJobs: Job[]): Promise<string>;
}

/**
 * Enum to represent the available AI providers.
 * Makes it easy to add new providers in the future.
 */
export enum AiProviderType {
  GEMINI = 'gemini',
  // OPENAI = 'openai', // Example for future extension
}

// A map that holds the implementations for each AI provider.
const providers: Record<AiProviderType, AiChatProvider> = {
  [AiProviderType.GEMINI]: { chat: chatWithGemini },
};

/**
 * Factory function to get an instance of an AI chat service.
 * The application uses this function to interact with the AI,
 * abstracting away the specific implementation details.
 * 
 * @param {AiProviderType} [provider=AiProviderType.GEMINI] - The desired AI provider. Defaults to Gemini.
 * @returns {AiChatProvider} An object conforming to the AiChatProvider interface.
 * @throws {Error} If the specified provider is not found.
 */
export function getAiChatService(provider: AiProviderType = AiProviderType.GEMINI): AiChatProvider {
  if (!providers[provider]) {
    throw new Error(`AI provider '${provider}' not found.`);
  }
  return providers[provider];
}
