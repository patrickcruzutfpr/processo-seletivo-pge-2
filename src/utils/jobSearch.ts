import { jobs } from '../data/jobs';
import type { Job } from '../types';

/**
 * Creates a single, lowercased searchable text block from a job object.
 * This text block concatenates various fields of the job to allow for a simple
 * keyword search across all relevant job information.
 * @param {Job} job The job object to process.
 * @returns {string} A single string containing all searchable text for the job.
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
 * Finds the most relevant jobs from the dataset based on a user query.
 * It works by tokenizing the query and scoring each job based on how many
 * query words are present in the job's searchable text.
 * @param {string} query The user's search query.
 * @param {number} [maxResults=3] The maximum number of relevant jobs to return.
 * @returns {Job[]} An array of the most relevant job objects, sorted by score.
 */
export function findRelevantJobs(query: string, maxResults: number = 3): Job[] {
  // Split the query into significant words.
  const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 2);
  
  // Score each job based on the number of matching words.
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

  // Sort jobs by score in descending order.
  scoredJobs.sort((a, b) => b.score - a.score);

  // Return the top N jobs that have a score greater than 0.
  return scoredJobs
    .filter(item => item.score > 0)
    .slice(0, maxResults)
    .map(item => item.job);
}