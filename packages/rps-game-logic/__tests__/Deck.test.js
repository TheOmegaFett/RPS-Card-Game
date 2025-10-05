import { Deck, DECK_MIN, DECK_MAX } from '../src/Deck.js';
import { CardType } from '../src/Card.js';

describe('Deck', () => {
  describe('Construction', () => {
    test('creates empty deck', () => {
      const deck = new Deck();
      expect(deck.size()).toBe(0);
      expect(deck.cards).toEqual([]);
    });
  });

  describe('addCard', () => {
    test('adds card successfully', () => {
      const deck = new Deck();
      const result = deck.addCard(CardType.ROCK);
      expect(result).toBe(true);
      expect(deck.size()).toBe(1);
    });

    test('respects maximum deck size', () => {
      const deck = new Deck();
      for (let i = 0; i < DECK_MAX; i++) {
        deck.addCard(CardType.ROCK);
      }
      const result = deck.addCard(CardType.ROCK);
      expect(result).toBe(false);
      expect(deck.size()).toBe(DECK_MAX);
    });

    test('respects card type limits', () => {
      const deck = new Deck();
      for (let i = 0; i < 4; i++) {
        expect(deck.addCard(CardType.ROCK)).toBe(true);
      }
      expect(deck.addCard(CardType.ROCK)).toBe(false);
    });

    test('respects legendary card limit (max 1)', () => {
      const deck = new Deck();
      expect(deck.addCard(CardType.BLOCK_DRAW_TWO)).toBe(true);
      expect(deck.addCard(CardType.BLOCK_DRAW_TWO)).toBe(false);
    });
  });

  describe('isValid', () => {
    test('empty deck is invalid', () => {
      const deck = new Deck();
      expect(deck.isValid()).toBe(false);
    });

    test('deck with 9 cards is invalid', () => {
      const deck = new Deck();
      for (let i = 0; i < 9; i++) {
        deck.addCard(CardType.ROCK);
      }
      expect(deck.isValid()).toBe(false);
    });

    test('deck with 10 cards is valid', () => {
      const deck = new Deck();
      for (let i = 0; i < DECK_MIN; i++) {
        deck.addCard(CardType.ROCK);
      }
      expect(deck.isValid()).toBe(true);
    });

    test('deck with 20 cards is valid', () => {
      const deck = new Deck();
      for (let i = 0; i < 10; i++) {
        deck.addCard(CardType.ROCK);
        deck.addCard(CardType.PAPER);
      }
      expect(deck.isValid()).toBe(true);
    });
  });

  describe('shuffle', () => {
    test('shuffle maintains deck size', () => {
      const deck = new Deck();
      for (let i = 0; i < 10; i++) {
        deck.addCard(CardType.ROCK);
      }
      deck.shuffle();
      expect(deck.size()).toBe(10);
    });
  });

  describe('countCardType', () => {
    test('counts cards correctly', () => {
      const deck = new Deck();
      deck.addCard(CardType.ROCK);
      deck.addCard(CardType.ROCK);
      deck.addCard(CardType.PAPER);
      
      expect(deck.countCardType(CardType.ROCK)).toBe(2);
      expect(deck.countCardType(CardType.PAPER)).toBe(1);
      expect(deck.countCardType(CardType.SCISSORS)).toBe(0);
    });
  });

  describe('copy', () => {
    test('creates independent copy', () => {
      const deck1 = new Deck();
      deck1.addCard(CardType.ROCK);
      
      const deck2 = deck1.copy();
      deck2.addCard(CardType.PAPER);
      
      expect(deck1.size()).toBe(1);
      expect(deck2.size()).toBe(2);
    });
  });
});
