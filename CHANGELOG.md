# Changelog

> **Quick Summary:** Complete version history following semantic versioning. Track all features, changes, fixes, and improvements from v1.0.0 onwards. Includes release process and planned future features.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-06

### Added
- 🧪 **Settings Tests**: 7 new tests for settings system (64 total passing)
- 🎵 **Audio System**: Sound effects using Web Audio API (no dependencies)
  - Countdown tick sounds (3, 2, 1)
  - GO! announcement sound
  - Card flip sound effect
  - Victory melody (ascending 3-note sequence)
  - Defeat sound (descending 2 notes)
  - Draw tone (neutral beep)
- ⚙️ **Comprehensive Settings Panel**: Unified settings modal with persistence
  - Dark mode toggle
  - High contrast mode toggle
  - Difficulty selector (Easy/Normal/Hard)
  - Sound effects enable/disable
  - Volume slider (0-100%)
  - Reduce motion toggle
  - All settings persist to localStorage
  - Keyboard accessible modal
- 🎨 **Settings UI**: Professional modal with iOS-style toggles
  - Organized sections (Appearance, Gameplay, Audio, Accessibility)
  - Custom toggle switches
  - Range slider for volume
  - Backdrop blur overlay
  - Theme-aware styling

### Changed
- Settings now centralized with useSettings hook
- Theme and difficulty managed through global settings
- All accessibility preferences saved and restored
- Header simplified to settings button only (all controls in settings panel)
- Removed unused components from header (ThemeToggle, DifficultySelect)

### Technical
- Code coverage tracking enabled (11.3% baseline)
- Enhanced error handling in settings localStorage
- Data attributes for accessibility modes (data-reduced-motion, data-high-contrast)

## [1.1.1] - 2025-10-06

### Fixed
- **Score spoiler prevention**: Score now updates after card flip completes (4s delay), not immediately on click
- **Power-click exploit**: Cards disabled during animation sequence (4.5s lock)
- **Game over timing**: Added 4.5s delay before showing results screen on last card
- **Enhanced deck import validation**: Comprehensive error checking with aggregated error messages
  - Validates file format, card types, and counts
  - Checks for non-numeric, negative, or corrupted data
  - Prevents deck size violations (checks total before adding)
  - Shows up to 5 errors at once with clear descriptions
  - Better user feedback for import failures
- **Lighthouse Scores**: Improved to 100/100 Performance, 100/100 Accessibility, 100/100 SEO

### Changed
- Improved error messages for deck import (more descriptive)

## [1.1.0] - 2025-10-06

### Added
- 🧠 **AI Difficulty Modes**: Three difficulty levels with smart gameplay
  - **Easy**: AI deliberately plays worst-EV card (learning mode)
  - **Normal**: AI plays randomly (classic experience)
  - **Hard**: AI uses card counting and probability to make optimal plays
- 🌓 **Dark Mode**: Complete dark theme with CSS variables and localStorage persistence
  - Theme toggle button in app header
  - Smooth transitions between themes
  - Remembers preference across sessions
  - Updates browser theme-color meta tag
- 🎴 **Card Flip Animation with Countdown**: Dramatic card reveal sequence
  - Cards appear face-down when selected
  - Countdown animation: 3... 2... 1... GO!
  - 1 second pause after "GO!" to build suspense
  - Cards flip over simultaneously with 3D rotation
  - Winner highlighted with green glow effect
  - GPU-accelerated CSS transforms for smooth 60fps animation
  - Reusable FlipCard component with keyboard accessibility
- 📚 **Deck Pile Display**: Visual draw deck indicators
  - Face-down card stacks for both player and AI
  - Layered 3-card stack effect for depth
  - Real-time card count updates
  - Shows "Empty" when deck depleted
- 📱 **Full Mobile Responsiveness**: Optimized for all screen sizes
  - iPhone SE (375px) support with scaled cards (160x220px)
  - Tablet support (768px) with medium cards (200x280px)
  - Desktop support with large cards (300x400px)
  - Vertical stacking on narrow screens
  - Touch-optimized button sizes
- 🎯 **AI Logic Package**: Added `ai.js` module to NPM package v1.1.0
  - `chooseCard()` - Select best card based on difficulty and card counting
  - `updateCounts()` - Track opponent play history
  - `initializeCounts()` - Initialize deck tracking
  - Bayesian probability model with Dirichlet smoothing
- 🧪 **Comprehensive Testing**: 57 automated tests
  - Component tests: App, StartScreen
  - Logic tests: Card (13), GameController (15), Deck (10), AI (10)
  - CI/CD pipeline with GitHub Actions
- 📘 **Professional Documentation Suite**:
  - CONTRIBUTING.md, CODE_OF_CONDUCT.md, TESTING.md
  - DEPLOYMENT.md, APPENDIX.md, STYLE_GUIDE.md
  - docs/NEW_FEATURES.md with usage guide

### Changed
- NPM package version bumped to 1.1.0 (minor feature release)
- GameController now uses AI difficulty system with card counting
- GameBoard reorganized layout (Score → AI Hand → Decks → Matchup → Player Hand)
- MatchupDisplay completely redesigned with flip animation
- App integrates theme and difficulty selectors in header
- Package exports now include `/ai` module
- All documentation updated with badges and quick links

