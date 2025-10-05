# Contributing to Rock Paper Scissors Card Game

> **Quick Summary:** Learn how to set up the development environment, follow code style guidelines, and submit pull requests. This guide covers everything from forking the repo to publishing NPM package updates.

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/RPS-Card-Game.git
   cd RPS-Card-Game
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
card-game-react/
├── packages/
│   └── rps-game-logic/    # NPM package - Core game logic
├── src/
│   ├── components/        # React components
│   ├── controllers/       # Game controllers (uses package)
│   ├── constants/         # UI constants (emojis, limits)
│   └── styles/           # CSS files
├── public/               # Static assets
└── docs/                 # Documentation and screenshots
```

## 🎨 Code Style

### Follow the Style Guide
All code must adhere to the standards in [STYLE_GUIDE.md](STYLE_GUIDE.md):

- Use functional components with React Hooks
- Add PropTypes to all components
- Include JSDoc comments for functions
- Use camelCase for variables, PascalCase for components
- Follow the component structure template

### ESLint
Code is linted automatically. Fix any warnings before committing:
```bash
npm run build  # Will show lint warnings
```

### CSS Conventions
- Use kebab-case for class names (e.g., `card-button`)
- Keep styles in `src/styles/` folder
- No inline styles

## 🧪 Testing

The project uses both automated and manual testing. When contributing:

1. **Run Automated Tests**
   ```bash
   npm test
   ```
   All tests must pass before submitting PR.

2. **Add Tests for New Features**
   - Write unit tests for new logic
   - Write component tests for new UI
   - See [TESTING.md](TESTING.md) for examples

3. **Manual Testing**
   - Test in Chrome, Firefox, and Safari
   - Check mobile responsiveness
   - Verify keyboard navigation works
   - Ensure no console errors

**Current Test Coverage**: 47 tests passing across components and game logic.

## 🔄 Git Workflow

### Branch Naming
- Feature: `feat/feature-name`
- Bug fix: `fix/bug-description`
- Documentation: `docs/doc-description`
- Refactor: `refactor/description`

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new card type for special abilities
fix: resolve deck import parsing issue
docs: update README with deployment steps
style: format code according to style guide
refactor: extract game logic into separate module
perf: optimize deck shuffling algorithm
test: add tests for card comparison logic
chore: update dependencies
```

### Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Follow the style guide
   - Test thoroughly

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

### Pull Request Checklist

- [ ] Code follows the style guide
- [ ] All files have proper documentation (JSDoc, comments)
- [ ] **All tests pass (`npm test`)**
- [ ] **New features have tests**
- [ ] No console errors or warnings
- [ ] Tested in multiple browsers
- [ ] Responsive design works on mobile
- [ ] Keyboard navigation works
- [ ] No accessibility regressions
- [ ] Build succeeds (`npm run build`)
- [ ] **CI/CD pipeline passes (GitHub Actions)**
- [ ] Commit messages follow conventions

## 🐛 Reporting Bugs

### Before Submitting
- Check existing issues to avoid duplicates
- Test in the latest version
- Gather reproduction steps

### Bug Report Template
```markdown
**Describe the Bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 1.0.0]
```

## 💡 Suggesting Features

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature.

**Problem It Solves**
What problem does this address?

**Proposed Solution**
How would you implement this?

**Alternatives Considered**
Other approaches you've thought about.
```

## 📦 Contributing to the NPM Package

The core game logic is published as [@theomegafett/rps-game-logic](https://www.npmjs.com/package/@theomegafett/rps-game-logic).

### Package Development

1. **Navigate to Package**
   ```bash
   cd packages/rps-game-logic
   ```

2. **Make Changes**
   - Update code in `src/`
   - Update version in `package.json`
   - Update `README.md` if API changes

3. **Test Locally**
   ```bash
   # In main project
   npm install
   npm start
   ```

4. **Publish** (Maintainers Only)
   ```bash
   cd packages/rps-game-logic
   npm publish
   ```

## 🎓 Academic Integrity

This project uses AI assistance (Amp by Sourcegraph) for development. Contributors should:

- Understand all code they contribute
- Review and validate AI-generated suggestions
- Take responsibility for submitted code
- Disclose use of AI tools in PR descriptions

See our [AI Disclosure](README.md#ai--tooling-disclosure) for more details.

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security**: Email directly (see SECURITY.md if exists)

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- CHANGELOG.md (for significant contributions)
- README.md (for major features)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making this project better! 🎉
