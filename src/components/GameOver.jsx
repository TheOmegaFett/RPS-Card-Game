import React from 'react';

function GameOver({ playerScore, aiScore, onPlayAgain, onBackToMenu }) {
  const getResult = () => {
    if (playerScore > aiScore) {
      return { message: "You Win!", emoji: "🎉", color: "#4caf50" };
    } else if (aiScore > playerScore) {
      return { message: "AI Wins!", emoji: "😢", color: "#f44336" };
    } else {
      return { message: "It's a Draw!", emoji: "🤝", color: "#ff9800" };
    }
  };

  const result = getResult();

  return (
    <div className="game-over-overlay">
      <div className="game-over-card" style={{ borderColor: result.color }}>
        <div className="game-over-emoji">{result.emoji}</div>
        <h1 className="game-over-title" style={{ color: result.color }}>
          {result.message}
        </h1>
        <div className="game-over-score">
          <h2>Final Score</h2>
          <div className="score-display">
            <div className="score-item">
              <span className="score-label">Player</span>
              <span className="score-value">{playerScore}</span>
            </div>
            <div className="score-divider">-</div>
            <div className="score-item">
              <span className="score-label">AI</span>
              <span className="score-value">{aiScore}</span>
            </div>
          </div>
        </div>
        <div className="game-over-actions">
          <button className="menu-btn" onClick={onPlayAgain}>
            Play Again
          </button>
          <button className="menu-btn secondary" onClick={onBackToMenu}>
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOver;
