import React from 'react';
import { CARD_EMOJIS } from '../constants/cardEmojis.js';
import { CardType } from '../models/Card.js';

function Instructions({ onBack }) {
  return (
    <div className="instructions-screen">
      <h1>How to Play</h1>
      
      <section className="instructions-section">
        <h2>Objective</h2>
        <p>Battle the AI using your 20-card deck. Play continues until one player runs out of cards. The player with the most turn victories wins!</p>
      </section>

      <section className="instructions-section">
        <h2>Basic Rules</h2>
        <ul>
          <li>Each player starts with 3 cards in hand</li>
          <li>Choose a card to play each turn</li>
          <li>Cards follow Rock-Paper-Scissors rules:</li>
        </ul>
        <div className="card-matchups">
          <div className="matchup">
            <span className="card-icon">{CARD_EMOJIS[CardType.ROCK]}</span> defeats <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS]}</span>
          </div>
          <div className="matchup">
            <span className="card-icon">{CARD_EMOJIS[CardType.SCISSORS]}</span> defeats <span className="card-icon">{CARD_EMOJIS[CardType.PAPER]}</span>
          </div>
          <div className="matchup">
            <span className="card-icon">{CARD_EMOJIS[CardType.PAPER]}</span> defeats <span className="card-icon">{CARD_EMOJIS[CardType.ROCK]}</span>
          </div>
          <div className="matchup">
            Same types = <strong>Draw</strong>
          </div>
        </div>
      </section>

      <section className="instructions-section">
        <h2>Deck Building</h2>
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
      </section>

      <section className="instructions-section">
        <h2>Special Card Effects</h2>
        <ul>
          <li><strong>Hybrid Cards:</strong> Can win as either type, can also draw against either type</li>
          <li><strong>Block Cards:</strong> Prevent both players from scoring that turn</li>
          <li><strong>Draw Effects:</strong> Automatically trigger after playing the card</li>
          <li><strong>Discard Effects:</strong> Opponent loses a random card from their hand</li>
        </ul>
      </section>

      <button onClick={onBack} className="menu-btn back-btn">
        Back to Menu
      </button>
    </div>
  );
}

export default Instructions;
