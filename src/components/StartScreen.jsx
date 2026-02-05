import React from 'react';
import PropTypes from 'prop-types';
import ScreenContainer from './layout/ScreenContainer.jsx';
import SectionCard from './layout/SectionCard.jsx';

function StartScreen({ onNewGame, onBuildDeck, onImportDeck, onInstructions }) {
  return (
    <ScreenContainer className="start-screen" ariaLabel="Start menu">
      <SectionCard className="start-screen-card">
        <h1 className="start-screen__title">Rock Paper Scissors Card Game</h1>
        <div className="menu-buttons">
          <button type="button" onClick={onNewGame} className="menu-btn">
            New Game (Default Deck)
          </button>
          <button type="button" onClick={onBuildDeck} className="menu-btn">
            Build Custom Deck
          </button>
          <button type="button" onClick={onImportDeck} className="menu-btn">
            Import Deck
          </button>
          <button type="button" onClick={onInstructions} className="menu-btn">
            Instructions
          </button>
        </div>
      </SectionCard>
    </ScreenContainer>
  );
}

StartScreen.propTypes = {
  onNewGame: PropTypes.func.isRequired,
  onBuildDeck: PropTypes.func.isRequired,
  onImportDeck: PropTypes.func.isRequired,
  onInstructions: PropTypes.func.isRequired,
};

export default StartScreen;
