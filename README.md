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
├── styles/           # CSS stylesheets
│   ├── App.css       # Main application styles
│   └── index.css     # Global styles and resets
├── App.jsx           # Main app component
└── index.js          # Entry point
```

### Code Quality
- ✅ Full JSDoc documentation
- ✅ PropTypes validation on all components
- ✅ Memory leak prevention (proper cleanup)
- ✅ Performance optimizations (memoization)
- ✅ Accessibility compliant (WCAG 2.1)

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for complete coding standards and developer guidelines.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment & Production

### Building for Production
```bash
npm run build
```
This creates an optimized production build in the `build/` folder with:
- Minified and bundled JavaScript
- Cache-busting filenames
- Optimized CSS

### Server Configuration (Recommended)

For optimal performance and security, configure your web server with:

#### Headers
```nginx
# Content-Type with UTF-8
add_header Content-Type "text/html; charset=utf-8";

# Security headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header X-XSS-Protection "1; mode=block" always;

# Content Security Policy (production)
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" always;
```

#### Caching
```nginx
# Static assets (with hash in filename)
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# HTML files
location ~* \.html$ {
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

### Deployment Platforms

#### Render (Recommended)
This project includes a `render.yaml` configuration file for deployment:

1. **Push to GitHub**
2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Render will detect `render.yaml` for basic configuration

3. **Configure Headers (Important):**
   - If warnings persist, you may need to configure headers manually in Render Dashboard
   - See **[RENDER_SETUP.md](RENDER_SETUP.md)** for detailed header configuration instructions
   - This includes security headers, cache-control settings, and CSP configuration

The `render.yaml` file configures the build, but headers may need manual setup in the dashboard.

#### GitHub Pages
```bash
npm run build
# Deploy the build folder
```

#### Netlify/Vercel
- Auto-deploys from Git
- Headers configured via `netlify.toml` or Vercel settings
- Automatic HTTPS and cache optimization

**Note:** The warnings about CSP `eval` and missing headers only apply to development mode (`npm start`). The `render.yaml` configuration file ensures production builds on Render have all required headers.

## AI Acknowledgment

This project used AI code suggestions (Amp by Sourcegraph). All code was reviewed, tested, and licensed by the author. Significant AI-generated changes are marked with "Co-authored-by" in commit messages.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
