import React from 'react';
import type { Job } from '../../types';
import { SortConfig, SortKey, LevelFilter } from '../../App';
import { formatCurrency } from '../../utils/currency';

/**
 * Props for the JobList component.
 */
interface JobListProps {
  /** The array of job objects to display. */
  jobs: Job[];
  /** The currently selected job object, or null if none is selected. */
  selectedJob: Job | null;
  /** Callback function invoked when a job is selected from the list. */
  onSelectJob: (job: Job) => void;
  /** The current search term used to filter jobs. */
  searchTerm: string;
  /** Callback function for handling changes to the search input. */
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** The current sort configuration (key and order). */
  sortConfig: SortConfig;
  /** Callback function for changing the sort configuration. */
  onSortChange: (key: SortKey) => void;
  /** The current filter for job level. */
  levelFilter: LevelFilter;
  /** Callback function for changing the job level filter. */
  onLevelFilterChange: (level: LevelFilter) => void;
}

/**
 * A reusable button component for sorting the job list.
 * It displays the current sort order and toggles it on click.
 */
const SortButton: React.FC<{
  /** The sort key this button controls ('cargoFuncao' or 'remuneracao'). */
  sortKey: SortKey;
  /** The text label for the button. */
  label: string;
  /** The current sort configuration. */
  sortConfig: SortConfig;
  /** Callback to change the sort key. */
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


/**
 * Renders a list of jobs with controls for searching, filtering, and sorting.
 * This component is the primary navigation for finding and selecting jobs.
 */
const JobList: React.FC<JobListProps> = ({ jobs, selectedJob, onSelectJob, searchTerm, onSearchChange, sortConfig, onSortChange, levelFilter, onLevelFilterChange }) => {

  const filterOptions: { key: LevelFilter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'CCESP', label: 'CCESP' },
    { key: 'FCESP', label: 'FCESP' },
  ];

  return (
    <aside className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md transition-colors duration-300">
      {/* Search */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Buscar vagas
        </label>
        <input
          id="search"
          type="text"
          placeholder="Digite cargo, função ou palavra-chave..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      {/* Filters */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filtrar por nível</p>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(opt => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onLevelFilterChange(opt.key)}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                levelFilter === opt.key
                  ? 'bg-primary text-white shadow'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ordenar por</p>
        <div className="flex gap-2">
          <SortButton sortKey="cargoFuncao" label="Título" sortConfig={sortConfig} onSortChange={onSortChange} />
          <SortButton sortKey="remuneracao" label="Remuneração" sortConfig={sortConfig} onSortChange={onSortChange} />
        </div>
      </div>

      {/* List */}
      <ul className="divide-y divide-gray-200 dark:divide-slate-700">
        {jobs.length === 0 && (
          <li className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">Nenhuma vaga encontrada.</li>
        )}
        {jobs.map(job => {
          const isSelected = selectedJob?.id === job.id;
          return (
            <li key={job.id}>
              <button
                type="button"
                onClick={() => onSelectJob(job)}
                className={`w-full text-left px-3 py-3 transition-colors duration-150 ${
                  isSelected
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{job.denominacaoCompleta}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className="inline-block bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{job.cargoFuncao}</span>
                  <span className="inline-block bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{job.nivel}</span>
                  <span className="inline-block bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{job.tipo}</span>
                  <span className="ml-auto font-medium">{formatCurrency(job.remuneracao)}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default JobList;