import React from 'react';
import { AppState, Constraints } from '../types';
import { Info, Code, FileText, Settings, Sliders } from 'lucide-react';

interface InputFormProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const InputForm: React.FC<InputFormProps> = ({ state, updateState }) => {
  const isDomain = state.mode === 'domain';

  const updateConstraints = (key: keyof Constraints, value: any) => {
    updateState({
      constraints: { ...state.constraints, [key]: value }
    });
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-12">
      
      {/* 1. Context */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
          <Info className="w-5 h-5 text-gray-500" />
          Context & Focus
        </h2>
        
        <div className="grid gap-4">
          {isDomain && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Domain / Subsystem Name
              </label>
              <input
                type="text"
                value={state.domainFocus}
                onChange={(e) => updateState({ domainFocus: e.target.value })}
                placeholder="e.g. Auth Layer, Payment Gateway, Job Scheduler"
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              High-Level Description
            </label>
            <textarea
              value={state.description}
              onChange={(e) => updateState({ description: e.target.value })}
              placeholder="Briefly describe what this project or component does..."
              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-brand-500 focus:border-brand-500 text-sm h-24"
            />
          </div>
        </div>
      </section>

      {/* 2. Source Material */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
          <Code className="w-5 h-5 text-gray-500" />
          Source Material
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Files, Snippets & Tree
            </label>
            <div className="relative">
              <textarea
                value={state.files}
                onChange={(e) => updateState({ files: e.target.value })}
                placeholder="Paste directory tree, important class files, or types here..."
                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-brand-500 focus:border-brand-500 text-sm font-mono h-48 text-xs leading-relaxed"
              />
              <div className="absolute top-2 right-2 text-xs text-gray-400 bg-white px-1">Markdown allowed</div>
            </div>
            <p className="mt-1 text-xs text-gray-500">The more relevant code you paste, the less the model hallucinates.</p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
             <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-500 mt-0.5" />
                <div className="flex-1">
                   <label className="block text-sm font-medium text-blue-900 mb-1">Existing Documentation (Optional)</label>
                   <textarea 
                     value={state.oldDocs}
                     onChange={(e) => updateState({ oldDocs: e.target.value })}
                     placeholder="Paste old or outdated docs here to help align style..."
                     className="w-full bg-white border border-blue-200 rounded text-sm px-3 py-2 h-20 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
                   />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Settings */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-200 pb-2">
          <Sliders className="w-5 h-5 text-gray-500" />
          Constraints & Settings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Target Audience</label>
              <select 
                value={state.constraints.audience}
                onChange={(e) => updateConstraints('audience', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:border-brand-500 focus:ring-brand-500"
              >
                <option value="mixed">Mixed / General</option>
                <option value="junior">Junior Developers (More explanation)</option>
                <option value="senior">Senior Developers (Concise)</option>
                <option value="ops">DevOps / SRE</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Tone</label>
              <select 
                value={state.constraints.tone}
                onChange={(e) => updateConstraints('tone', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:border-brand-500 focus:ring-brand-500"
              >
                <option value="neutral">Neutral & Professional</option>
                <option value="opinionated">Opinionated / Guide-like</option>
                <option value="strict">Strict & Formal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Depth</label>
              <select 
                value={state.constraints.length}
                onChange={(e) => updateConstraints('length', e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:border-brand-500 focus:ring-brand-500"
              >
                <option value="medium">Medium (Standard)</option>
                <option value="short">Short (TL;DR)</option>
                <option value="deep">Deep Dive</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 bg-gray-50 p-4 rounded-md border border-gray-200">
             <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={state.constraints.includeCommands}
                  onChange={(e) => updateConstraints('includeCommands', e.target.checked)}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700">Include CLI/Make commands</span>
             </label>

             <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={state.constraints.includeEnvDetails}
                  onChange={(e) => updateConstraints('includeEnvDetails', e.target.checked)}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700">Include detailed Env Config</span>
             </label>
          </div>

        </div>
      </section>
    </div>
  );
};

export default InputForm;