### Fixed
- **Critical**: Removed `currentMatch < 5` limit causing hands to stop refilling after 5 rounds
- Card emoji overflow on flip cards (now properly contained and wrapped)
- Previous round results flashing before new countdown
- "GO!" appearing twice in countdown sequence
- Countdown timing improved (safe hot-swapping)
- Layout improvements for better visual hierarchy
- Mobile responsiveness for small screens
- Timeout cleanup to prevent memory leaks

### Technical Improvements
- Hot-swappable difficulty (safe to change mid-game)
- Pure functional AI (no side effects, deterministic)
- Card counting tracks remaining deck composition
- Play history influences Hard mode predictions
- Proper cleanup in useEffect hooks
- Flexbox-based emoji wrapping for multi-emoji cards
- CSS variables for consistent theming

## [1.0.1] - 2025-10-06

### Added
- 🧪 **Automated Testing**: Jest + React Testing Library with 47 passing tests
  - Component tests: App, StartScreen
  - Logic tests: Card (13), GameController (15), Deck (10)
  - Test coverage for core game logic
- 🚀 **CI/CD Pipeline**: GitHub Actions workflow
  - Automated testing on push and PR
  - Multi-version Node.js testing (18.x, 20.x)
  - Production build verification
  - ESLint checking
- 📘 **Professional Documentation Suite**:
  - CONTRIBUTING.md - Contribution guidelines
  - CODE_OF_CONDUCT.md - Community standards
  - TESTING.md - Testing strategy and procedures
  - DEPLOYMENT.md - Multi-platform deployment guide
  - APPENDIX.md - Academic context and project reflection
- 📦 **NPM Package Published**: `@theomegafett/rps-game-logic` v1.0.1
- 📛 **Badges**: Version, license, NPM, CI status, test count
- 📸 **Demo Screenshot**: Added visual demo to README
- 🔗 **Quick Links Navigation**: Easy access to all documentation

### Changed
- Updated NPM package documentation with correct `@theomegafett` references
- Improved README with badges, author attribution, and quick links
- Enhanced all .md files with summaries and professional formatting
- Reorganized CSS into `src/styles/` folder for better organization
- Updated project structure documentation

### Fixed
- Corrected package name references in package README from `@omega` to `@theomegafett`
- Fixed .gitignore merge conflicts
- Removed unnecessary Render configuration files

## [1.0.0] - 2025-10-05

### Added
- 🎉 **Initial Release**
- Complete Rock Paper Scissors card game with React UI
- Deck building system with rarity limits (10-20 cards)
- 11 unique card types (Common, Uncommon, Rare, Legendary)
- AI opponent with intelligent card generation
- Card effects: Draw, Block, Discard, Hybrid types
- Deck import/export functionality (.txt format)
- Instructions screen with full card reference
- NPM package `@theomegafett/rps-game-logic` published
- Comprehensive documentation (README, CONTRIBUTING, CODE_OF_CONDUCT, TESTING, DEPLOYMENT)
- Full JSDoc documentation across codebase
- PropTypes validation on all React components
- Accessibility features (keyboard navigation, ARIA labels, semantic HTML)
- Responsive design (mobile, tablet, desktop)
- Memory leak prevention (cleanup in useEffect)
- Performance optimizations (useMemo, useCallback, React.memo)
- AI acknowledgment and ethical transparency

### Package Features (@theomegafett/rps-game-logic)
- Pure JavaScript ES6 modules
- No external dependencies
- Card, Deck, Player, GameController classes
- Standalone `getWinner()` utility function
- Complete API documentation
- Reusable in any JavaScript environment

### Documentation
- Professional README with badges
- Style guide (STYLE_GUIDE.md)
- Contributing guidelines (CONTRIBUTING.md)
- Code of Conduct (CODE_OF_CONDUCT.md)
- Testing guide (TESTING.md)
- Deployment guide (DEPLOYMENT.md)
- Full AI disclosure statement

### Technical Highlights
- React 18.x with Hooks
- ES6+ JavaScript
- CSS3 with gradients and animations
- Modular architecture
- Code reusability patterns
- Modern development practices

---

## Version History

### Unreleased

_Future improvements and features will be listed here._

**Planned Features:**
- [ ] Automated testing with Jest + React Testing Library
- [ ] Multiplayer support (WebSockets or Firebase)
- [ ] User accounts and deck saving
- [ ] Leaderboard system
- [ ] Additional card types and mechanics
- [ ] Animation improvements
- [ ] Sound effects and music
- [ ] PWA features (offline play, install prompt)
- [ ] Tournament mode
- [ ] Deck statistics and analytics

---

## Development Notes

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Commit changes: `git commit -m "chore: release vX.Y.Z"`
4. Create git tag: `git tag vX.Y.Z`
5. Push to GitHub: `git push && git push --tags`
6. Publish NPM package (if updated): `cd packages/rps-game-logic && npm publish`
7. Create GitHub Release with changelog

---

## Contributors

- **TheOmegaFett** - Initial development and architecture
- **Amp (by Sourcegraph)** - AI coding assistance (see AI disclosure in README)

Special thanks to all future contributors who help improve this project!

---

## Links

- **NPM Package**: [@theomegafett/rps-game-logic](https://www.npmjs.com/package/@theomegafett/rps-game-logic)
- **Repository**: [github.com/TheOmegaFett/RPS-Card-Game](https://github.com/TheOmegaFett/RPS-Card-Game)
- **Issues**: [github.com/TheOmegaFett/RPS-Card-Game/issues](https://github.com/TheOmegaFett/RPS-Card-Game/issues)
- **Live Demo**: [your-deployment-url]

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes
