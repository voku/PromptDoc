import { DocSection } from './types';

export const DOMAIN_SECTIONS: DocSection[] = [
  { id: 'overview', label: 'Architecture Overview', defaultEnabled: true },
  { id: 'goals', label: 'Design Goals & Constraints', defaultEnabled: true },
  { id: 'diagram', label: 'Layer Model / Diagram', defaultEnabled: true },
  { id: 'types', label: 'Type Safety & Validation', defaultEnabled: true },
  { id: 'components', label: 'Core Components', defaultEnabled: true },
  { id: 'usage', label: 'Usage Patterns / Recipes', defaultEnabled: true },
  { id: 'migration', label: 'Migration Path', defaultEnabled: false },
  { id: 'pitfalls', label: 'Critical Pitfalls', defaultEnabled: true },
  { id: 'advanced', label: 'Advanced Helpers', defaultEnabled: false },
  { id: 'reference', label: 'Quick Reference (API)', defaultEnabled: true },
  { id: 'security', label: 'Security Considerations', defaultEnabled: true },
];

export const README_SECTIONS: DocSection[] = [
  { id: 'intro', label: 'Intro & Context', defaultEnabled: true },
  { id: 'structure', label: 'Project Structure', defaultEnabled: true },
  { id: 'quickstart', label: 'Quick Start / Install', defaultEnabled: true },
  { id: 'env', label: 'Environment Configuration', defaultEnabled: true },
  { id: 'deploy', label: 'Release & Rollback', defaultEnabled: true },
  { id: 'runtime', label: 'Runtime Model (Jobs/Web)', defaultEnabled: false },
  { id: 'testing', label: 'Testing Strategy', defaultEnabled: true },
  { id: 'i18n', label: 'Internationalization', defaultEnabled: false },
  { id: 'security', label: 'Security Practices', defaultEnabled: true },
  { id: 'data', label: 'Data Access Pattern', defaultEnabled: false },
  { id: 'logging', label: 'Logging & Debugging', defaultEnabled: true },
  { id: 'architecture_links', label: 'Links to Arch Docs', defaultEnabled: true },
];