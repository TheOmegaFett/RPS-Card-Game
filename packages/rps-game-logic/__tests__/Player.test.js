import { Player } from '../src/Player.js';
import { Deck } from '../src/Deck.js';
import { CardType } from '../src/Card.js';

describe('Player', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
    for (let i = 0; i < 10; i++) {
      deck.addCard(CardType.ROCK);
    }
  });

  test('creates player with name and deck', () => {
    const player = new Player('Test Player', deck);
    expect(player.name).toBe('Test Player');
    expect(player.deck.length).toBe(10);
    expect(player.hand.length).toBe(0);
    expect(player.score).toBe(0);
  });

  test('drawCard moves card from deck to hand', () => {
    const player = new Player('Player', deck);
    const card = player.drawCard();
    
    expect(card).not.toBeNull();
    expect(player.hand.length).toBe(1);
    expect(player.deck.length).toBe(9);
  });

  test('drawCard returns null when deck is empty', () => {
    const emptyDeck = new Deck();
    const player = new Player('Player', emptyDeck);
    const card = player.drawCard();
    
    expect(card).toBeNull();
    expect(player.hand.length).toBe(0);
  });

  test('playCard removes card from hand', () => {
    const player = new Player('Player', deck);
    player.drawCard();
    player.drawCard();
    
    const playedCard = player.playCard(0);
    
    expect(playedCard).not.toBeNull();
    expect(player.hand.length).toBe(1);
  });

  test('playCard returns null for invalid index', () => {
    const player = new Player('Player', deck);
    player.drawCard();
    
    expect(player.playCard(-1)).toBeNull();
    expect(player.playCard(5)).toBeNull();
    expect(player.hand.length).toBe(1);
  });

  test('playCard returns correct card at index', () => {
    const player = new Player('Player', deck);
    player.drawCard();
    player.drawCard();
    
    const secondCard = player.hand[1];
    const playedCard = player.playCard(1);
    
    expect(playedCard).toBe(secondCard);
    expect(player.hand.length).toBe(1);
  });
});
