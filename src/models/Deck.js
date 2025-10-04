import { Card } from './Card.js';
import { CARD_LIMITS } from '../constants/cardEmojis.js';

export class Deck {
  constructor() {
    this.cards = [];
  }

  addCard(cardType) {
    if (this.cards.length >= 20) {
      return false;
    }

    const cardCount = this.cards.filter(card => card.type === cardType).length;
    const limit = CARD_LIMITS[cardType];
    
    if (!limit || cardCount >= limit.max) {
      return false;
    }

    this.cards.push(new Card(cardType));
    return true;
  }

  isValid() {
    return this.cards.length >= 10;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  countCardType(cardType) {
    return this.cards.filter(card => card.type === cardType).length;
  }

  copy() {
    const newDeck = new Deck();
    newDeck.cards = [...this.cards];
    return newDeck;
  }

  size() {
    return this.cards.length;
  }
}
