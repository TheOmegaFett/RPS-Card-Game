export class Player {
  constructor(name, deck) {
    this.name = name;
    this.deck = [...deck.cards];
    this.hand = [];
    this.score = 0;
  }

  drawCard() {
    if (this.deck.length > 0) {
      const card = this.deck.shift();
      this.hand.push(card);
      return card;
    }
    return null;
  }

  playCard(cardIndex) {
    if (cardIndex >= 0 && cardIndex < this.hand.length) {
      return this.hand.splice(cardIndex, 1)[0];
    }
    return null;
  }
}
