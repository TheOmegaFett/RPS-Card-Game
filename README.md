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

- 20-card deck building with rarity limits
- Special card types with emojis
- Play until one player runs out of cards (10-20 turns)
- Deck import from .txt files
- Responsive design

## Card Types

- **Common (max 4)**: 🪨 📄 ✂️
- **Uncommon (max 2)**: 🪨➕1 📄➕1 ✂️➕1
- **Rare (max 1-2)**: 📄🪨 🪨✂️ ✂️📄 🔒🚫
- **Legendary (max 1)**: 🔒➕2
