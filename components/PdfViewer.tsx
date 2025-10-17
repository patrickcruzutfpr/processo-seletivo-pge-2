import React from 'react';

interface PdfViewerProps {
  file: string;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file, onClose }) => {
  const getTitleFromFile = (filePath: string) => {
    try {
        const fileName = filePath.split('/').pop() || 'document.pdf';
        return fileName
            .replace('.pdf', '')
            .replace(/[-_]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    } catch {
        return "Documento";
    }
  }

  return (
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
        <h2 className="text-xl font-bold">{getTitleFromFile(file)}</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-primary hover:bg-red-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-800 flex items-center"
          aria-label="Fechar visualizador de PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Fechar
        </button>
      </header>
      <main className="flex-grow w-full h-full">
        <embed
          src={file}
          type="application/pdf"
          className="w-full h-full border-0"
        />
      </main>
    </div>
  );
};

export default PdfViewer;
