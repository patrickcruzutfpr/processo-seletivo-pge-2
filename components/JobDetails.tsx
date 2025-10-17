import React from 'react';
import type { Job } from '../types';

interface JobDetailsProps {
  job: Job | null;
}

const DetailCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-6 transition-colors duration-300">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-700 pb-3 mb-4">{title}</h3>
    {children}
  </div>
);

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start text-sm mb-3">
        <span className="text-primary dark:text-red-400 mr-3 mt-1">{icon}</span>
        <div>
            <p className="font-semibold text-gray-600 dark:text-gray-400">{label}</p>
            <p className="text-gray-800 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);


const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  if (!job) {
    return (
      <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Selecione uma vaga da lista para ver os detalhes.</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };
  
  const iconMap = {
      id: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2z" clipRule="evenodd" /></svg>,
      remuneracao: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.162-.328zM11 12.849v-1.698c.22.07.412.164.567.267a2.5 2.5 0 001.162.328z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.876.662A1 1 0 006.21 6.22l1.026.489a2.5 2.5 0 011.162-.328V5a1 1 0 00-1 1H10a1 1 0 100-2h1zm-1 7a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.876.662A1 1 0 006.21 14.22l1.026.489a2.5 2.5 0 011.162-.328V13a1 1 0 00-1 1H10a1 1 0 100-2h1z" clipRule="evenodd" /></svg>,
      publicoAlvo: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
      localExercicio: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>,
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md mb-6 transition-colors duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{job.denominacaoCompleta}</h2>
            <div className="flex items-center flex-wrap gap-2 mt-3">
                <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary dark:text-red-300 text-sm font-semibold px-3 py-1 rounded-full">{job.cargoFuncao}</span>
                <span className="inline-block bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">{job.nivel}</span>
                <span className="inline-block bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">{job.tipo}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t dark:border-gray-700 pt-6">
              <InfoItem icon={iconMap.id} label="Código da Vaga" value={job.id} />
              <InfoItem icon={iconMap.remuneracao} label="Remuneração Mensal" value={formatCurrency(job.remuneracao)} />
              <InfoItem icon={iconMap.publicoAlvo} label="Público Alvo" value={job.publicoAlvo} />
              <InfoItem icon={iconMap.localExercicio} label="Local de Exercício" value={job.localExercicio} />
            </div>
        </div>

      <DetailCard title="Principais Atribuições">
        <ul className="space-y-3">
          {job.principaisAtribuicoes.map((attr, index) => (
            <li key={index} className="flex items-start">
              <span className="text-secondary mr-3 mt-1"><CheckIcon /></span>
              <p className="text-gray-700 dark:text-gray-300">{attr}</p>
            </li>
          ))}
        </ul>
      </DetailCard>

      <DetailCard title="Formação e Experiência">
        <ul className="space-y-3">
          {job.formacaoExperiencia.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="text-secondary mr-3 mt-1"><CheckIcon /></span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </li>
          ))}
        </ul>
      </DetailCard>

       <DetailCard title="Competências">
        <ul className="space-y-3">
          {job.competencias.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="text-secondary mr-3 mt-1"><CheckIcon /></span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </li>
          ))}
        </ul>
      </DetailCard>

      <DetailCard title="Requisitos Desejáveis">
        <ul className="space-y-3">
          {job.requisitosDesejaveis.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="text-secondary mr-3 mt-1"><CheckIcon /></span>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
            </li>
          ))}
        </ul>
      </DetailCard>
      
      {job.observacoes && (
          <DetailCard title="Observações">
              <p className="text-gray-700 dark:text-gray-300">{job.observacoes}</p>
          </DetailCard>
      )}

    </div>
  );
};

export default JobDetails;