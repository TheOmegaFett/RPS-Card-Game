import React, { useState, useEffect } from 'react';
import { GameController } from '../controllers/GameController.js';
import PlayerHand from './PlayerHand.jsx';
import ScoreBoard from './ScoreBoard.jsx';
import MatchupDisplay from './MatchupDisplay.jsx';
import GameOver from './GameOver.jsx';

function GameBoard({ playerDeck, onBackToMenu }) {
  const [gameController] = useState(() => new GameController());
  const [hand, setHand] = useState([]);
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    gameController.setupGame(playerDeck);
    setHand([...gameController.player.hand]);
    setScore({
      player: gameController.roundsWon,
      ai: gameController.roundsLost
    });
  }, [gameController, playerDeck]);

  const handleCardClick = (cardIndex) => {
    const roundResult = gameController.playRound(cardIndex);
    
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
      setTimeout(() => {
        setShowGameOver(true);
      }, 500);
      return;
    }

    if (gameController.currentMatch < 5) {
      gameController.player.drawCard();
      gameController.ai.drawCard();
    }

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
      <button className="menu-btn back-btn" onClick={onBackToMenu}>
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

export default GameBoard;
