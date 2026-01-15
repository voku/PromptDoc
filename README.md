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

## Dotfiles Configuration & CLI Helpers

### Architecture Overview

The dotfiles component provides configuration management and CLI helper utilities for development environments. It follows a modular architecture where configuration files are organized by purpose and environment, allowing for easy customization and portability across different systems.

**Key architectural elements:**
- Configuration files stored in version control (Git)
- Symlink-based installation to home directory
- Modular structure with separate concerns (shell, editor, tools)
- Environment-specific overrides via local configuration files

### Design Goals & Constraints

**Primary Goals:**
1. **Portability**: Dotfiles should work across different Unix-like systems (Linux, macOS, WSL)
2. **Maintainability**: Clear organization and documentation for easy updates
3. **Security**: Sensitive data (tokens, credentials) excluded from version control
4. **Flexibility**: Support for machine-specific overrides without modifying core files

**Constraints:**
- Must not commit secrets or sensitive credentials
- Should minimize dependencies on external tools
- Must preserve existing user configurations during installation
- Should be idempotent (safe to run installation multiple times)

### Layer Model / Diagram

```
┌─────────────────────────────────────────┐
│         User Home Directory             │
│  ~/.bashrc, ~/.gitconfig, ~/.vimrc      │
│  (symlinks to dotfiles repo)            │
└─────────────┬───────────────────────────┘
              │ symlinks
              ▼
┌─────────────────────────────────────────┐
│      Dotfiles Repository                │
├─────────────────────────────────────────┤
│  Shell Layer                            │
│  - .bashrc, .zshrc, .bash_profile       │
│  - shell functions and aliases          │
├─────────────────────────────────────────┤
│  Editor Layer                           │
│  - .vimrc, .editorconfig                │
│  - editor-specific configurations       │
├─────────────────────────────────────────┤
│  Tool Configuration Layer               │
│  - .gitconfig, .gitignore_global        │
│  - tool-specific settings               │
├─────────────────────────────────────────┤
│  Local Overrides (gitignored)           │
│  - .local, .env.local                   │
│  - machine-specific settings            │
└─────────────────────────────────────────┘
```

### Type Safety & Validation

While dotfiles are primarily configuration files, validation ensures consistency:

**Configuration Validation:**
- Shell scripts use `set -e` for error handling
- Configuration files validated on installation
- Syntax checking for shell scripts before deployment
- Environment variable validation before use

**Version Compatibility:**
- Document minimum shell versions required
- Feature detection for optional functionality
- Graceful degradation for missing tools

### Core Components

**1. Shell Configuration**
- **Purpose**: Configure shell environment, aliases, and functions
- **Files**: `.bashrc`, `.bash_profile`, `.zshrc`
- **Key Features**: Custom prompt, useful aliases, path management

**2. Git Configuration**
- **Purpose**: Version control settings and aliases
- **Files**: `.gitconfig`, `.gitignore_global`
- **Key Features**: User identity, commit templates, global ignores

**3. Editor Configuration**
- **Purpose**: Text editor settings and preferences
- **Files**: `.vimrc`, `.editorconfig`
- **Key Features**: Syntax highlighting, indentation rules, plugins

**4. Installation Scripts**
- **Purpose**: Automate dotfiles setup and updates
- **Files**: `install.sh`, `bootstrap.sh`
- **Key Features**: Backup existing configs, create symlinks, install dependencies

**5. Local Configuration (Not Committed)**
- **Purpose**: Machine-specific settings and secrets
- **Files**: `.bashrc.local`, `.gitconfig.local`
- **Key Features**: API tokens, machine-specific paths, personal preferences

### Usage Patterns / Recipes

**Initial Installation:**
```bash
# Clone the dotfiles repository
git clone https://github.com/username/dotfiles.git ~/.dotfiles
cd ~/.dotfiles

# Run the installation script
./install.sh

# Source the new configuration
source ~/.bashrc  # or restart your terminal
```

**Daily Usage:**
```bash
# Edit a configuration file
vim ~/.dotfiles/.bashrc

# Update dotfiles from remote
cd ~/.dotfiles
git pull origin main

# Apply changes without restarting terminal
source ~/.bashrc
```

