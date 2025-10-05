/**
 * Card types enum - all available card types in the game
 */
export const CardType = {
  ROCK: "Rock",
  PAPER: "Paper",
  SCISSORS: "Scissors",
  ROCK_DRAW: "Rock and Draw One",
  PAPER_DRAW: "Paper and Draw One",
  SCISSORS_DRAW: "Scissors and Draw One",
  BLOCK_DRAW_TWO: "Block and Draw Two",
  BLOCK_DISCARD: "Block and Discard One",
  PAPER_ROCK: "Paper and Rock",
  ROCK_SCISSORS: "Rock and Scissors",
  SCISSORS_PAPER: "Scissors and Paper",
};

/**
 * Card class - represents a single card in the game
 */
export class Card {
  /**
   * Creates a new card instance
   * @param {string} cardType - The type of card (from CardType enum)
   */
  constructor(cardType) {
    this.type = cardType;
    this.baseTypes = this._getBaseTypes();
  }

  /**
   * Determines the base types for combat resolution
   * Hybrid cards return multiple base types, while standard cards return one
   * Block cards return an empty array as they don't participate in combat
   * @returns {Array<string>} Array of base card types for this card
   * @private
   */
  _getBaseTypes() {
    if (this.type === CardType.PAPER_ROCK) {
      return [CardType.PAPER, CardType.ROCK];
    } else if (this.type === CardType.ROCK_SCISSORS) {
      return [CardType.ROCK, CardType.SCISSORS];
    } else if (this.type === CardType.SCISSORS_PAPER) {
      return [CardType.SCISSORS, CardType.PAPER];
    } else if (this.type.includes("Rock")) {
      return [CardType.ROCK];
    } else if (this.type.includes("Paper")) {
      return [CardType.PAPER];
    } else if (this.type.includes("Scissors")) {
      return [CardType.SCISSORS];
    }
    return [];
  }
}
