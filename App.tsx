import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import PromptPreview from './components/PromptPreview';
import { AppState, INITIAL_STATE } from './types';
import { DOMAIN_SECTIONS } from './constants';
import { generatePrompt } from './services/promptEngine';

const App: React.FC = () => {
  // Initialize state with default enabled sections for domain mode
  const [appState, setAppState] = useState<AppState>({
    ...INITIAL_STATE,
    enabledSections: DOMAIN_SECTIONS.filter(s => s.defaultEnabled).map(s => s.id)
  });

  const [activeTab, setActiveTab] = useState<'input' | 'preview'>('input');
  
  // Real-time Prompt Generation
  const generatedPrompt = useMemo(() => generatePrompt(appState), [appState]);

  const updateState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar state={appState} updateState={updateState} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header / Tab Bar (Mobile/Desktop Hybrid) */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
             <h1 className="text-xl font-bold text-gray-800 tracking-tight">
               {appState.mode === 'domain' ? 'Domain Documentation' : 'README Builder'}
             </h1>
             <p className="text-sm text-gray-500">Configure your context to generate the perfect prompt.</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-lg">
             <button 
                onClick={() => setActiveTab('input')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'input' 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
             >
                Inputs
             </button>
             <button 
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'preview' 
                  ? 'bg-white text-brand-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
             >
                Preview Prompt
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Split View on Large Screens */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar p-6 lg:block ${activeTab === 'input' ? 'block' : 'hidden'}`}>
             <InputForm state={appState} updateState={updateState} />
          </div>

          <div className={`flex-1 p-6 bg-gray-100 border-l border-gray-200 lg:block ${activeTab === 'preview' ? 'block' : 'hidden'}`}>
             <PromptPreview promptText={generatedPrompt} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;