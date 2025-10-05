# Documentation Assets

This folder contains screenshots, diagrams, and other visual assets for documentation.

## Screenshots

To add screenshots to the project:

1. **Take Screenshots** of the application:
   - Main menu
   - Deck builder
   - Gameplay screen
   - Instructions screen
   - Game over screen

2. **Save Images** in this folder with descriptive names:
   - `menu-screenshot.png`
   - `deck-builder.png`
   - `gameplay.png`
   - `instructions.png`
   - `game-over.png`

3. **Reference in README** using relative paths:
   ```markdown
   ![Main Menu](docs/menu-screenshot.png)
   ![Gameplay](docs/gameplay.png)
   ```

## Recommended Tools

### Taking Screenshots

**Windows:**
- `Win + Shift + S` - Snipping Tool
- `Win + PrtScn` - Full screen
- Use browser DevTools for specific viewport sizes

**Mac:**
- `Cmd + Shift + 4` - Selection
- `Cmd + Shift + 3` - Full screen

**Browser Extensions:**
- Awesome Screenshot
- Fireshot
- Nimbus Screenshot

### Optimizing Images

```bash
# Install image optimizer
npm install -g imagemin-cli

# Optimize PNGs
imagemin docs/*.png --out-dir=docs/optimized
```

**Online Tools:**
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

### Recommended Sizes

- **Full Page**: 1920x1080 (desktop view)
- **Mobile**: 375x667 or 390x844 (modern phones)
- **Thumbnail**: 800x600 (for preview)

## Current Assets

_Add list of current screenshots here as they are added._

Example:
```
- [ ] menu-screenshot.png - Main menu with all buttons
- [ ] deck-builder.png - Deck building interface
- [ ] gameplay.png - Active game with cards
- [ ] instructions.png - Instructions screen
- [ ] game-over.png - Game over modal
- [ ] mobile-view.png - Mobile responsive view
```

## Adding to README

Once screenshots are added, update the main README.md:

```markdown
## Screenshots

### Main Menu
![Main Menu](docs/menu-screenshot.png)

### Deck Builder
![Deck Builder](docs/deck-builder.png)

### Gameplay
![Gameplay](docs/gameplay.png)

### Mobile View
<img src="docs/mobile-view.png" width="375" alt="Mobile View">
```

## GIFs (Optional)

For demonstrating gameplay:

```bash
# Use ScreenToGif (Windows) or LICEcap (Mac/Windows)
# Or use ezgif.com to convert video to GIF
```

Example usage:
```markdown
![Gameplay Demo](docs/gameplay-demo.gif)
```

## Diagrams

For architecture diagrams, use:
- [Draw.io](https://draw.io)
- [Excalidraw](https://excalidraw.com)
- [Mermaid](https://mermaid.js.org) (markdown-based)

Save as:
- `architecture-diagram.png`
- `component-hierarchy.png`
- `game-flow.png`
