import React, { useState } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AgentView from './components/AgentView';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string>('');
  const [promptTrigger, setPromptTrigger] = useState(0); 

  // Core UI state manipulation triggers
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handlePromptSelect = (text: string) => {
    setActivePrompt(text);
    setPromptTrigger((prev) => prev + 1);
    
    // Automatically dismiss navigation overlay on smaller viewports
    const isMobileViewport = window.innerWidth < 768;
    if (isMobileViewport) {
      setIsSidebarOpen(false);
    }
  };

  // Class definitions isolated for cleaner component architecture
  const sidebarDisplayClasses = isSidebarOpen ? 'translate-x-0' : '-translate-x-full';
  const sidebarBaseStyles = `
    fixed inset-y-0 left-0 z-30 w-80 bg-white/80 dark:bg-[#161616]/90 backdrop-blur-xl 
    border-r border-gray-200 dark:border-gray-800 transform transition-transform 
    duration-300 ease-in-out md:relative md:translate-x-0 pt-16 md:pt-0
  `;

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 dark:bg-[#0e0e0e] overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16 h-full relative z-10 overflow-hidden">
        
        {/* Sidebar - Mobile Drawer & Desktop Fixed */}
        <aside className={`${sidebarBaseStyles} ${sidebarDisplayClasses}`}>
          <div className="h-full overflow-y-auto scrollbar-hide relative">
             <div className="absolute top-4 right-4 md:hidden z-50">
                <button 
                  onClick={toggleSidebar} 
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <X size={24} />
                </button>
             </div>
             <Sidebar onPromptSelect={handlePromptSelect} />
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Agent Interaction Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden w-full">
          <div className="flex-1 flex flex-col h-full w-full">
            <AgentView initialPrompt={activePrompt} promptTrigger={promptTrigger} />
          </div>
        </main>

      </div>
    </div>
  );
};

export default App;
