import React, { useState, useEffect, useMemo } from 'react';
import JobList from './components/Job/JobList';
import JobDetails from './components/Job/JobDetails';
import Header from './components/common/Header';
import { jobs } from './data/jobs';
import type { Job } from './types';
import ProcessoSeletivoPdf from './components/documents/ProcessoSeletivoPdf';
import Anexo1SalarioPdf from './components/documents/Anexo1SalarioPdf';
import Chatbot from './components/Chatbot/Chatbot';
import ChatbotFab from './components/Chatbot/ChatbotFab';

/**
 * Defines the possible document views.
 * 'processo-seletivo': The main selective process document.
 * 'anexo-1-salario': The salary annex document.
 * null: No document is being viewed.
 */
export type DocumentView = 'processo-seletivo' | 'anexo-1-salario' | null;

/**
 * The keys that can be used for sorting the job list.
 */
export type SortKey = 'cargoFuncao' | 'remuneracao';

/**
 * The order for sorting (ascending or descending).
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Configuration for sorting the job list.
 */
export interface SortConfig {
  /** The key to sort by. */
  key: SortKey;
  /** The order to sort in. */
  order: SortOrder;
}

/**
 * Defines the filter options for job levels.
 * 'all': Show all levels.
 * 'CCESP': Show only 'Cargo de Carreira do Estado de São Paulo'.
 * 'FCESP': Show only 'Função de Confiança do Estado de São Paulo'.
 */
export type LevelFilter = 'all' | 'CCESP' | 'FCESP';


/**
 * The main App component. It orchestrates the entire application,
 * managing state for job searching, sorting, filtering, and displaying details.
 */
const App: React.FC = () => {
  /** State for the currently selected job in the details view. */
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);
  /** State for the current search term entered by the user. */
  const [searchTerm, setSearchTerm] = useState('');
  /** State for the selected job level filter. */
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  /** State for the application's color theme ('light' or 'dark'). */
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'system') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  /** State to control which document is currently being viewed in the PDF viewer. */
  const [viewingDocument, setViewingDocument] = useState<DocumentView>(null);
  /** State for the current sorting configuration of the job list. */
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'remuneracao', order: 'desc' });
  /** State to control the visibility of the chatbot. */
  const [isChatOpen, setIsChatOpen] = useState(false);

  /** Closes the currently viewed document. */
  const handleCloseDocument = () => {
    setViewingDocument(null);
  };
  
  /**
   * Sets the document to be viewed.
   * @param doc The identifier of the document to view.
   */
  const handleViewDocument = (doc: 'processo-seletivo' | 'anexo-1-salario') => {
    setViewingDocument(doc);
  };

  // Effect to apply the theme class to the root element and save it to localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  /**
   * Sets the selected job to be displayed in the details view.
   * @param job The job to select.
   */
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  /**
   * Updates the search term state based on user input.
   * @param event The input change event.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Updates the job level filter state.
   * @param level The selected level to filter by.
   */
  const handleLevelFilterChange = (level: LevelFilter) => {
    setLevelFilter(level);
  };

  /**
   * Updates the sorting configuration for the job list.
   * Toggles order if the same key is selected, otherwise sets a default order.
   * @param key The sort key to apply.
   */
  const handleSortChange = (key: SortKey) => {
    setSortConfig(currentConfig => {
      if (currentConfig.key === key) {
        return { ...currentConfig, order: currentConfig.order === 'asc' ? 'desc' : 'asc' };
      }
      // Default sort order when switching columns
      return { key, order: key === 'remuneracao' ? 'desc' : 'asc' };
    });
  };

  /**
   * A memoized list of jobs that are filtered and sorted based on the current state.
   */
  const sortedJobs = useMemo(() => {
    const filteredJobs = jobs.filter(job => {
      const searchTermMatch =
        job.cargoFuncao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.denominacaoCompleta.toLowerCase().includes(searchTerm.toLowerCase());
      
      const levelFilterMatch =
        levelFilter === 'all' || job.nivel.startsWith(levelFilter);

      return searchTermMatch && levelFilterMatch;
    });

    const sortableJobs = [...filteredJobs];
    sortableJobs.sort((a, b) => {
      if (sortConfig.key === 'remuneracao') {
        return sortConfig.order === 'asc' ? a.remuneracao - b.remuneracao : b.remuneracao - a.remuneracao;
      } else { // 'cargoFuncao'
        return sortConfig.order === 'asc' ? a.cargoFuncao.localeCompare(b.cargoFuncao) : b.cargoFuncao.localeCompare(a.cargoFuncao);
      }
    });
    return sortableJobs;
  }, [jobs, searchTerm, sortConfig, levelFilter]);
  
  
  /**
   * Renders the appropriate PDF document viewer based on the `viewingDocument` state.
   * @returns A React component for the PDF viewer or null.
   */
  const renderDocument = () => {
    switch(viewingDocument) {
      case 'processo-seletivo':
        return <ProcessoSeletivoPdf onClose={handleCloseDocument} />;
      case 'anexo-1-salario':
        return <Anexo1SalarioPdf onClose={handleCloseDocument} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-details dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme} onViewDocument={handleViewDocument} />
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <JobList 
              jobs={sortedJobs} 
              selectedJob={selectedJob} 
              onSelectJob={handleSelectJob}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
              levelFilter={levelFilter}
              onLevelFilterChange={handleLevelFilterChange}
            />
          </div>
          <div className="w-full md:w-2/3 lg:w-3/4">
            <JobDetails job={selectedJob} />
          </div>
        </div>
      </main>

      <footer className="text-center py-4 mt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 Procuradoria Geral do Estado de São Paulo. All rights reserved.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Developed by <a href="https://github.com/patrickmcruz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@patrickmcruz</a>
          </p>
      </footer>
      
      {renderDocument()}
      
      {!isChatOpen && <ChatbotFab onClick={() => setIsChatOpen(true)} />}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;