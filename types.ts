export type DocMode = 'domain' | 'readme';

export interface DocSection {
  id: string;
  label: string;
  description?: string;
  defaultEnabled: boolean;
}

export interface Constraints {
  audience: 'junior' | 'senior' | 'ops' | 'mixed';
  tone: 'neutral' | 'opinionated' | 'strict';
  length: 'short' | 'medium' | 'deep';
  includeCommands: boolean;
  includeEnvDetails: boolean;
}

export interface AppState {
  mode: DocMode;
  domainFocus: string; // Only for domain mode
  projectType: string;
  
  // Inputs
  description: string;
  files: string;
  oldDocs: string;
  
  // Config
  constraints: Constraints;
  enabledSections: string[]; // IDs of enabled sections
}

export const INITIAL_STATE: AppState = {
  mode: 'domain',
  domainFocus: '',
  projectType: '',
  description: '',
  files: '',
  oldDocs: '',
  constraints: {
    audience: 'mixed',
    tone: 'neutral',
    length: 'medium',
    includeCommands: true,
    includeEnvDetails: true,
  },
  enabledSections: [], // Populated on init based on defaults
};