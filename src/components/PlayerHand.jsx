import React from 'react';
import PropTypes from 'prop-types';
import CardButton from './CardButton.jsx';
import SectionCard from './layout/SectionCard.jsx';

function PlayerHand({ hand, onCardClick, disabled }) {
  return (
    <SectionCard className="player-hand">
      <h3>Your Hand:</h3>
      <div className="hand-cards">
        {hand.map((card, index) => (
          <CardButton
            key={index}
            card={card}
            onClick={() => onCardClick(index)}
            disabled={disabled}
          />
        ))}
      </div>
    </SectionCard>
  );
}

PlayerHand.propTypes = {
  hand: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default PlayerHand;
