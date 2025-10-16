import { chatWithGemini } from './providers/gemini';
import type { Job } from '../types';

/**
 * Defines a generic interface for an AI chat provider.
 * This allows for different AI models (like Gemini, OpenAI, etc.) to be used interchangeably.
 */
export interface AiChatProvider {
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
 * The application will use this function to interact with the AI,
 * abstracting away the specific implementation details.
 * 
 * @param provider The desired AI provider (defaults to Gemini).
 * @returns An object conforming to the AiChatProvider interface.
 */
export function getAiChatService(provider: AiProviderType = AiProviderType.GEMINI): AiChatProvider {
  if (!providers[provider]) {
    throw new Error(`AI provider ${provider} not found.`);
  }
  return providers[provider];
}
