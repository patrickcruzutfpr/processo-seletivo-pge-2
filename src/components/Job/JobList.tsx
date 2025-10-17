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

export default JobList;