import React, { useState, useRef, useEffect } from 'react';
import { getAiChatService } from '../../services/aiService';
import { findRelevantJobs } from '../../utils/jobSearch';
import Spinner from './Spinner';

interface ChatbotProps {
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Olá! Como posso ajudar a encontrar informações sobre as vagas da PGE-SP?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      // 1. Find relevant context from available jobs
      const relevantJobs = findRelevantJobs(userMessage);

      // 2. Get the configured AI service
      const aiService = getAiChatService(); 

      // 3. Call the service with the user's query and the found context
      const botResponse = await aiService.chat(userMessage, relevantJobs);
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error("Error in chat interaction:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Desculpe, ocorreu um erro. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-24 sm:right-6 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col z-40 transition-transform transform animate-slide-in">
       <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
      <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-900 rounded-t-lg">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Assistente de Vagas PGE-SP</h3>
        <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700" aria-label="Fechar chat">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </header>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-xl max-w-xs md:max-w-md whitespace-pre-wrap ${
                  msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end justify-start">
               <div className="px-4 py-3 rounded-xl bg-gray-200 dark:bg-slate-700 rounded-bl-none">
                 <Spinner />
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Pergunte sobre as vagas..."
            className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-transparent dark:text-gray-200"
            aria-label="Digite sua mensagem"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !inputValue} className="absolute inset-y-0 right-0 flex items-center justify-center bg-primary text-white rounded-full w-10 h-10 my-1.5 mx-1.5 disabled:bg-gray-400 dark:disabled:bg-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;