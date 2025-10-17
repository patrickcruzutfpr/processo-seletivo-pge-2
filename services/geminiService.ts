import { GoogleGenAI } from "@google/genai";
import { jobs } from '../data/jobs';
import type { Job } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Creates a searchable text block from a job object.
 */
function createSearchableText(job: Job): string {
  return [
    job.cargoFuncao,
    job.denominacaoCompleta,
    job.publicoAlvo,
    job.setorAtuacao,
    job.principaisAtribuicoes.join(' '),
    job.escopo,
    job.formacaoExperiencia.join(' '),
    job.competencias.join(' '),
    job.requisitosDesejaveis.join(' ')
  ].join(' ').toLowerCase();
}

/**
 * Finds the most relevant jobs based on a user query.
 */
function findRelevantJobs(query: string, maxResults: number = 3): Job[] {
  const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  const scoredJobs = jobs.map(job => {
    const searchableText = createSearchableText(job);
    let score = 0;
    queryWords.forEach(word => {
      if (searchableText.includes(word)) {
        score++;
      }
    });
    return { job, score };
  });

  scoredJobs.sort((a, b) => b.score - a.score);

  return scoredJobs
    .filter(item => item.score > 0)
    .slice(0, maxResults)
    .map(item => item.job);
}


export async function chatWithDocs(query: string): Promise<string> {
  const model = 'gemini-2.5-flash';

  const relevantJobs = findRelevantJobs(query);

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