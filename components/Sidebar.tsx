import React from 'react';
import { ChevronRight, BarChart3, Database, ShieldCheck, Activity, Layers } from 'lucide-react';

interface SidebarProps {
  onPromptSelect?: (text: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onPromptSelect }) => {
  return (
    <div className="p-6 space-y-8 pb-24">
      {/* About Section */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <span className="text-blue-600 dark:text-blue-400 font-semibold">AlchemyX</span> is your intelligent interface to the company's data lake. It ingests raw metrics and transforms them into verified, actionable strategic insights.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
           <Badge icon={<Database size={12} />} text="Data Lake" />
           <Badge icon={<Activity size={12} />} text="Real-time" />
           <Badge icon={<ShieldCheck size={12} />} text="Verified" />
        </div>
      </div>

      {/* Example Prompts */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Example Queries</h2>
        <div className="space-y-2">
          <PromptButton 
            text="Generate a profitability report for Q3" 
            onClick={() => onPromptSelect?.("Generate a profitability report for Q3")} 
          />
          <PromptButton 
            text="Compare current inventory vs sales forecast" 
            onClick={() => onPromptSelect?.("Compare current inventory vs sales forecast")}
          />
          <PromptButton 
            text="Identify supply chain bottlenecks in EU" 
            onClick={() => onPromptSelect?.("Identify supply chain bottlenecks in EU")}
          />
          <PromptButton 
            text="Summarize customer sentiment for product Alpha" 
            onClick={() => onPromptSelect?.("Summarize customer sentiment for product Alpha")}
          />
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">How It Works</h2>
        <ul className="relative space-y-0 pl-2">
          {/* Connecting line */}
          <div className="absolute top-2 left-[11px] bottom-2 w-px bg-gray-200 dark:bg-gray-800 z-0"></div>
          
          <Step number="01" title="Ingest" desc="Connects to internal API gateways." />
          <Step number="02" title="Process" desc="Transforms raw data into structured logic." />
          <Step number="03" title="Verify" desc="Cross-references compliance rules." />
          <Step number="04" title="Insight" desc="Delivers strategic recommendations." />
        </ul>
      </div>
      
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-400">
           <Layers size={14} />
           <span>Watsonx Orchestrate v2.0</span>
        </div>
      </div>
    </div>
  );
};

const Badge: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
    {icon}
    {text}
  </span>
);

interface PromptButtonProps {
  text: string;
  onClick: () => void;
}

const PromptButton: React.FC<PromptButtonProps> = ({ text, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full text-left p-3 rounded-lg bg-white dark:bg-[#1a1a1a] hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 group flex items-center justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:bg-blue-100 dark:active:bg-blue-900/40"
  >
    <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">{text}</span>
    <ChevronRight className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-4px] group-hover:translate-x-0" />
  </button>
);

const Step: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
  <li className="relative flex gap-4 pb-6 last:pb-0 z-10">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white dark:bg-[#161616] border-2 border-blue-500 flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
    </div>
    <div className="-mt-1">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight mt-0.5">{desc}</p>
    </div>
  </li>
);

export default Sidebar;