# Testing Guide

> **Quick Summary:** Comprehensive testing checklist covering manual testing procedures (gameplay, UI/UX, accessibility, cross-browser), plus planned automated testing strategy with Jest and React Testing Library. Includes sample test code and coverage goals.

## Overview

This document outlines the testing strategy for the Rock Paper Scissors Card Game project. While comprehensive automated tests are planned for future releases, current testing relies on manual testing procedures.

## Current Testing Approach

### Manual Testing Checklist

#### ✅ Pre-Commit Checklist

Before committing any changes, verify:

- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **No Console Errors**: Check browser console for errors/warnings
- [ ] **ESLint Clean**: No linting errors in build output
- [ ] **TypeScript/PropTypes**: All components have proper type validation

#### 🎮 Gameplay Testing

Test all game functionality:

**Deck Building**
- [ ] Add cards to deck (respects limits)
- [ ] Remove cards from deck
- [ ] Deck validation (10-20 cards)
- [ ] Rarity limits enforced
- [ ] Export deck to .txt file
- [ ] Import deck from .txt file
- [ ] Handle invalid deck files gracefully

**Game Flow**
- [ ] Start game with default deck
- [ ] Start game with custom deck
- [ ] Start game with imported deck
- [ ] Play cards from hand
- [ ] AI plays cards appropriately
- [ ] Round results display correctly
- [ ] Card effects trigger (draw, discard, block)
- [ ] Game ends when player runs out of cards
- [ ] Final score calculates correctly
- [ ] "Play Again" resets game state
- [ ] "Back to Menu" returns to start screen

**Instructions**
- [ ] Instructions button opens screen
- [ ] All card types displayed with emojis
- [ ] Rules explanation is clear
- [ ] Back button returns to menu

#### 🎨 UI/UX Testing

**Responsiveness**
- [ ] Desktop (1920x1080+)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile landscape

**Cross-Browser**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Visual Elements**
- [ ] All emojis render correctly
- [ ] Gradients display properly
- [ ] Animations smooth (card plays, transitions)
- [ ] Buttons have hover states
- [ ] Focus states visible
- [ ] Loading states (if any)

#### ♿ Accessibility Testing

**Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Focus visible on all elements
- [ ] No keyboard traps
- [ ] Logical tab order

**Screen Reader**
- [ ] All buttons have aria-labels
- [ ] Images have alt text
- [ ] Emojis have role="img" and aria-label
- [ ] Dynamic content announces changes (aria-live)

**Color Contrast**
- [ ] Text meets 4.5:1 contrast ratio
- [ ] Buttons meet contrast requirements
- [ ] Error messages clearly visible

## Planned Automated Testing

### Future Test Framework

**Recommended Stack:**
- **Jest**: Test runner
- **React Testing Library**: Component testing
- **Jest-DOM**: Custom matchers

### Installation (Future)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
```

### Planned Test Coverage

#### Unit Tests

**Game Logic Package (`@theomegafett/rps-game-logic`)**

```javascript
// packages/rps-game-logic/__tests__/Card.test.js
import { Card, CardType } from '../src/Card.js';

describe('Card', () => {
  test('Rock card has correct base type', () => {
    const card = new Card(CardType.ROCK);
    expect(card.baseTypes).toEqual([CardType.ROCK]);
  });

  test('Hybrid card has multiple base types', () => {
    const card = new Card(CardType.PAPER_ROCK);
    expect(card.baseTypes).toEqual([CardType.PAPER, CardType.ROCK]);
  });

  test('Block card has no base types', () => {
    const card = new Card(CardType.BLOCK_DRAW_TWO);
    expect(card.baseTypes).toEqual([]);
  });
});
```

```javascript
// packages/rps-game-logic/__tests__/GameController.test.js
import { GameController, getWinner } from '../src/GameController.js';
import { Card, CardType } from '../src/Card.js';

