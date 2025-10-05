# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-01-05

### Changed
- Updated NPM package documentation with correct `@theomegafett` references
- Improved README with NPM badges and installation instructions

### Fixed
- Corrected package name references in package README from `@omega` to `@theomegafett`

## [1.0.0] - 2025-01-05

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
