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

export type DocumentView = 'processo-seletivo' | 'anexo-1-salario' | null;

export type SortKey = 'cargoFuncao' | 'remuneracao';
export type SortOrder = 'asc' | 'desc';
export interface SortConfig {
  key: SortKey;
  order: SortOrder;
}

export type LevelFilter = 'all' | 'CCESP' | 'FCESP';


const App: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(jobs[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && savedTheme !== 'system') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [viewingDocument, setViewingDocument] = useState<DocumentView>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'remuneracao', order: 'desc' });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleCloseDocument = () => {
    setViewingDocument(null);
  };
  
  const handleViewDocument = (doc: 'processo-seletivo' | 'anexo-1-salario') => {
    setViewingDocument(doc);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleLevelFilterChange = (level: LevelFilter) => {
    setLevelFilter(level);
  };

  const handleSortChange = (key: SortKey) => {
    setSortConfig(currentConfig => {
      if (currentConfig.key === key) {
        return { ...currentConfig, order: currentConfig.order === 'asc' ? 'desc' : 'asc' };
      }
      // Default sort order when switching columns
      return { key, order: key === 'remuneracao' ? 'desc' : 'asc' };
    });
  };

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
      </footer>
      
      {renderDocument()}
      
      {!isChatOpen && <ChatbotFab onClick={() => setIsChatOpen(true)} />}
      {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default App;