describe('getWinner', () => {
  test('Rock beats Scissors', () => {
    const rock = new Card(CardType.ROCK);
    const scissors = new Card(CardType.SCISSORS);
    expect(getWinner(rock, scissors)).toBe('card1');
  });

  test('Scissors beats Paper', () => {
    const scissors = new Card(CardType.SCISSORS);
    const paper = new Card(CardType.PAPER);
    expect(getWinner(scissors, paper)).toBe('card1');
  });

  test('Paper beats Rock', () => {
    const paper = new Card(CardType.PAPER);
    const rock = new Card(CardType.ROCK);
    expect(getWinner(paper, rock)).toBe('card1');
  });

  test('Same types result in draw', () => {
    const rock1 = new Card(CardType.ROCK);
    const rock2 = new Card(CardType.ROCK);
    expect(getWinner(rock1, rock2)).toBe('draw');
  });

  test('Block cards return blocked result', () => {
    const block = new Card(CardType.BLOCK_DRAW_TWO);
    const rock = new Card(CardType.ROCK);
    expect(getWinner(block, rock)).toBe('blocked');
  });
});
```

#### Component Tests

```javascript
// src/components/__tests__/StartScreen.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import StartScreen from '../StartScreen';

describe('StartScreen', () => {
  test('renders title', () => {
    render(<StartScreen onNewGame={() => {}} onBuildDeck={() => {}} />);
    expect(screen.getByText(/Rock Paper Scissors Card Game/i)).toBeInTheDocument();
  });

  test('calls onNewGame when button clicked', () => {
    const mockNewGame = jest.fn();
    render(<StartScreen onNewGame={mockNewGame} onBuildDeck={() => {}} />);
    
    fireEvent.click(screen.getByText(/New Game/i));
    expect(mockNewGame).toHaveBeenCalledTimes(1);
  });
});
```

#### Integration Tests

```javascript
// src/__tests__/GameFlow.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Game Flow Integration', () => {
  test('complete game flow from start to finish', async () => {
    render(<App />);
    
    // Start game
    fireEvent.click(screen.getByText(/New Game/i));
    
    // Verify game board renders
    expect(screen.getByText(/Your Hand/i)).toBeInTheDocument();
    
    // Play a card
    const cards = screen.getAllByRole('button', { name: /play card/i });
    fireEvent.click(cards[0]);
    
    // Verify round result displayed
    expect(screen.getByText(/Player Wins|AI Wins|Draw/i)).toBeInTheDocument();
  });
});
```

### Running Tests (Future)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Card.test.js
```

### Coverage Goals

| Category | Target Coverage |
|----------|----------------|
| Core Logic (`@theomegafett/rps-game-logic`) | 90%+ |
| Components | 80%+ |
| Integration | 70%+ |

## Performance Testing

### Manual Performance Checks

- [ ] Initial load time < 3 seconds
- [ ] Card play response feels instant
- [ ] No memory leaks (check DevTools memory over time)
- [ ] Smooth animations (60fps)
- [ ] Build size < 100KB gzipped

### Tools
- Chrome DevTools Performance tab
- Lighthouse (PWA audit)
- React DevTools Profiler

## Test Data

### Sample Valid Deck

```
ROCK 4
PAPER 3
SCISSORS 3
ROCK_DRAW 2
PAPER_DRAW 2
SCISSORS_DRAW 2
PAPER_ROCK 1
ROCK_SCISSORS 1
SCISSORS_PAPER 1
BLOCK_DRAW_TWO 1
```

### Sample Invalid Decks

**Too few cards:**
```
ROCK 4
PAPER 3
SCISSORS 2
```

**Too many of one type:**
```
ROCK 5
PAPER 4
SCISSORS 4
ROCK_DRAW 3
PAPER_DRAW 2
SCISSORS_DRAW 2
```

## Continuous Integration (Planned)

### GitHub Actions Workflow

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## Contributing to Tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding tests.

When adding new features:
1. Write manual test cases first
2. Document test scenarios
3. Plan automated tests for future implementation

## Questions?

For testing questions or issues, please open a GitHub issue with the `testing` label.

---

**Current Status**: Manual testing only  
**Next Step**: Implement Jest + React Testing Library setup  
**Goal**: Achieve 80%+ test coverage across the project
