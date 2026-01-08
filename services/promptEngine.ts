import { AppState } from '../types';
import { DOMAIN_SECTIONS, README_SECTIONS } from '../constants';

const PRINCIPLES_PACK = `
1. **Chain of Thought (CoT)**: Enforce linear logic flow (Discovery -> Plan -> Execute -> Verify).
2. **Fact Grounding**: Use ONLY the provided code as the source of truth.
3. **Verification**: Include a specific step to check for hallucinations or missing info.
4. **North Star**: "Truth > Speed. Do not invent details."
`;

export const generatePrompt = (state: AppState): string => {
  const isDomain = state.mode === 'domain';
  const availableSections = isDomain ? DOMAIN_SECTIONS : README_SECTIONS;
  const activeSections = availableSections.filter(s => state.enabledSections.includes(s.id));
  
  const sectionList = activeSections.map(s => `- ${s.label}`).join('\n');
  
  const audienceInstruction = `Target Audience: ${state.constraints.audience} developers. Tone: ${state.constraints.tone}. Detail Level: ${state.constraints.length}.`;
  
  const taskDescription = isDomain 
    ? `Create deep technical documentation for the "${state.domainFocus || 'specified subsystem'}" component.`
    : `Create a comprehensive README.md for the repository.`;

  return `
# SYSTEM ROLE
You are a Principal Technical Writer and Senior Software Architect. 
Your goal is to produce state-of-the-art documentation that is accurate, clear, and adheres to strict verification protocols.

# PRINCIPLES & SAFEGUARDS (STRICT)
${PRINCIPLES_PACK}
**CRITICAL**: If you encounter functionality that is not present in the Input Data, you must mark it as \`[UNKNOWN]\` or \`TODO\`. Do NOT halluncinate file paths, variable names, or config keys.

# TASK OBJECTIVE
${taskDescription}
${audienceInstruction}

# STRATEGY (Chain of Thought)
Follow this process strictly. Do not output the documentation until Step 3.

**Step 1: Discovery & Analysis**
- Scan the <input_files> and <description>.
- Identify key components, data flow, and architectural patterns.
- Note any external dependencies or environment requirements.

**Step 2: Planning**
- Structure the documentation outline based on the requested sections below.
- Identify where "Warnings" or "Pitfalls" are needed based on code complexity.

**Step 3: Execution**
- Write the documentation in Markdown format.
- ${state.constraints.includeCommands ? 'Include executable CLI commands in code blocks.' : ''}
- ${state.constraints.includeEnvDetails ? 'Explicitly document environment variables and configuration.' : ''}

**Step 4: Verification (Self-Correction)**
- Check against the <input_files>: Did I invent any function names?
- Are all requested sections present?

# OUTPUT STRUCTURE (Requested Sections)
The final output must contain the following sections (use H2 headers):
${sectionList}

# INPUT DATA

<description>
${state.description || '(No description provided)'}
</description>

<old_docs>
${state.oldDocs || '(No existing docs provided)'}
</old_docs>

<input_files>
${state.files || '(No files provided)'}
</input_files>
`.trim();
};