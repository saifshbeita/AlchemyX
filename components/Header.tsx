import React from 'react';
import { Bot, Menu, Sparkles, Database } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Database className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white leading-none">
              AlchemyX
            </h1>
            <span className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
              Your internal AI that transforms raw company data into verified insights.
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider">Secure Connection</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <Sparkles className="w-4 h-4 text-blue-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;