import React from 'react';

function ScoreBoard({ playerScore, aiScore }) {
  return (
    <div className="scoreboard">
      <h3>Score - Player: {playerScore} | AI: {aiScore}</h3>
    </div>
  );
}

export default ScoreBoard;
