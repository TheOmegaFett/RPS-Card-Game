import React, { useState, useMemo, useCallback } from "react";
import PropTypes from 'prop-types';
import { Deck, CardType } from '@omega/rps-game-logic';
import { CARD_EMOJIS, CARD_LIMITS } from "../constants/cardEmojis.js";

const RARITY_ORDER = { Common: 0, Uncommon: 1, Rare: 2, Legendary: 3 };

function DeckBuilder({ onDeckComplete, onBack }) {
  const [deck, setDeck] = useState(new Deck());
  const [deckCards, setDeckCards] = useState([]);

  /**
   * Sorted array of card types ordered by rarity (common to legendary)
   */
  const cardTypes = useMemo(() => {
    return Object.values(CardType).sort((a, b) => {
      const rarityA = CARD_LIMITS[a]?.rarity || "Common";
      const rarityB = CARD_LIMITS[b]?.rarity || "Common";
      return RARITY_ORDER[rarityA] - RARITY_ORDER[rarityB];
    });
  }, []);

  /**
   * Memoized card count map for efficient lookups
   */
  const cardCountMap = useMemo(() => {
    const counts = {};
    deckCards.forEach((cardType) => {
      counts[cardType] = (counts[cardType] || 0) + 1;
    });
    return counts;
  }, [deckCards]);

  /**
   * Gets the count of a specific card type in the current deck
   * @param {string} cardType - The card type to count
   * @returns {number} Number of cards of this type
   */
  const getCardCount = useCallback(
    (cardType) => {
      return cardCountMap[cardType] || 0;
    },
    [cardCountMap]
  );

  /**
   * Adds a card to the deck if within limits
   * @param {string} cardType - The card type to add
   */
  const addCard = useCallback(
    (cardType) => {
      const newDeck = new Deck();
      deckCards.forEach((card) => newDeck.addCard(card));

      if (newDeck.addCard(cardType)) {
        setDeckCards([...deckCards, cardType]);
        setDeck(newDeck);
      } else {
        alert("Cannot add more of this card (deck limit reached)");
      }
    },
    [deckCards]
  );

  /**
   * Removes a card from the deck
   * @param {string} cardType - The card type to remove
   */
  const removeCard = useCallback(
    (cardType) => {
      const index = deckCards.findIndex((c) => c === cardType);
      if (index !== -1) {
        const newCards = [...deckCards];
        newCards.splice(index, 1);

        const newDeck = new Deck();
        newCards.forEach((card) => newDeck.addCard(card));

        setDeckCards(newCards);
        setDeck(newDeck);
      }
    },
    [deckCards]
  );

  /**
   * Validates deck and starts the game
   */
  const handleStartGame = useCallback(() => {
    if (deck.isValid()) {
      onDeckComplete(deck);
    } else {
      alert("Deck must have at least 10 cards!");
    }
  }, [deck, onDeckComplete]);

  /**
   * Exports the current deck to a text file
   */
  const handleExportDeck = useCallback(() => {
    if (deckCards.length === 0) {
      alert("Add some cards to your deck first!");
      return;
    }

    const lines = [];
    Object.entries(CardType).forEach(([key, value]) => {
      if (cardCountMap[value]) {
        lines.push(`${key} ${cardCountMap[value]}`);
      }
    });

    const content = lines.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-deck.txt";
    link.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  }, [deckCards.length, cardCountMap]);

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
                  type="button"
                  onClick={() => removeCard(cardType)}
                  disabled={count === 0}
                  className="btn-small"
                  aria-label={`Remove ${cardType}`}
                >
                  -
                </button>
                <span className="card-count">
                  {count} / {limit.max}
                </span>
                <button
                  type="button"
                  onClick={() => addCard(cardType)}
                  disabled={count >= limit.max || deckCards.length >= 20}
                  className="btn-small"
                  aria-label={`Add ${cardType}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="deck-actions">
        <button type="button" onClick={onBack} className="menu-btn secondary">
          Back
        </button>
        <button
          type="button"
          onClick={handleExportDeck}
          className="menu-btn secondary"
          disabled={deckCards.length === 0}
        >
          Export Deck
        </button>
        <button
          type="button"
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

DeckBuilder.propTypes = {
  onDeckComplete: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default DeckBuilder;
