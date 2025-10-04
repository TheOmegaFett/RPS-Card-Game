import React, { useState } from 'react';
import { Deck } from '../models/Deck.js';
import { CardType } from '../models/Card.js';
import { CARD_EMOJIS, CARD_LIMITS } from '../constants/cardEmojis.js';

function DeckBuilder({ onDeckComplete, onBack }) {
  const [deck, setDeck] = useState(new Deck());
  const [deckCards, setDeckCards] = useState([]);

  const rarityOrder = { 'Common': 0, 'Uncommon': 1, 'Rare': 2, 'Legendary': 3 };
  const cardTypes = Object.values(CardType).sort((a, b) => {
    const rarityA = CARD_LIMITS[a]?.rarity || 'Common';
    const rarityB = CARD_LIMITS[b]?.rarity || 'Common';
    return rarityOrder[rarityA] - rarityOrder[rarityB];
  });

  const getCardCount = (cardType) => {
    return deckCards.filter(c => c === cardType).length;
  };

  const addCard = (cardType) => {
    const newDeck = new Deck();
    deckCards.forEach(card => newDeck.addCard(card));
    
    if (newDeck.addCard(cardType)) {
      setDeckCards([...deckCards, cardType]);
      setDeck(newDeck);
    } else {
      alert('Cannot add more of this card (deck limit reached)');
    }
  };

  const removeCard = (cardType) => {
    const index = deckCards.findIndex(c => c === cardType);
    if (index !== -1) {
      const newCards = [...deckCards];
      newCards.splice(index, 1);
      
      const newDeck = new Deck();
      newCards.forEach(card => newDeck.addCard(card));
      
      setDeckCards(newCards);
      setDeck(newDeck);
    }
  };

  const handleStartGame = () => {
    if (deck.isValid()) {
      onDeckComplete(deck);
    } else {
      alert('Deck must have at least 10 cards!');
    }
  };

  const handleExportDeck = () => {
    if (deckCards.length === 0) {
      alert('Add some cards to your deck first!');
      return;
    }

    const cardCounts = {};
    deckCards.forEach(cardType => {
      cardCounts[cardType] = (cardCounts[cardType] || 0) + 1;
    });

    const lines = [];
    Object.entries(CardType).forEach(([key, value]) => {
      if (cardCounts[value]) {
        lines.push(`${key} ${cardCounts[value]}`);
      }
    });

    const content = lines.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-deck.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="deck-builder">
      <h1>Build Your Deck</h1>
      <p>Deck Size: {deckCards.length} / 20 (Minimum: 10)</p>
      
      <div className="card-selection">
        {cardTypes.map((cardType) => {
          const count = getCardCount(cardType);
          const limit = CARD_LIMITS[cardType];
          
          return (
            <div key={cardType} className="card-selector">
              <div className="card-info">
                <span className="card-emoji">{CARD_EMOJIS[cardType]}</span>
                <span className="card-name">{cardType}</span>
                <span className={`card-rarity ${limit.rarity.toLowerCase()}`}>
                  {limit.rarity}
                </span>
              </div>
              <div className="card-controls">
                <button 
                  onClick={() => removeCard(cardType)}
                  disabled={count === 0}
                  className="btn-small"
                >
                  -
                </button>
                <span className="card-count">{count} / {limit.max}</span>
                <button 
                  onClick={() => addCard(cardType)}
                  disabled={count >= limit.max || deckCards.length >= 20}
                  className="btn-small"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="deck-actions">
        <button onClick={onBack} className="menu-btn secondary">
          Back
        </button>
        <button 
          onClick={handleExportDeck} 
          className="menu-btn secondary"
          disabled={deckCards.length === 0}
        >
          Export Deck
        </button>
        <button 
          onClick={handleStartGame} 
          className="menu-btn"
          disabled={!deck.isValid()}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default DeckBuilder;
