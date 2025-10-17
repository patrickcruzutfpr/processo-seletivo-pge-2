import React from 'react';

interface ChatbotFabProps {
  onClick: () => void;
}

const ChatbotFab: React.FC<ChatbotFabProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900 transition-transform transform hover:scale-110"
      aria-label="Abrir chat de ajuda"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.03-3.268A8.965 8.965 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 12.912a7.025 7.025 0 0011.12-2.136A5.006 5.006 0 0010 6a5 5 0 00-5 5c0 .352.04.693.118 1.022l-1.54 1.54a1 1 0 00.142 1.592l.02.012a1 1 0 001.09-1.258l1.002-3.006z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default ChatbotFab;