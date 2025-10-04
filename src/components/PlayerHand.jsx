import React from 'react';
import PropTypes from 'prop-types';
import CardButton from './CardButton.jsx';

function PlayerHand({ hand, onCardClick }) {
  return (
    <div className="player-hand">
      <h3>Your Hand:</h3>
      <div className="hand-cards">
        {hand.map((card, index) => (
          <CardButton
            key={index}
            card={card}
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

PlayerHand.propTypes = {
  hand: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default PlayerHand;