**Adding New Configuration:**
```bash
# Add a new dotfile
cd ~/.dotfiles
touch .newconfig

# Create symlink manually
ln -sf ~/.dotfiles/.newconfig ~/.newconfig

# Or add to install.sh for automatic symlinking
```

**Machine-Specific Overrides:**
```bash
# Create a local configuration file (not committed)
touch ~/.dotfiles/.bashrc.local
echo "export LOCAL_VAR=value" >> ~/.dotfiles/.bashrc.local

# The main .bashrc should source .bashrc.local if it exists
# Add to .bashrc:
# [ -f ~/.bashrc.local ] && source ~/.bashrc.local
```

### Critical Pitfalls

**1. Overwriting Existing Configurations**
- **Problem**: Installation may overwrite user's existing dotfiles
- **Solution**: Always backup existing files before creating symlinks
- **Best Practice**: Use `install.sh` with backup functionality

**2. Committing Secrets**
- **Problem**: Accidentally committing API tokens, passwords, or credentials
- **Solution**: Use `.gitignore` to exclude `.local` files and `.env` files
- **Best Practice**: Use environment variables or local files for secrets

**3. Symlink Conflicts**
- **Problem**: Existing symlinks may point to wrong locations
- **Solution**: Check for existing symlinks before creating new ones
- **Best Practice**: Remove old symlinks during installation

**4. Shell-Specific Syntax**
- **Problem**: Bash and Zsh have different syntax requirements
- **Solution**: Use compatible syntax or separate files per shell
- **Best Practice**: Test configurations on target shells

**5. Path Dependencies**
- **Problem**: Hard-coded paths may not work across machines
- **Solution**: Use relative paths or environment variables
- **Best Practice**: Detect paths dynamically when possible

### Quick Reference (API)

**Installation Commands:**
```bash
# Full installation (with backups)
./install.sh

# Dry run (show what would be done)
./install.sh --dry-run

# Force installation (overwrite without backup)
./install.sh --force
```

**Common Shell Aliases (Example):**
```bash
# Navigation
alias ..="cd .."
alias ...="cd ../.."
alias ~="cd ~"

# List files
alias ll="ls -lah"
alias la="ls -A"

# Git shortcuts
alias gs="git status"
alias gp="git push"
alias gl="git log --oneline --graph"

# Safety nets
alias rm="rm -i"
alias cp="cp -i"
alias mv="mv -i"
```

**Environment Variables:**
```bash
# Editor preference
export EDITOR="vim"
export VISUAL="vim"

# Path extensions
export PATH="$HOME/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"

# Custom variables
export DOTFILES="$HOME/.dotfiles"
```

### Security Considerations

**1. Secret Management**
- Never commit sensitive credentials to version control
- Use `.local` files for machine-specific secrets
- Add `.local` pattern to `.gitignore`
- Consider using encrypted secret managers (e.g., `pass`, `1password-cli`)

**2. File Permissions**
- Ensure dotfiles have appropriate permissions (typically 644 for files, 755 for scripts)
- Protect sensitive files like SSH config with 600 permissions
- Never make credential files world-readable

**3. Public Repository Considerations**
- Assume dotfiles repository may become public
- Review all files before committing
- Use separate private repository for truly sensitive configurations
- Sanitize example configurations before sharing

**4. Installation Safety**
- Validate script sources before execution
- Review installation scripts for malicious commands
- Backup existing configurations before running install scripts
- Use version control to track dotfile changes

**5. Shell Command Injection**
- Avoid eval with user input in shell functions
- Quote variables properly to prevent word splitting
- Validate inputs in custom shell functions
- Be cautious with aliases that execute commands

**6. Git Configuration Security**
```bash
# Prevent accidental commits of large files
git config --global core.bigFileThreshold 10m

# Sign commits for authenticity
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_KEY_ID

# Use credential helper to avoid storing passwords
git config --global credential.helper cache
```

## Acknowledgments

This project incorporates proven prompt engineering patterns from [PromptMastery](https://voku.github.io/PromptMastery/).
