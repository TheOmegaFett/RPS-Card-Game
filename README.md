# Rock Paper Scissors Card Game - React

A turn-based card game featuring Rock, Paper, Scissors mechanics with special card types, deck building, and strategic gameplay.

## Installation

```bash
cd card-game-react
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

- 🎴 Build custom 20-card decks with rarity limits
- 🎮 Strategic gameplay with special card effects
- 🤖 Battle against AI with full 20-card decks
- 📥 Import/Export deck configurations (.txt files)
- 📱 Responsive design for mobile and desktop
- ♿ Accessibility features (keyboard navigation, ARIA labels)
- 📖 In-game instructions and card reference

## How to Play

1. **Start a Game**: Choose from default deck, build custom deck, or import a deck
2. **Gameplay**: Each player starts with 3 cards. Play continues until one player runs out of cards
3. **Win Condition**: The player with the most turn victories wins the game
4. **Card Rules**: Rock beats Scissors, Scissors beats Paper, Paper beats Rock

## Card Types

### Common Cards (max 4 each)
- **🪨 Rock**: Defeats Scissors
- **📄 Paper**: Defeats Rock
- **✂️ Scissors**: Defeats Paper

### Uncommon Cards (max 2 each)
- **🪨 ➕1 Rock +Draw**: Defeats Scissors, draw 1 card after playing
- **📄 ➕1 Paper +Draw**: Defeats Rock, draw 1 card after playing
- **✂️ ➕1 Scissors +Draw**: Defeats Paper, draw 1 card after playing

### Rare Cards (max 1-2 each)
- **📄🪨 Paper-Rock Hybrid**: Acts as both Paper AND Rock
- **🪨✂️ Rock-Scissors Hybrid**: Acts as both Rock AND Scissors
- **✂️📄 Scissors-Paper Hybrid**: Acts as both Scissors AND Paper
- **🔒🚫 Block & Discard**: Blocks scoring, opponent discards 1 random card

### Legendary Cards (max 1)
- **🔒➕2 Block & Draw 2**: Blocks scoring, you draw 2 cards

## Deck Building Rules

- **Deck Size**: Minimum 10 cards, maximum 20 cards
- **Rarity Limits**: Each card type has a maximum allowed per deck
- **Strategy**: Balance offense (winning types), defense (blocks), and card advantage (draw effects)

## Importing/Exporting Decks

### Export Format
Decks are saved as `.txt` files with the format:
```
ROCK 4
PAPER 3
SCISSORS 3
ROCK_DRAW 2
PAPER_DRAW 2
SCISSORS_DRAW 2
BLOCK_DRAW_TWO 1
BLOCK_DISCARD 1
PAPER_ROCK 1
ROCK_SCISSORS 1
```

### Import
Click "Import Deck" from the main menu and select a `.txt` file following the format above.

## Development

### Project Structure
```
src/
├── components/        # React components (UI)
├── controllers/       # Game logic controllers
├── models/           # Data models (Card, Deck, Player)
├── constants/        # Shared constants and card definitions
├── App.jsx           # Main app component
└── App.css           # Global styles
```

### Code Quality
- ✅ Full JSDoc documentation
- ✅ PropTypes validation on all components
- ✅ Memory leak prevention (proper cleanup)
- ✅ Performance optimizations (memoization)
- ✅ Accessibility compliant (WCAG 2.1)

See [AGENTS.md](AGENTS.md) for complete coding standards and developer guidelines.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
