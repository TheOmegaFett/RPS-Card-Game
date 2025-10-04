export class Player {
  /**
   * Creates a new player instance
   * @param {string} name - The player's name
   * @param {Deck} deck - The deck to use for this player
   */
  constructor(name, deck) {
    this.name = name;
    this.deck = [...deck.cards];
    this.hand = [];
    this.score = 0;
  }

  /**
   * Draws a card from the deck and adds it to the hand
   * @returns {Card|null} The drawn card, or null if deck is empty
   */
  drawCard() {
    if (this.deck.length > 0) {
      const card = this.deck.shift();
      this.hand.push(card);
      return card;
    }
    return null;
  }

  /**
   * Plays a card from the hand at the specified index
   * @param {number} cardIndex - The index of the card in the hand to play
   * @returns {Card|null} The played card, or null if index is invalid
   */
  playCard(cardIndex) {
    if (cardIndex >= 0 && cardIndex < this.hand.length) {
      return this.hand.splice(cardIndex, 1)[0];
    }
    return null;
  }
}
