import React from 'react';
import PropTypes from 'prop-types';

function ScoreBoard({ playerScore, aiScore }) {
  return (
    <div className="scoreboard">
      <h3>Score - Player: {playerScore} | AI: {aiScore}</h3>
    </div>
  );
}

ScoreBoard.propTypes = {
  playerScore: PropTypes.number.isRequired,
  aiScore: PropTypes.number.isRequired,
};

export default ScoreBoard;
