import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GameController } from '@theomegafett/rps-game-logic';
import PlayerHand from './PlayerHand.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import MatchupDisplay from './MatchupDisplay.jsx';
import GameOver from './GameOver.jsx';

function GameBoard({ playerDeck, onBackToMenu, difficulty }) {
  const [gameController] = useState(() => new GameController());
  const [hand, setHand] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [showGameOver, setShowGameOver] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    gameController.setupGame(playerDeck);
    setHand([...gameController.player.hand]);
    setScore({
      player: gameController.roundsWon,
      ai: gameController.roundsLost
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const timeout = timeoutRef.current;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [gameController, playerDeck]);

  const handleCardClick = (cardIndex) => {
    const roundResult = gameController.playRound(cardIndex, difficulty);
    
    setPlayerCard(roundResult.playerCard);
    setAiCard(roundResult.aiCard);
    setResult(roundResult.result);
    setScore({
      player: gameController.roundsWon,
      ai: gameController.roundsLost
    });

    const playerOutOfCards = gameController.player.deck.length === 0 && gameController.player.hand.length === 0;
    const aiOutOfCards = gameController.ai.deck.length === 0 && gameController.ai.hand.length === 0;

    if (playerOutOfCards || aiOutOfCards) {
      timeoutRef.current = setTimeout(() => {
        setShowGameOver(true);
      }, 500);
      return;
    }

    gameController.player.drawCard();
    gameController.ai.drawCard();

    setHand([...gameController.player.hand]);
  };

  const handlePlayAgain = () => {
    setShowGameOver(false);
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
      <button type="button" className="menu-btn back-btn" onClick={onBackToMenu}>
        Back to Menu
      </button>
      
      <div className="ai-section">
        <h3>AI Hand: {gameController.ai?.hand.length || 0} cards</h3>
      </div>
      
      <ScoreBoard playerScore={score.player} aiScore={score.ai} />
      <MatchupDisplay playerCard={playerCard} aiCard={aiCard} result={result} />
      
      <PlayerHand hand={hand} onCardClick={handleCardClick} />
    </div>
  );
}

GameBoard.propTypes = {
  playerDeck: PropTypes.object.isRequired,
  onBackToMenu: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default GameBoard;
