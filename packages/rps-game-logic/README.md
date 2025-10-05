# @omega/rps-game-logic

Core game logic for Rock Paper Scissors card game with deck building mechanics.

## Features

- ✅ **Pure JavaScript** - No dependencies, works in Node.js and browsers
- 🎴 **Card Management** - Complete card type system with hybrid and special cards
- 📦 **Deck Building** - Deck validation with rarity limits
- 🎮 **Game Controller** - Full game state management and round resolution
- 🧪 **Well-Tested** - Comprehensive JSDoc documentation

## Installation

```bash
npm install @omega/rps-game-logic
```

## Quick Start

```javascript
import { Card, Deck, GameController, CardType, getWinner } from '@omega/rps-game-logic';

// Create a deck
const deck = new Deck();
deck.addCard(CardType.ROCK);
deck.addCard(CardType.PAPER);
deck.addCard(CardType.SCISSORS);
// ... add more cards

// Start a game
const game = new GameController();
game.setupGame(deck);

// Play a round
const result = game.playRound(0); // Play first card in hand
console.log(result); // { result: "Player Wins", playerCard, aiCard }
```

## API Reference

### CardType

Enum of all available card types:

```javascript
CardType.ROCK
CardType.PAPER
CardType.SCISSORS
CardType.ROCK_DRAW          // Draw 1 card after playing
CardType.PAPER_DRAW         // Draw 1 card after playing
CardType.SCISSORS_DRAW      // Draw 1 card after playing
CardType.PAPER_ROCK         // Hybrid card
CardType.ROCK_SCISSORS      // Hybrid card
CardType.SCISSORS_PAPER     // Hybrid card
CardType.BLOCK_DRAW_TWO     // Block scoring, draw 2 cards
CardType.BLOCK_DISCARD      // Block scoring, opponent discards 1
```

### Card

```javascript
const card = new Card(CardType.ROCK);
card.type        // "Rock"
card.baseTypes   // ["Rock"]
```

### Deck

```javascript
const deck = new Deck();
deck.addCard(cardType)         // Add a card (respects limits)
deck.isValid()                 // Check if deck has 10+ cards
deck.shuffle()                 // Shuffle the deck
deck.countCardType(cardType)   // Count cards of a type
deck.size()                    // Get card count
deck.copy()                    // Create a copy
```

### Player

```javascript
const player = new Player("Player Name", deck);
player.drawCard()              // Draw a card from deck to hand
player.playCard(index)         // Play a card from hand
player.hand                    // Current hand (array of Cards)
player.deck                    // Remaining deck (array of Cards)
```

### GameController

```javascript
const game = new GameController();
game.setupGame(playerDeck)    // Initialize game with player's deck
game.playRound(cardIndex)      // Play a round
game.roundsWon                 // Player wins count
game.roundsLost                // AI wins count
game.player                    // Player object
game.ai                        // AI object
```

### getWinner(card1, card2)

Standalone function to determine winner between two cards:

```javascript
import { getWinner, Card, CardType } from '@omega/rps-game-logic';

const rock = new Card(CardType.ROCK);
const scissors = new Card(CardType.SCISSORS);

getWinner(rock, scissors); // Returns "card1"
```

**Returns:** `"card1"` | `"card2"` | `"draw"` | `"blocked"`

## Game Rules

### Basic Rules
- 🪨 Rock beats Scissors
- ✂️ Scissors beats Paper
- 📄 Paper beats Rock

### Deck Building
- Minimum 10 cards, maximum 20 cards
- Rarity limits:
  - **Common** (max 4 each): Rock, Paper, Scissors
  - **Uncommon** (max 2 each): Rock+Draw, Paper+Draw, Scissors+Draw
  - **Rare** (max 1-2 each): Hybrids, Block+Discard
  - **Legendary** (max 1): Block+Draw Two

### Special Cards
- **Hybrid Cards**: Can win as either type (e.g., Paper-Rock beats both Rock and Scissors)
- **Draw Cards**: Draw additional cards after playing
- **Block Cards**: Prevent scoring for that round

## Constants

```javascript
import { DECK_MIN, DECK_MAX, INITIAL_HAND_SIZE, CARD_LIMITS } from '@omega/rps-game-logic';

DECK_MIN            // 10
DECK_MAX            // 20
INITIAL_HAND_SIZE   // 3
CARD_LIMITS         // Object with max counts and rarity for each card type
```

## Examples

### Standalone Winner Determination

```javascript
import { getWinner, Card, CardType } from '@omega/rps-game-logic';

const rock = new Card(CardType.ROCK);
const paper = new Card(CardType.PAPER);

console.log(getWinner(rock, paper));  // "card2" (paper wins)
```

### Full Game Loop

```javascript
import { Deck, GameController, CardType } from '@omega/rps-game-logic';

const deck = new Deck();
// Build deck...
deck.addCard(CardType.ROCK);
// ... (add 9+ more cards)

const game = new GameController();
game.setupGame(deck);

while (game.player.hand.length > 0 && game.ai.hand.length > 0) {
  const result = game.playRound(0);
  console.log(result.result);
}

console.log(`Final Score: ${game.roundsWon} - ${game.roundsLost}`);
```

## Module Exports

```javascript
// Main export
import * as RPS from '@omega/rps-game-logic';

// Named imports
import { Card, Deck, Player, GameController } from '@omega/rps-game-logic';

// Specific module imports
import { Card } from '@omega/rps-game-logic/card';
import { Deck } from '@omega/rps-game-logic/deck';
import { getWinner } from '@omega/rps-game-logic/game';
import { CARD_LIMITS } from '@omega/rps-game-logic/constants';
```

## TypeScript Support

This package includes JSDoc type annotations. For full TypeScript support, you can generate type definitions or use the JSDoc comments directly.

## License

MIT

## Repository

[GitHub - RPS Card Game](https://github.com/TheOmegaFett/RPS-Card-Game)
