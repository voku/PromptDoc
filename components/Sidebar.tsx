import React from 'react';
import { BookOpen, FileText, Layers, Layout, CheckSquare, Square, Github, Sparkles } from 'lucide-react';
import { AppState, DocMode } from '../types';
import { DOMAIN_SECTIONS, README_SECTIONS } from '../constants';

interface SidebarProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ state, updateState }) => {
  const isDomain = state.mode === 'domain';
  const sections = isDomain ? DOMAIN_SECTIONS : README_SECTIONS;

  const toggleSection = (id: string) => {
    const current = state.enabledSections;
    const next = current.includes(id)
      ? current.filter(s => s !== id)
      : [...current, id];
    updateState({ enabledSections: next });
  };

  const toggleAll = () => {
    if (state.enabledSections.length === sections.length) {
      updateState({ enabledSections: [] });
    } else {
      updateState({ enabledSections: sections.map(s => s.id) });
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-10">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 text-brand-700 font-bold text-lg">
          <BookOpen className="w-6 h-6" />
          <span>PromptDoc</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Documentation Prompt Builder</p>
      </div>

      <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
        {/* Mode Selection */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Mode</h3>
          <div className="space-y-2">
            <button
              onClick={() => updateState({ mode: 'domain', enabledSections: DOMAIN_SECTIONS.filter(s => s.defaultEnabled).map(s => s.id) })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                state.mode === 'domain' 
                  ? 'bg-brand-50 text-brand-700 font-medium ring-1 ring-brand-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Domain / API Docs
            </button>
            <button
              onClick={() => updateState({ mode: 'readme', enabledSections: README_SECTIONS.filter(s => s.defaultEnabled).map(s => s.id) })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                state.mode === 'readme' 
                  ? 'bg-brand-50 text-brand-700 font-medium ring-1 ring-brand-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              README / Repo
            </button>
          </div>
        </div>

        {/* Sections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sections</h3>
            <button onClick={toggleAll} className="text-xs text-brand-600 hover:underline">
              Toggle All
            </button>
          </div>
          
          <div className="space-y-1">
            {sections.map(section => {
              const isEnabled = state.enabledSections.includes(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-sm group ${
                    isEnabled ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  <div className={`transition-colors ${isEnabled ? 'text-brand-600' : 'text-gray-300 group-hover:text-gray-400'}`}>
                    {isEnabled ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  </div>
                  <span className="truncate">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs">
          <a 
            href="https://github.com/voku/PromptDoc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-brand-600 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Contribute</span>
          </a>
          <span className="text-gray-300">|</span>
          <a 
            href="https://voku.github.io/PromptMastery/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-600 hover:text-brand-600 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Techniques</span>
          </a>
        </div>
        <div className="text-xs text-gray-500 text-center">
          v1.0.0 &middot; Prompt Engine Ready
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;