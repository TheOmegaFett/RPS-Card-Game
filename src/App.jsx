import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen.jsx';
import GameBoard from './components/GameBoard.jsx';
import DeckBuilder from './components/DeckBuilder.jsx';
import Instructions from './components/Instructions.jsx';
import { Deck, DECK_MIN } from './models/Deck.js';
import { CardType } from './models/Card.js';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [playerDeck, setPlayerDeck] = useState(null);

  /**
   * Creates the default starter deck with a balanced mix of cards
   * @returns {Deck} A new deck with 18 cards
   */
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

  /**
   * Starts a new game with the default deck
   */
  const handleNewGame = useCallback(() => {
    const deck = createDefaultDeck();
    setPlayerDeck(deck);
    setCurrentScreen('game');
  }, []);

  /**
   * Navigates to the deck builder screen
   */
  const handleBuildDeck = useCallback(() => {
    setCurrentScreen('deckbuilder');
  }, []);

  /**
   * Callback for when deck building is complete
   * @param {Deck} deck - The completed deck
   */
  const handleDeckComplete = useCallback((deck) => {
    setPlayerDeck(deck);
    setCurrentScreen('game');
  }, []);

  /**
   * Parses deck content from imported text file
   * Expected format: CARD_TYPE_NAME count (one per line)
   * Handles both Unix (\n) and Windows (\r\n) line endings
   * @param {string} content - The file content to parse
   * @returns {Deck|null} The parsed deck, or null if parsing failed
   */
  const parseDeckContent = useCallback((content) => {
    const deck = new Deck();
    const lines = content.trim().split(/\r?\n/);

    for (const line of lines) {
      if (!line.trim()) continue;
      
      const parts = line.trim().split(/\s+/);
      if (parts.length !== 2) {
        alert(`Invalid format: ${line}`);
        return null;
      }

      const cardTypeName = parts[0];
      const count = parseInt(parts[1], 10);

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
      alert(`Deck must have at least ${DECK_MIN} cards`);
      return null;
    }

    return deck;
  }, []);

  /**
   * Prompts user to import a deck from a text file
   */
  const handleImportDeck = useCallback(() => {
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
  }, [parseDeckContent]);

  /**
   * Returns to the main menu and clears the current deck
   */
  const handleBackToMenu = useCallback(() => {
    setCurrentScreen('start');
    setPlayerDeck(null);
  }, []);

  /**
   * Navigates to the instructions screen
   */
  const handleInstructions = useCallback(() => {
    setCurrentScreen('instructions');
  }, []);

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
