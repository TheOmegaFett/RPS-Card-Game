import React, { useState } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameBoard from './components/GameBoard.jsx';
import DeckBuilder from './components/DeckBuilder.jsx';
import Instructions from './components/Instructions.jsx';
import { Deck } from './models/Deck.js';
import { CardType } from './models/Card.js';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [playerDeck, setPlayerDeck] = useState(null);

  const createDefaultDeck = () => {
    const deck = new Deck();
    const cardsToAdd = [
      CardType.ROCK, CardType.PAPER, CardType.SCISSORS,
      CardType.ROCK, CardType.PAPER, CardType.SCISSORS,
      CardType.ROCK, CardType.PAPER, CardType.SCISSORS,
      CardType.ROCK,
      CardType.ROCK_DRAW, CardType.PAPER_DRAW, CardType.SCISSORS_DRAW,
      CardType.BLOCK_DRAW_TWO,
      CardType.BLOCK_DISCARD,
      CardType.PAPER_ROCK,
      CardType.ROCK_SCISSORS,
      CardType.SCISSORS_PAPER,
    ];
    
    cardsToAdd.forEach(cardType => deck.addCard(cardType));
    return deck;
  };

  const handleNewGame = () => {
    const deck = createDefaultDeck();
    setPlayerDeck(deck);
    setCurrentScreen('game');
  };

  const handleBuildDeck = () => {
    setCurrentScreen('deckbuilder');
  };

  const handleDeckComplete = (deck) => {
    setPlayerDeck(deck);
    setCurrentScreen('game');
  };

  const handleImportDeck = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const deck = parseDeckContent(content);
        
        if (deck) {
          setPlayerDeck(deck);
          setCurrentScreen('game');
        } else {
          alert('Failed to parse deck file');
        }
      };
      reader.readAsText(file);
    };
    
    input.click();
  };

  const parseDeckContent = (content) => {
    const deck = new Deck();
    const lines = content.trim().split('\n');

    for (const line of lines) {
      if (!line.trim()) continue;
      
      const parts = line.trim().split(/\s+/);
      if (parts.length !== 2) {
        alert(`Invalid format: ${line}`);
        return null;
      }

      const cardTypeName = parts[0];
      const count = parseInt(parts[1]);

      if (!CardType[cardTypeName]) {
        alert(`Unknown card type: ${cardTypeName}`);
        return null;
      }

      const cardType = CardType[cardTypeName];
      
      for (let i = 0; i < count; i++) {
        if (!deck.addCard(cardType)) {
          alert(`Could not add ${cardTypeName} to deck`);
          return null;
        }
      }
    }

    if (!deck.isValid()) {
      alert('Deck must have at least 10 cards');
      return null;
    }

    return deck;
  };

  const handleBackToMenu = () => {
    setCurrentScreen('start');
    setPlayerDeck(null);
  };

  const handleInstructions = () => {
    setCurrentScreen('instructions');
  };

  return (
    <div className="App">
      {currentScreen === 'start' && (
        <StartScreen 
          onNewGame={handleNewGame}
          onBuildDeck={handleBuildDeck}
          onImportDeck={handleImportDeck}
          onInstructions={handleInstructions}
        />
      )}
      {currentScreen === 'instructions' && (
        <Instructions onBack={handleBackToMenu} />
      )}
      {currentScreen === 'deckbuilder' && (
        <DeckBuilder 
          onDeckComplete={handleDeckComplete}
          onBack={handleBackToMenu}
        />
      )}
      {currentScreen === 'game' && playerDeck && (
        <GameBoard 
          playerDeck={playerDeck}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
