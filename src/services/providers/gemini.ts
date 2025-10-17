import { GoogleGenAI } from "@google/genai";
import type { Job } from '../../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Sends a chat query to the Gemini model with relevant job context.
 * @param query The user's question.
 * @param relevantJobs An array of job objects to be used as context.
 * @returns The text response from the Gemini model.
 */
export async function chatWithGemini(query: string, relevantJobs: Job[]): Promise<string> {
  const model = 'gemini-2.5-flash';

  if (relevantJobs.length === 0) {
    return "Desculpe, não encontrei nenhuma informação relevante sobre sua pergunta nas descrições de vagas disponíveis. Você poderia tentar perguntar sobre os requisitos ou atribuições de algum cargo?";
  }

  const context = relevantJobs.map(job => {
    // Create a concise summary for the context
    return `
      Vaga: ${job.denominacaoCompleta} (ID: ${job.id})
      Remuneração: ${job.remuneracao}
      Atribuições Principais: ${job.principaisAtribuicoes.join(', ')}
      Requisitos: ${job.formacaoExperiencia.join(', ')}
      Competências: ${job.competencias.join(', ')}
    `;
  }).join('\n---\n');

  const prompt = `
    Você é um assistente prestativo do Quadro de Vagas da PGE-SP.
    Sua tarefa é responder às perguntas dos usuários com base *exclusivamente* no contexto fornecido abaixo, que contém informações sobre vagas de emprego.
    Não utilize nenhum conhecimento externo. Se a resposta não estiver no contexto, diga "Não encontrei essa informação nos detalhes das vagas disponíveis.".
    Seja conciso e direto.

    **Contexto:**
    ---
    ${context}
    ---

    **Pergunta do Usuário:** ${query}

    **Resposta:**
  `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.";
  }
}