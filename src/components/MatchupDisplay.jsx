import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';
import FlipCard from './FlipCard.jsx';
import { useAudio } from '../hooks/useAudio.js';

function MatchupDisplay({ playerCard, aiCard, result, soundEnabled, volume }) {
  const { playCountdown, playGo, playCardFlip, playWin, playLoss, playDraw } = useAudio(soundEnabled, volume);
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
            playCountdown();
            setCountdown("GO!");
            setTimeout(() => playGo(), 100);
            timeoutId = setTimeout(() => {
              setDisplayedPlayerCard(playerCard);
              setDisplayedAiCard(aiCard);
              playCardFlip();
              setShowCards(true);
              setCountdown(null);
              
              setTimeout(() => {
                if (result.includes("Player Wins")) playWin();
                else if (result.includes("AI Wins")) playLoss();
                else playDraw();
              }, 700);
            }, 1000);
            return null;
          }
          playCountdown();
          return prev - 1;
        });
      }, 600);

      return () => {
        clearInterval(countdownInterval);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  soundEnabled: PropTypes.bool,
  volume: PropTypes.number,
};

export default MatchupDisplay;
