import React from 'react';
import PropTypes from 'prop-types';
import SectionCard from './layout/SectionCard.jsx';

function ScoreBoard({ playerScore, aiScore }) {
  return (
    <SectionCard className="scoreboard">
      <h3>Score - Player: {playerScore} | AI: {aiScore}</h3>
    </SectionCard>
  );
}

ScoreBoard.propTypes = {
  playerScore: PropTypes.number.isRequired,
  aiScore: PropTypes.number.isRequired,
};

export default ScoreBoard;
