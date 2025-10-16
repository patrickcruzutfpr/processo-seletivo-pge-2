import React from 'react';

interface MockPdfLayoutProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const MockPdfLayout: React.FC<MockPdfLayoutProps> = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 bg-opacity-95 animate-fade-in">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
      <header className="flex justify-between items-center p-4 bg-slate-800 text-white shadow-lg flex-shrink-0">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800 flex items-center"
          aria-label="Fechar visualizador"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Fechar
        </button>
      </header>
      <main className="flex-grow w-full h-full overflow-y-auto p-4 sm:p-8">
        <div className="bg-white text-black p-8 sm:p-12 mx-auto max-w-4xl shadow-2xl rounded-sm my-8">
            {children}
        </div>
      </main>
    </div>
);

export default MockPdfLayout;