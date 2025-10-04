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
  SCISSORS_PAPER: "Scissors and Paper"
};

export class Card {
  constructor(cardType) {
    this.type = cardType;
    this.baseTypes = this._getBaseTypes();
  }

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
