import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';
import { CardType } from '@theomegafett/rps-game-logic';
import ScreenContainer from './layout/ScreenContainer.jsx';
import SectionCard from './layout/SectionCard.jsx';

function Instructions({ onBack }) {
  const sections = [
    {
      id: 'objective',
      label: 'Objective',
      content: (
        <div className="instructions-body">
          <ul className="objective-list">
            <li>Battle the AI using your deck.</li>
            <li>Play continues until one player runs out of cards.</li>
            <li>The player with the most turn victories wins.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'rules',
      label: 'Rules',
      content: (
        <div className="instructions-body">
          <ul>
            <li>Each player starts with 3 cards in hand</li>
            <li>Choose a card to play each turn</li>
            <li>Cards follow Rock-Paper-Scissors rules</li>
            <li>🔒 Lock icon: blocks scoring for the turn</li>
            <li>🚫 Discard icon: opponent discards a card</li>
            <li>➕1 icon: draw one card</li>
            <li>➕2 icon: draw two cards</li>
            <li>Block only stops points; all draw/discard effects still resolve.</li>
          </ul>
          <div className="card-matchups">
            <div className="matchup">
              <span className="card-icon">{CARD_EMOJIS[CardType.ROCK]}</span> defeats{' '}
              <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS]}</span>
            </div>
            <div className="matchup">
              <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS]}</span> defeats{' '}
              <span className="card-icon">{CARD_EMOJIS[CardType.PAPER]}</span>
            </div>
            <div className="matchup">
              <span className="card-icon">{CARD_EMOJIS[CardType.PAPER]}</span> defeats{' '}
              <span className="card-icon">{CARD_EMOJIS[CardType.ROCK]}</span>
            </div>
            <div className="matchup">Same types = <strong>Draw</strong></div>
          </div>
        </div>
      ),
    },
    {
      id: 'deck',
      label: 'Deck',
      content: (
        <div className="instructions-body">
          <p>Build a 20-card deck following rarity limits:</p>
          <div className="card-types">
            <div className="rarity-group">
              <h3>Common (Max 4 each)</h3>
              <div className="card-list">
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.ROCK]}</span>
                  <span className="card-name">Rock</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.PAPER]}</span>
                  <span className="card-name">Paper</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS]}</span>
                  <span className="card-name">Scissors</span>
                </div>
              </div>
            </div>

            <div className="rarity-group">
              <h3>Uncommon (Max 2 each)</h3>
              <div className="card-list">
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.ROCK_DRAW]}</span>
                  <span className="card-name">Rock +1 Draw</span>
                  <span className="card-effect">Draw 1 card after playing</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.PAPER_DRAW]}</span>
                  <span className="card-name">Paper +1 Draw</span>
                  <span className="card-effect">Draw 1 card after playing</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS_DRAW]}</span>
                  <span className="card-name">Scissors +1 Draw</span>
                  <span className="card-effect">Draw 1 card after playing</span>
                </div>
              </div>
            </div>

            <div className="rarity-group">
              <h3>Rare (Max 1-2 each)</h3>
              <div className="card-list">
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.PAPER_ROCK]}</span>
                  <span className="card-name">Paper-Rock Hybrid</span>
                  <span className="card-effect">Acts as both Paper & Rock</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.ROCK_SCISSORS]}</span>
                  <span className="card-name">Rock-Scissors Hybrid</span>
                  <span className="card-effect">Acts as both Rock & Scissors</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS_PAPER]}</span>
                  <span className="card-name">Scissors-Paper Hybrid</span>
                  <span className="card-effect">Acts as both Scissors & Paper</span>
                </div>
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.BLOCK_DISCARD]}</span>
                  <span className="card-name">Block & Discard</span>
                  <span className="card-effect">Blocks scoring, opponent discards 1 card</span>
                </div>
              </div>
            </div>

            <div className="rarity-group legendary">
              <h3>Legendary (Max 1)</h3>
              <div className="card-list">
                <div className="card-example">
                  <span className="card-icon">{CARD_EMOJIS[CardType.BLOCK_DRAW_TWO]}</span>
                  <span className="card-name">Block & Draw 2</span>
                  <span className="card-effect">Blocks scoring, draw 2 cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'effects',
      label: 'Effects',
      content: (
        <div className="instructions-body">
          <ul>
            <li><strong>Hybrid Cards:</strong> Can win or draw as either type</li>
            <li><strong>Block Cards:</strong> Prevent both players from scoring that turn</li>
            <li><strong>Draw Effects:</strong> Automatically trigger after playing the card</li>
            <li><strong>Discard Effects:</strong> Opponent loses a random card from their hand</li>
          </ul>
        </div>
      ),
    },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const active = sections.find((section) => section.id === activeSection) || sections[0];
  const panelClassName = active.id === 'deck'
    ? 'instructions-panel instructions-panel--scroll'
    : 'instructions-panel';

  return (
    <ScreenContainer className="instructions-screen" ariaLabel="Instructions">
      <SectionCard className="instructions-header">
        <h1>How to Play</h1>
        <p className="instructions-subtitle">
          Learn the rules, build a deck, and master special effects.
        </p>
      </SectionCard>

      <SectionCard className="instructions-tabs" as="div">
        <div className="tab-list" role="tablist" aria-label="Instruction sections">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              role="tab"
              id={`tab-${section.id}`}
              aria-selected={activeSection === section.id}
              aria-controls={`panel-${section.id}`}
              className={`tab-button ${activeSection === section.id ? 'is-active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        className={panelClassName}
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <h2 className="instructions-panel__title">{active.label}</h2>
        {active.content}
      </SectionCard>

      <SectionCard className="instructions-actions" as="div">
        <button type="button" onClick={onBack} className="menu-btn back-btn">
          Back to Menu
        </button>
      </SectionCard>
    </ScreenContainer>
  );
}

Instructions.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default Instructions;
