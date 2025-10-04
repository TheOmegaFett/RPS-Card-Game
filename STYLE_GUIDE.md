# Code Style Guide

## Code Style Guidelines

### General Principles
1. **Functional Components Only**: Use React hooks, no class components
2. **Immutability**: Never mutate state directly, always return new objects/arrays
3. **Memoization**: Use `useMemo`, `useCallback`, and `React.memo` to prevent unnecessary re-renders
4. **Accessibility First**: All interactive elements must have proper ARIA labels and keyboard support
5. **No Inline Styles**: Keep all styling in CSS files for maintainability

### Naming Conventions

#### Files & Components
- Components: PascalCase (e.g., `GameBoard.jsx`, `DeckBuilder.jsx`)
- Models: PascalCase (e.g., `Card.js`, `Deck.js`)
- Controllers: PascalCase (e.g., `GameController.js`)
- Constants: camelCase (e.g., `cardEmojis.js`)
- Use `.jsx` extension for files containing JSX

#### Variables & Functions
- Variables: camelCase (e.g., `playerDeck`, `cardCount`)
- Functions: camelCase (e.g., `handleCardClick`, `createDeck`)
- Event handlers: prefix with `handle` (e.g., `handleNewGame`)
- Boolean variables: prefix with `is`/`has`/`should` (e.g., `isValid`, `hasCards`)
- Constants: UPPER_SNAKE_CASE for true constants (e.g., `DECK_MAX`, `CARD_LIMITS`)

#### React Hooks
- Custom hooks: prefix with `use` (e.g., `useGameState`)
- Refs: suffix with `Ref` (e.g., `timeoutRef`, `fileInputRef`)

### Code Organization

#### Component Structure
```javascript
// 1. Imports (React, components, hooks, models, styles)
import React, { useState, useCallback } from 'react';
import ComponentName from './ComponentName.jsx';

// 2. Component definition with PropTypes
function MyComponent({ prop1, prop2 }) {
  // 3. Hooks (in order: state, refs, memoized values, callbacks, effects)
  const [state, setState] = useState(null);
  const timeoutRef = useRef(null);
  
  const memoValue = useMemo(() => computeValue(), [deps]);
  const handleAction = useCallback(() => {}, [deps]);
  
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [deps]);
  
  // 4. Render logic
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
}

// 5. PropTypes
MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func,
};

// 6. Export
export default React.memo(MyComponent);
```

#### File Structure
```
src/
├── components/        # React components
├── controllers/       # Game logic controllers
├── models/           # Data models and business logic
├── constants/        # Shared constants and enums
├── styles/           # CSS stylesheets
│   ├── App.css       # Main application styles
│   └── index.css     # Global styles and resets
├── App.jsx           # Main app component
└── index.js          # Entry point
```

### Documentation Standards

#### JSDoc Comments
All functions, classes, and complex logic must have JSDoc comments:

```javascript
/**
 * Determines the winner of a card matchup
 * @param {Card} playerCard - The card played by the player
 * @param {Card} aiCard - The card played by the AI
 * @returns {string} Result of the matchup ("Player Wins", "AI Wins", "Draw")
 */
function determineWinner(playerCard, aiCard) {
  // Implementation
}
```

#### Inline Comments
- Use `//` for single-line explanatory comments
- Comment "why" not "what" (code should be self-documenting)
- Add comments for complex algorithms, workarounds, or non-obvious logic

### React Best Practices

#### Memory Leaks Prevention
1. Always cleanup timers/intervals in useEffect:
```javascript
useEffect(() => {
  const timeout = setTimeout(() => {...}, 1000);
  return () => clearTimeout(timeout);
}, []);
```

2. Clear event listeners:
```javascript
useEffect(() => {
  const handler = () => {...};
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

3. Cancel async operations on unmount
4. Revoke object URLs when done

#### Performance Optimization
1. Memoize expensive computations with `useMemo`
2. Memoize callbacks passed to children with `useCallback`
3. Wrap pure components with `React.memo`
4. Avoid inline object/array creation in JSX props
5. Use derived state instead of duplicating state

#### State Management
1. Keep state as local as possible
2. Lift state only when necessary
3. Use derived values with `useMemo` instead of storing redundant state
4. Never mutate state directly - use spread operators or array methods that return new arrays

### Accessibility (A11y) Standards

1. **Semantic HTML**: Use proper HTML elements (`button`, `nav`, `main`, etc.)
2. **Keyboard Navigation**: All interactive elements must be keyboard accessible
3. **ARIA Labels**: 
   - Add `aria-label` to icon-only buttons
   - Use `aria-live="polite"` for dynamic content announcements
   - Use `role="img"` with `aria-label` for decorative emojis
4. **Button Types**: Always specify `type="button"` for non-submit buttons
5. **Focus Management**: Move focus to appropriate elements on screen transitions
6. **Color Contrast**: Ensure minimum 4.5:1 contrast ratio for text

### Error Handling

1. Validate all user input
2. Use `parseInt(value, 10)` - always specify radix
3. Handle both Unix (`\n`) and Windows (`\r\n`) line endings in file parsing
4. Prefer non-blocking notifications over `alert()` dialogs
5. Provide user-friendly error messages

### Constants & Magic Numbers

Define constants for all magic numbers:
```javascript
export const DECK_MIN = 10;
export const DECK_MAX = 20;
export const INITIAL_HAND_SIZE = 3;
```

### Enums & String Constants

Use object freezing for enums:
```javascript
export const CardType = Object.freeze({
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
});
```

### CSS Conventions

1. Use BEM-like naming (block__element--modifier pattern encouraged)
2. Class names: kebab-case (e.g., `card-button`, `game-board`)
3. Group related styles together
4. Use CSS variables for colors and repeated values
5. Mobile-first responsive design with media queries at bottom

### Git Commit Messages

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process, dependencies, etc.

Example: `feat: add instructions screen with card explanations`

## Testing Checklist

Before committing:
- [ ] No console errors or warnings
- [ ] Code passes ESLint
- [ ] All components have PropTypes
- [ ] No memory leaks (timers cleaned up, refs handled)
- [ ] Accessible (keyboard navigation works, ARIA labels present)
- [ ] Responsive on mobile and desktop
- [ ] Works in Chrome, Firefox, Safari
