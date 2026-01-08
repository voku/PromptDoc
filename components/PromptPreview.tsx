import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface PromptPreviewProps {
  promptText: string;
}

const PromptPreview: React.FC<PromptPreviewProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [promptText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700 font-medium text-sm">
          <Terminal className="w-4 h-4" />
          Generated Prompt
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
            copied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy to Clipboard
            </>
          )}
        </button>
      </div>
      <div className="flex-1 relative bg-white">
        <textarea
          readOnly
          value={promptText}
          className="absolute inset-0 w-full h-full p-4 font-mono text-xs leading-relaxed text-gray-600 resize-none focus:outline-none custom-scrollbar"
        />
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
        {promptText.length} characters &middot; Ready for Gemini / LLM
      </div>
    </div>
  );
};

export default PromptPreview;