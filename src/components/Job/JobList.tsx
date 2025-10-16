import React from 'react';
import type { Job } from '../../types';
import { SortConfig, SortKey, LevelFilter } from '../../App';
import { formatCurrency } from '../../utils/currency';

interface JobListProps {
  jobs: Job[];
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sortConfig: SortConfig;
  onSortChange: (key: SortKey) => void;
  levelFilter: LevelFilter;
  onLevelFilterChange: (level: LevelFilter) => void;
}

const SortButton: React.FC<{
  sortKey: SortKey;
  label: string;
  sortConfig: SortConfig;
  onSortChange: (key: SortKey) => void;
}> = ({ sortKey, label, sortConfig, onSortChange }) => {
  const isActive = sortConfig.key === sortKey;
  const buttonClasses = `px-3 py-1 text-sm rounded-md transition-colors duration-200 flex items-center ${
    isActive
      ? 'bg-primary text-white font-semibold shadow'
      : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
  }`;

  return (
    <button onClick={() => onSortChange(sortKey)} className={buttonClasses}>
      {label}
      {isActive && (
        <span className="ml-2">
          {sortConfig.order === 'asc' ? '▲' : '▼'}
        </span>
      )}
    </button>
  );
};


const JobList: React.FC<JobListProps> = ({ jobs, selectedJob, onSelectJob, searchTerm, onSearchChange, sortConfig, onSortChange, levelFilter, onLevelFilterChange }) => {

  const filterOptions: { key: LevelFilter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'CCESP', label: 'CCESP' },
    { key: 'FCESP', label: 'FCESP' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md sticky top-24 transition-colors duration-300">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Vagas Disponíveis ({jobs.length})</h2>
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Filtrar por cargo..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent dark:text-gray-200"
            aria-label="Filtrar vagas"
          />
           <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </span>
        </div>

        <div className="mt-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filtrar por Nível:</span>
          <div className="flex space-x-2 mt-2">
            {filterOptions.map(option => {
              const isActive = levelFilter === option.key;
              const buttonClasses = `px-3 py-1 text-sm rounded-md transition-colors duration-200 flex-grow ${
                isActive
                  ? 'bg-primary text-white font-semibold shadow'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`;
              return (
                <button
                  key={option.key}
                  onClick={() => onLevelFilterChange(option.key)}
                  className={buttonClasses}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Ordenar por:</span>
          <div className="flex space-x-2">
            <SortButton sortKey="cargoFuncao" label="Nome" sortConfig={sortConfig} onSortChange={onSortChange} />
            <SortButton sortKey="remuneracao" label="Salário" sortConfig={sortConfig} onSortChange={onSortChange} />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-20rem)]">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-details dark:hover:bg-slate-700 focus:outline-none transition-colors duration-200 ${
                selectedJob?.id === job.id ? 'bg-details dark:bg-slate-700 border-l-4 border-primary' : ''
              }`}
            >
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{job.nivel}</p>
              <h3 className={`font-semibold mt-1 ${selectedJob?.id === job.id ? 'text-primary dark:text-red-400' : 'text-gray-800 dark:text-gray-200'}`}>
                {job.denominacaoCompleta}
              </h3>
              <p className="text-sm font-bold text-secondary mt-1">{formatCurrency(job.remuneracao)}</p>
            </button>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500 dark:text-gray-400">Nenhuma vaga encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;