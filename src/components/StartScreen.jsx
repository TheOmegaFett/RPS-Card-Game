import React from 'react';

function StartScreen({ onNewGame, onBuildDeck, onImportDeck, onInstructions }) {
  return (
    <div className="start-screen">
      <h1>Rock Paper Scissors Card Game</h1>
      <div className="menu-buttons">
        <button onClick={onNewGame} className="menu-btn">
          New Game (Default Deck)
        </button>
        <button onClick={onBuildDeck} className="menu-btn">
          Build Custom Deck
        </button>
        <button onClick={onImportDeck} className="menu-btn">
          Import Deck
        </button>
        <button onClick={onInstructions} className="menu-btn">
          Instructions
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
