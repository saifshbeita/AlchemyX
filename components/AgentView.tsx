import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Check, Terminal, Send, Sparkles, Copy, ClipboardCheck } from 'lucide-react';

const AGENT_CONTAINER_ID = "wxo-agent-container";

interface AgentViewProps {
  initialPrompt?: string;
  promptTrigger?: number;
}

const AgentView: React.FC<AgentViewProps> = ({ initialPrompt, promptTrigger }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('loading');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isJustCopied, setIsJustCopied] = useState(false);

  // Handle Sidebar Prompt Selection
  useEffect(() => {
    if (initialPrompt) {
      setInputValue(initialPrompt);
      // Optional: Auto-copy when selected from sidebar for speed
      handleCopyLogic(initialPrompt);
    }
  }, [initialPrompt, promptTrigger]);

  const handleCopyLogic = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowCopiedToast(true);
        setIsJustCopied(true);
        setTimeout(() => setShowCopiedToast(false), 4000);
        setTimeout(() => setIsJustCopied(false), 2000);
      })
      .catch(err => console.error("Clipboard failed", err));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    handleCopyLogic(inputValue);
    // We keep the text in the input briefly or clear it. 
    // Clearing it simulates a "sent" message.
    setInputValue(''); 
  };

  // Initialize Agent
  useEffect(() => {
    // We map the rootElementID to our specific container, NOT the body 'root', 
    // to ensure the app UI (headers/sidebar) remains visible.
    window.wxOConfiguration = {
        orchestrationID: "20251121-1830-5615-7055-b1ff09c76737_20251121-1832-0969-5054-48a1d2194633",
        hostURL: "https://dl.watson-orchestrate.ibm.com",
        rootElementID: AGENT_CONTAINER_ID,
        chatOptions: {
            agentId: "eadc80f5-235f-424f-87c3-c41b80f4bf98", 
            agentEnvironmentId: "fabcfa78-0426-4da7-a93e-352a43ac8bf0",
        }
    };

    const initScript = setTimeout(function () {
        const scriptUrl = `${window.wxOConfiguration?.hostURL}/wxochat/wxoLoader.js?embed=true`;
        
        // Check if script exists to prevent duplicates in React Strict Mode
        if (document.querySelector(`script[src="${scriptUrl}"]`)) {
            if (window.wxoLoader) {
                try {
                  window.wxoLoader.init();
                  setStatus('ready');
                } catch (e) {
                  console.log("Agent already initialized");
                  setStatus('ready');
                }
            }
            return;
        }

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.addEventListener('load', function () {
            if (window.wxoLoader) {
                window.wxoLoader.init();
                setStatus('ready');
            }
        });
        script.addEventListener('error', () => setStatus('error'));
        document.head.appendChild(script);
    }, 0);

    return () => clearTimeout(initScript);
  }, []);

  return (
    <div className="flex flex-col h-full w-full relative bg-gray-100 dark:bg-[#0e0e0e]">
      
      {/* Agent Status Header */}
      <div className="h-12 bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
         <div className="flex items-center gap-3">
            <Terminal size={14} className="text-blue-500" />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-wide">LIVE SESSION</span>
         </div>
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'ready' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`}></div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">
              {status === 'loading' ? 'Connecting...' : 'Secure Link Active'}
            </span>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden w-full flex flex-col">
        
        {/* Loading Overlay */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/90 dark:bg-[#0e0e0e]/90 backdrop-blur-sm z-40 pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
              <Loader2 className="relative w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300 animate-pulse">
              Establishing secure connection to AlchemyX...
            </p>
          </div>
        )}

        {/* Error Overlay */}
        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#0e0e0e] z-40">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <p className="text-gray-900 dark:text-white font-medium">Connection Failed</p>
            <p className="text-sm text-gray-500 mt-1">Please check your internet connection.</p>
          </div>
        )}

        {/* Toast Notification - Top Center */}
        <div className={`absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-500 z-50 ${showCopiedToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
           <div className="bg-green-500 rounded-full p-1">
             <Check size={12} className="text-white" />
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-bold">Ready to Paste!</span>
             <span className="text-xs opacity-80">Message copied. Paste (Ctrl+V) into the chat.</span>
           </div>
        </div>

        {/* Watsonx Container */}
        <div 
          id={AGENT_CONTAINER_ID} 
          className="flex-1 w-full relative bg-transparent"
        />

        {/* Input Control Bar */}
        <div className="shrink-0 p-4 bg-white dark:bg-[#161616] border-t border-gray-200 dark:border-gray-800 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] dark:shadow-none">
          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
            <div className="relative flex items-center bg-gray-50 dark:bg-[#1e1e1e] rounded-xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all overflow-hidden group">
                <div className="pl-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Sparkles size={18} />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask AlchemyX to analyze data or generate reports..."
                  className="w-full bg-transparent border-none px-4 py-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:ring-0 focus:outline-none"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() && !isJustCopied}
                  className={`m-1.5 p-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg ${
                    isJustCopied 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/20' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                    {isJustCopied ? (
                        <>
                          <span className="text-xs font-semibold hidden sm:inline">Copied!</span>
                          <ClipboardCheck size={16} />
                        </>
                    ) : (
                        <>
                          <span className="text-xs font-semibold hidden sm:inline">Send</span>
                          <Send size={16} />
                        </>
                    )}
                </button>
            </div>
            <div className="flex justify-center mt-2 opacity-0 focus-within:opacity-100 transition-opacity duration-300">
               <p className="text-[10px] text-gray-400 flex items-center gap-1">
                 <Copy size={10} />
                 <span>Clicking send copies text for secure pasting</span>
               </p>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AgentView;