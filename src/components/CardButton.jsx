import React from 'react';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';

function CardButton({ card, onClick }) {
  return (
    <button className="card-button" onClick={onClick}>
      {CARD_EMOJIS[card.type]}
    </button>
  );
}

export default CardButton;
