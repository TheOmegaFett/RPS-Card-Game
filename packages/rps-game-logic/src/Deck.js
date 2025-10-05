import { Card } from "./Card.js";
import { CARD_LIMITS, DECK_MIN, DECK_MAX } from "./constants.js";

/**
 * Deck class - manages a collection of cards
 */
export class Deck {
  constructor() {
    this.cards = [];
  }

  /**
   * Adds a card of the specified type to the deck
   * @param {string} cardType - The type of card to add (from CardType enum)
   * @returns {boolean} True if card was added successfully, false if deck is full or card limit reached
   */
  addCard(cardType) {
    if (this.cards.length >= DECK_MAX) {
      return false;
    }

    const cardCount = this.cards.filter((card) => card.type === cardType).length;
    const limit = CARD_LIMITS[cardType];

    if (!limit || cardCount >= limit.max) {
      return false;
    }

    this.cards.push(new Card(cardType));
    return true;
  }

  /**
   * Checks if the deck meets minimum size requirements
   * @returns {boolean} True if deck has at least DECK_MIN cards
   */
  isValid() {
    return this.cards.length >= DECK_MIN;
  }

  /**
   * Shuffles the deck using Fisher-Yates algorithm
   */
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  /**
   * Counts how many cards of a specific type are in the deck
   * @param {string} cardType - The type of card to count
   * @returns {number} The number of cards of the specified type
   */
  countCardType(cardType) {
    return this.cards.filter((card) => card.type === cardType).length;
  }

  /**
   * Creates a shallow copy of the deck
   * @returns {Deck} A new deck with the same cards
   */
  copy() {
    const newDeck = new Deck();
    newDeck.cards = [...this.cards];
    return newDeck;
  }

  /**
   * Gets the current number of cards in the deck
   * @returns {number} The number of cards in the deck
   */
  size() {
    return this.cards.length;
  }
}
