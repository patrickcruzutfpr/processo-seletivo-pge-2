import { jobs } from '../data/jobs';
import type { Job } from '../types';

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
export function findRelevantJobs(query: string, maxResults: number = 3): Job[] {
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