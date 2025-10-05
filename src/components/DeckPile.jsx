import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays a face-down pile of cards representing the draw deck
 * @param {Object} props
 * @param {number} props.cardCount - Number of cards remaining in deck
 * @param {string} props.label - Label for the deck (e.g., "Your Deck", "AI Deck")
 */
function DeckPile({ cardCount, label }) {
  return (
    <div className="deck-pile">
      <div className="deck-stack">
        {cardCount > 0 && (
          <>
            <div className="deck-card deck-card-3"></div>
            <div className="deck-card deck-card-2"></div>
            <div className="deck-card deck-card-1">
              <div className="deck-card-pattern">🎴</div>
            </div>
          </>
        )}
        {cardCount === 0 && (
          <div className="deck-empty">Empty</div>
        )}
      </div>
      <div className="deck-count">
        {label}: {cardCount} {cardCount === 1 ? 'card' : 'cards'}
      </div>
    </div>
  );
}

DeckPile.propTypes = {
  cardCount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default React.memo(DeckPile);
