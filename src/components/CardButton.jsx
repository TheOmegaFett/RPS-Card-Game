import React from 'react';
import PropTypes from 'prop-types';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';

function CardButton({ card, onClick, disabled }) {
  return (
    <button 
      type="button" 
      className="card-button" 
      onClick={onClick}
      disabled={disabled}
    >
      {CARD_EMOJIS[card.type]}
    </button>
  );
}

CardButton.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default CardButton;
