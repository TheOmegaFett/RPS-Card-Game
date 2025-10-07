import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GameController } from '@theomegafett/rps-game-logic';
import PlayerHand from './PlayerHand.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import MatchupDisplay from './MatchupDisplay.jsx';
import GameOver from './GameOver.jsx';
import DeckPile from './DeckPile.jsx';

function GameBoard({ playerDeck, onBackToMenu, difficulty, soundEnabled, volume }) {
  const [gameController] = useState(() => new GameController());
  const [hand, setHand] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [showGameOver, setShowGameOver] = useState(false);
  const [cardsClickable, setCardsClickable] = useState(true);
  const timeoutRef = useRef(null);
  const clickableTimeoutRef = useRef(null);

  useEffect(() => {
    gameController.setupGame(playerDeck);
    setHand([...gameController.player.hand]);
    setScore({
      player: gameController.roundsWon,
      ai: gameController.roundsLost
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (clickableTimeoutRef.current) {
        clearTimeout(clickableTimeoutRef.current);
      }
    };
  }, [gameController, playerDeck]);

  const handleCardClick = (cardIndex) => {
    if (!cardsClickable) return;

    setCardsClickable(false);

    const roundResult = gameController.playRound(cardIndex, difficulty);
    
    setPlayerCard(roundResult.playerCard);
    setAiCard(roundResult.aiCard);
    setResult(roundResult.result);
    
    setTimeout(() => {
      setScore({
        player: gameController.roundsWon,
        ai: gameController.roundsLost
      });
    }, 4000);

    const playerOutOfCards = gameController.player.deck.length === 0 && gameController.player.hand.length === 0;
    const aiOutOfCards = gameController.ai.deck.length === 0 && gameController.ai.hand.length === 0;

    if (playerOutOfCards || aiOutOfCards) {
      timeoutRef.current = setTimeout(() => {
        setShowGameOver(true);
      }, 4500);
      return;
    }

    gameController.player.drawCard();
    gameController.ai.drawCard();

    setHand([...gameController.player.hand]);

    clickableTimeoutRef.current = setTimeout(() => {
      setCardsClickable(true);
    }, 4500);
  };

  const handlePlayAgain = () => {
    setShowGameOver(false);
    setCardsClickable(true);
    gameController.setupGame(playerDeck);
    setHand([...gameController.player.hand]);
    setScore({
      player: gameController.roundsWon,
      ai: gameController.roundsLost
    });
    setPlayerCard(null);
    setAiCard(null);
    setResult("");
  };

  if (showGameOver) {
    return (
      <GameOver 
        playerScore={score.player}
        aiScore={score.ai}
        onPlayAgain={handlePlayAgain}
        onBackToMenu={onBackToMenu}
      />
    );
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <button type="button" className="menu-btn back-btn" onClick={onBackToMenu}>
          Back to Menu
        </button>
      </div>

      <ScoreBoard playerScore={score.player} aiScore={score.ai} />
      
      <div className="ai-section">
        <h3>AI Hand: {gameController.ai?.hand.length || 0} cards</h3>
      </div>
      
      <div className="deck-piles-container">
        <DeckPile 
          cardCount={gameController.ai?.deck.length || 0} 
          label="AI Deck"
        />
        <DeckPile 
          cardCount={gameController.player?.deck.length || 0} 
          label="Your Deck"
        />
      </div>

      <MatchupDisplay 
        playerCard={playerCard} 
        aiCard={aiCard} 
        result={result}
        soundEnabled={soundEnabled}
        volume={volume}
      />
      
      <PlayerHand hand={hand} onCardClick={handleCardClick} disabled={!cardsClickable} />
    </div>
  );
}

GameBoard.propTypes = {
  playerDeck: PropTypes.object.isRequired,
  onBackToMenu: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  soundEnabled: PropTypes.bool,
  volume: PropTypes.number,
};

export default GameBoard;
