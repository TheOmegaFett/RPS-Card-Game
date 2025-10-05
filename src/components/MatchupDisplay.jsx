import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';
import FlipCard from './FlipCard.jsx';

function MatchupDisplay({ playerCard, aiCard, result }) {
  const [countdown, setCountdown] = useState(null);
  const [showCards, setShowCards] = useState(false);
  const [displayedPlayerCard, setDisplayedPlayerCard] = useState(null);
  const [displayedAiCard, setDisplayedAiCard] = useState(null);

  useEffect(() => {
    if (playerCard && aiCard) {
      setShowCards(false);
      setDisplayedPlayerCard(null);
      setDisplayedAiCard(null);
      setCountdown(3);

      let timeoutId;
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null) return null;
          
          if (prev === 1) {
            clearInterval(countdownInterval);
            setCountdown("GO!");
            timeoutId = setTimeout(() => {
              setDisplayedPlayerCard(playerCard);
              setDisplayedAiCard(aiCard);
              setShowCards(true);
              setCountdown(null);
            }, 1000);
            return null;
          }
          return prev - 1;
        });
      }, 600);

      return () => {
        clearInterval(countdownInterval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [playerCard, aiCard]);

  if (!playerCard || !aiCard) return null;

  const getCardClass = (isPlayer) => {
    if (result === "Player Wins" && isPlayer) return "winner";
    if (result === "AI Wins" && !isPlayer) return "winner";
    return "";
  };

  const cardBack = (
    <div className="card-back">
      <div className="card-back-pattern">🎴</div>
    </div>
  );

  const playerCardFront = displayedPlayerCard ? (
    <div className={`card-front ${getCardClass(true)}`}>
      <div className="card-emoji">{CARD_EMOJIS[displayedPlayerCard.type]}</div>
      <div className="card-label">Player</div>
    </div>
  ) : cardBack;

  const aiCardFront = displayedAiCard ? (
    <div className={`card-front ${getCardClass(false)}`}>
      <div className="card-emoji">{CARD_EMOJIS[displayedAiCard.type]}</div>
      <div className="card-label">AI</div>
    </div>
  ) : cardBack;

  return (
    <div className="matchup-display">
      {countdown !== null && (
        <div className="countdown-overlay">
          <div className="countdown-text">{countdown}</div>
        </div>
      )}
      {showCards && <h3 className="result-text">{result}</h3>}
      <div className="matchup-cards">
        <FlipCard
          front={cardBack}
          back={playerCardFront}
          isFlipped={showCards}
          className="matchup-flip-card"
        />
        <div className="vs">VS</div>
        <FlipCard
          front={cardBack}
          back={aiCardFront}
          isFlipped={showCards}
          className="matchup-flip-card"
        />
      </div>
    </div>
  );
}

MatchupDisplay.propTypes = {
  playerCard: PropTypes.object,
  aiCard: PropTypes.object,
  result: PropTypes.string.isRequired,
};

export default MatchupDisplay;
