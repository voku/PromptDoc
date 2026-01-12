# PromptDoc Builder

A powerful web-based tool for generating high-quality documentation prompts for AI assistants. PromptDoc helps you create structured, comprehensive prompts for generating domain documentation, README files, and API documentation.

## Features

- **Two Documentation Modes:**
  - Domain/API Documentation: Generate deep technical documentation for specific components
  - README/Repository Documentation: Create comprehensive README files for projects

- **Configurable Sections:** Toggle between multiple documentation sections including:
  - Architecture Overview
  - Design Goals & Constraints
  - Type Safety & Validation
  - Core Components
  - Usage Patterns
  - Security Considerations
  - And more...

- **Customizable Constraints:**
  - Target audience (junior, senior, ops, mixed)
  - Tone (neutral, opinionated, strict)
  - Detail level (short, medium, deep)
  - CLI commands inclusion
  - Environment details

- **Real-time Preview:** See your generated prompt in real-time as you configure options

## Live Demo

🌐 [Try PromptDoc Builder](https://voku.github.io/PromptDoc/)

## Run Locally

**Prerequisites:** Node.js 18+ and npm

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voku/PromptDoc.git
   cd PromptDoc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## How It Works

PromptDoc generates structured prompts that follow best practices for AI-assisted documentation:

1. **Chain of Thought (CoT):** Enforces linear logic flow (Discovery → Plan → Execute → Verify)
2. **Fact Grounding:** Uses ONLY provided code as the source of truth
3. **Verification:** Includes steps to check for hallucinations or missing information
4. **Truth > Speed:** Prioritizes accuracy over completion speed

## Prompt Techniques

This project is based on advanced prompt engineering techniques. Learn more about different prompt techniques at:

🔗 [PromptMastery - Advanced Prompt Techniques](https://voku.github.io/PromptMastery/)

## Key Files Detector Helper Prompt

Use this prompt with an AI assistant to automatically detect the most important files in your codebase before generating documentation:

```
# TASK
Analyze this codebase and identify the 10-15 most critical files that would be essential for understanding the architecture and creating comprehensive documentation.

# CRITERIA
Prioritize files that:
1. Define core domain models, types, or interfaces
2. Contain main application entry points or routing logic
3. Implement critical business logic or algorithms
4. Define API contracts or service interfaces
5. Configure infrastructure or build processes
6. Contain architectural documentation (if exists)

# OUTPUT FORMAT
For each file, provide:
- File path
- Brief description (1 sentence)
- Importance level (Critical/High/Medium)

# ANALYSIS STEPS
1. Scan the project structure
2. Identify the primary programming language(s)
3. Locate entry points (main files, index files)
4. Find configuration files (package.json, etc.)
5. Identify core domain/business logic files
6. Locate type definitions or interfaces
7. Find service/API definitions
8. Rank by architectural importance

After identifying the files, output them in a format ready to be pasted into PromptDoc Builder.
```

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

🔗 [Contribute to PromptDoc](https://github.com/voku/PromptDoc)

## License

This project is open source and available under the MIT License.

## Project Structure

```
PromptDoc/
├── components/         # React components
│   ├── Sidebar.tsx    # Navigation and mode selection
│   ├── InputForm.tsx  # Form inputs and configuration
│   └── PromptPreview.tsx # Generated prompt display
├── services/          # Business logic
│   └── promptEngine.ts # Prompt generation engine
├── constants.ts       # Section definitions
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main application component
└── index.html        # HTML entry point
```

## Acknowledgments

This project incorporates proven prompt engineering patterns from [PromptMastery](https://voku.github.io/PromptMastery/).
