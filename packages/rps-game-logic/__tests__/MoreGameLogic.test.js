import { getWinner } from '../src/GameController.js';
import { Card, CardType } from '../src/Card.js';
import { Deck, DECK_MIN, DECK_MAX } from '../src/Deck.js';

describe('Additional Game Logic Coverage', () => {
  describe('Win scenarios', () => {
    test('rock beats scissors', () => {
      const result = getWinner(
        new Card(CardType.ROCK),
        new Card(CardType.SCISSORS)
      );
      expect(result).toBe('card1');
    });

    test('paper beats rock', () => {
      const result = getWinner(
        new Card(CardType.PAPER),
        new Card(CardType.ROCK)
      );
      expect(result).toBe('card1');
    });

    test('scissors beats paper', () => {
      const result = getWinner(
        new Card(CardType.SCISSORS),
        new Card(CardType.PAPER)
      );
      expect(result).toBe('card1');
    });
  });

  describe('Loss scenarios', () => {
    test('scissors loses to rock', () => {
      const result = getWinner(
        new Card(CardType.SCISSORS),
        new Card(CardType.ROCK)
      );
      expect(result).toBe('card2');
    });

    test('rock loses to paper', () => {
      const result = getWinner(
        new Card(CardType.ROCK),
        new Card(CardType.PAPER)
      );
      expect(result).toBe('card2');
    });

    test('paper loses to scissors', () => {
      const result = getWinner(
        new Card(CardType.PAPER),
        new Card(CardType.SCISSORS)
      );
      expect(result).toBe('card2');
    });
  });

  describe('Draw scenarios', () => {
    test('rock vs rock draws', () => {
      const result = getWinner(
        new Card(CardType.ROCK),
        new Card(CardType.ROCK)
      );
      expect(result).toBe('draw');
    });

    test('paper vs paper draws', () => {
      const result = getWinner(
        new Card(CardType.PAPER),
        new Card(CardType.PAPER)
      );
      expect(result).toBe('draw');
    });

    test('scissors vs scissors draws', () => {
      const result = getWinner(
        new Card(CardType.SCISSORS),
        new Card(CardType.SCISSORS)
      );
      expect(result).toBe('draw');
    });
  });

  describe('Special cards', () => {
    test('draw cards have correct base types', () => {
      const rockDraw = new Card(CardType.ROCK_DRAW);
      const paperDraw = new Card(CardType.PAPER_DRAW);
      const scissorsDraw = new Card(CardType.SCISSORS_DRAW);
      
      expect(rockDraw.baseTypes).toContain(CardType.ROCK);
      expect(paperDraw.baseTypes).toContain(CardType.PAPER);
      expect(scissorsDraw.baseTypes).toContain(CardType.SCISSORS);
    });

    test('both players with block cards', () => {
      const result = getWinner(
        new Card(CardType.BLOCK_DRAW_TWO),
        new Card(CardType.BLOCK_DISCARD)
      );
      expect(result).toBe('blocked');
    });
  });

  describe('Deck edge cases', () => {
    test('deck at minimum size is valid', () => {
      const deck = new Deck();
      for (let i = 0; i < DECK_MIN; i++) {
        deck.addCard(CardType.ROCK);
      }
      expect(deck.isValid()).toBe(true);
      expect(deck.size()).toBe(DECK_MIN);
    });

    test('deck at maximum size is valid', () => {
      const deck = new Deck();
      for (let i = 0; i < 10; i++) {
        deck.addCard(CardType.ROCK);
        deck.addCard(CardType.PAPER);
      }
      expect(deck.isValid()).toBe(true);
      expect(deck.size()).toBe(DECK_MAX);
    });

    test('cannot exceed deck maximum', () => {
      const deck = new Deck();
      for (let i = 0; i < DECK_MAX; i++) {
        deck.addCard(CardType.ROCK);
      }
      const result = deck.addCard(CardType.ROCK);
      expect(result).toBe(false);
      expect(deck.size()).toBe(DECK_MAX);
    });

    test('shuffle maintains deck integrity', () => {
      const deck = new Deck();
      for (let i = 0; i < 15; i++) {
        deck.addCard(CardType.ROCK);
      }
      const sizeBefore = deck.size();
      deck.shuffle();
      expect(deck.size()).toBe(sizeBefore);
    });
  });
});
