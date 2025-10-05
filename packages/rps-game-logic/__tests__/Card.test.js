import { Card, CardType } from '../src/Card.js';

describe('Card', () => {
  describe('Basic Cards', () => {
    test('Rock card has correct base type', () => {
      const card = new Card(CardType.ROCK);
      expect(card.type).toBe(CardType.ROCK);
      expect(card.baseTypes).toEqual([CardType.ROCK]);
    });

    test('Paper card has correct base type', () => {
      const card = new Card(CardType.PAPER);
      expect(card.type).toBe(CardType.PAPER);
      expect(card.baseTypes).toEqual([CardType.PAPER]);
    });

    test('Scissors card has correct base type', () => {
      const card = new Card(CardType.SCISSORS);
      expect(card.type).toBe(CardType.SCISSORS);
      expect(card.baseTypes).toEqual([CardType.SCISSORS]);
    });
  });

  describe('Draw Cards', () => {
    test('Rock Draw card has Rock base type', () => {
      const card = new Card(CardType.ROCK_DRAW);
      expect(card.baseTypes).toEqual([CardType.ROCK]);
    });

    test('Paper Draw card has Paper base type', () => {
      const card = new Card(CardType.PAPER_DRAW);
      expect(card.baseTypes).toEqual([CardType.PAPER]);
    });

    test('Scissors Draw card has Scissors base type', () => {
      const card = new Card(CardType.SCISSORS_DRAW);
      expect(card.baseTypes).toEqual([CardType.SCISSORS]);
    });
  });

  describe('Hybrid Cards', () => {
    test('Paper-Rock hybrid has both base types', () => {
      const card = new Card(CardType.PAPER_ROCK);
      expect(card.baseTypes).toEqual([CardType.PAPER, CardType.ROCK]);
    });

    test('Rock-Scissors hybrid has both base types', () => {
      const card = new Card(CardType.ROCK_SCISSORS);
      expect(card.baseTypes).toEqual([CardType.ROCK, CardType.SCISSORS]);
    });

    test('Scissors-Paper hybrid has both base types', () => {
      const card = new Card(CardType.SCISSORS_PAPER);
      expect(card.baseTypes).toEqual([CardType.SCISSORS, CardType.PAPER]);
    });
  });

  describe('Block Cards', () => {
    test('Block Draw Two has no base types', () => {
      const card = new Card(CardType.BLOCK_DRAW_TWO);
      expect(card.baseTypes).toEqual([]);
    });

    test('Block Discard has no base types', () => {
      const card = new Card(CardType.BLOCK_DISCARD);
      expect(card.baseTypes).toEqual([]);
    });
  });
});
