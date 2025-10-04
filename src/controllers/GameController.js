import { Deck } from '../models/Deck.js';
import { Player } from '../models/Player.js';
import { CardType } from '../models/Card.js';

export class GameController {
  constructor() {
    this.player = null;
    this.ai = null;
    this.currentMatch = 0;
    this.roundsWon = 0;
    this.roundsLost = 0;
  }

  setupGame(playerDeck) {
    const aiDeck = this._createAIDeck();

    playerDeck.shuffle();
    aiDeck.shuffle();

    this.player = new Player("Player", playerDeck);
    this.ai = new Player("AI", aiDeck);

    this.currentMatch = 0;
    this.roundsWon = 0;
    this.roundsLost = 0;

    for (let i = 0; i < 3; i++) {
      this.player.drawCard();
      this.ai.drawCard();
    }
  }

  playRound(playerCardIndex) {
    const playerCard = this.player.playCard(playerCardIndex);
    if (!playerCard) {
      return { result: "Invalid card", playerCard: null, aiCard: null };
    }

    if (this.ai.hand.length === 0) {
      return { result: "AI has no cards", playerCard, aiCard: null };
    }

    const aiCardIndex = Math.floor(Math.random() * this.ai.hand.length);
    const aiCard = this.ai.playCard(aiCardIndex);

    const result = this._determineWinner(playerCard, aiCard);
    this._handleCardEffects(playerCard, aiCard, result);

    return { result, playerCard, aiCard };
  }

  _determineWinner(playerCard, aiCard) {
    if (!playerCard || !aiCard) {
      return "Invalid round";
    }

    if (
      playerCard.type === CardType.BLOCK_DRAW_TWO ||
      playerCard.type === CardType.BLOCK_DISCARD ||
      aiCard.type === CardType.BLOCK_DRAW_TWO ||
      aiCard.type === CardType.BLOCK_DISCARD
    ) {
      return "Round Blocked - No Score";
    }

    const playerWins = playerCard.baseTypes.some(pType =>
      aiCard.baseTypes.some(aType =>
        (pType === CardType.ROCK && aType === CardType.SCISSORS) ||
        (pType === CardType.SCISSORS && aType === CardType.PAPER) ||
        (pType === CardType.PAPER && aType === CardType.ROCK)
      )
    );

    const aiWins = aiCard.baseTypes.some(aType =>
      playerCard.baseTypes.some(pType =>
        (aType === CardType.ROCK && pType === CardType.SCISSORS) ||
        (aType === CardType.SCISSORS && pType === CardType.PAPER) ||
        (aType === CardType.PAPER && pType === CardType.ROCK)
      )
    );

    if (playerWins && aiWins) {
      return "Draw";
    } else if (playerWins) {
      this.roundsWon += 1;
      return "Player Wins";
    } else if (aiWins) {
      this.roundsLost += 1;
      return "AI Wins";
    }
    return "Draw";
  }

  _handleCardEffects(playerCard, aiCard, result) {
    if (playerCard.type === CardType.ROCK_DRAW ||
        playerCard.type === CardType.PAPER_DRAW ||
        playerCard.type === CardType.SCISSORS_DRAW) {
      this.player.drawCard();
    } else if (playerCard.type === CardType.BLOCK_DRAW_TWO) {
      this.player.drawCard();
      this.player.drawCard();
    } else if (playerCard.type === CardType.BLOCK_DISCARD) {
      if (this.ai.hand.length > 0) {
        const discardIndex = Math.floor(Math.random() * this.ai.hand.length);
        this.ai.hand.splice(discardIndex, 1);
      }
    }

    if (aiCard.type === CardType.ROCK_DRAW ||
        aiCard.type === CardType.PAPER_DRAW ||
        aiCard.type === CardType.SCISSORS_DRAW) {
      this.ai.drawCard();
    } else if (aiCard.type === CardType.BLOCK_DRAW_TWO) {
      this.ai.drawCard();
      this.ai.drawCard();
    } else if (aiCard.type === CardType.BLOCK_DISCARD) {
      if (this.player.hand.length > 0) {
        const discardIndex = Math.floor(Math.random() * this.player.hand.length);
        this.player.hand.splice(discardIndex, 1);
      }
    }
  }

  _createAIDeck() {
    const aiDeck = new Deck();
    const cardTypes = Object.values(CardType);
    
    while (!aiDeck.isValid()) {
      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      aiDeck.addCard(cardType);
    }
    
    return aiDeck;
  }
}
