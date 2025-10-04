import React from 'react';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';

function MatchupDisplay({ playerCard, aiCard, result }) {
  if (!playerCard || !aiCard) return null;

  const getCardClass = (isPlayer) => {
    if (result === "Player Wins" && isPlayer) return "card-display winner";
    if (result === "AI Wins" && !isPlayer) return "card-display winner";
    return "card-display";
  };

  return (
    <div className="matchup-display">
      <h3>{result}</h3>
      <div className="matchup-cards">
        <div className={getCardClass(true)}>
          <div className="card-emoji">{CARD_EMOJIS[playerCard.type]}</div>
          <div className="card-label">Player</div>
        </div>
        <div className="vs">VS</div>
        <div className={getCardClass(false)}>
          <div className="card-emoji">{CARD_EMOJIS[aiCard.type]}</div>
          <div className="card-label">AI</div>
        </div>
      </div>
    </div>
  );
}

export default MatchupDisplay;
