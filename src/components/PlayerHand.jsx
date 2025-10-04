import React from 'react';
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

export default PlayerHand;
