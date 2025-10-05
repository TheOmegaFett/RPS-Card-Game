import { getWinner } from '../src/GameController.js';
import { Card, CardType } from '../src/Card.js';

describe('getWinner', () => {
  describe('Basic Rock-Paper-Scissors Rules', () => {
    test('Rock beats Scissors', () => {
      const rock = new Card(CardType.ROCK);
      const scissors = new Card(CardType.SCISSORS);
      expect(getWinner(rock, scissors)).toBe('card1');
    });

    test('Scissors beats Paper', () => {
      const scissors = new Card(CardType.SCISSORS);
      const paper = new Card(CardType.PAPER);
      expect(getWinner(scissors, paper)).toBe('card1');
    });

    test('Paper beats Rock', () => {
      const paper = new Card(CardType.PAPER);
      const rock = new Card(CardType.ROCK);
      expect(getWinner(paper, rock)).toBe('card1');
    });

    test('Scissors loses to Rock', () => {
      const scissors = new Card(CardType.SCISSORS);
      const rock = new Card(CardType.ROCK);
      expect(getWinner(scissors, rock)).toBe('card2');
    });

    test('Paper loses to Scissors', () => {
      const paper = new Card(CardType.PAPER);
      const scissors = new Card(CardType.SCISSORS);
      expect(getWinner(paper, scissors)).toBe('card2');
    });

    test('Rock loses to Paper', () => {
      const rock = new Card(CardType.ROCK);
      const paper = new Card(CardType.PAPER);
      expect(getWinner(rock, paper)).toBe('card2');
    });
  });

  describe('Draw Scenarios', () => {
    test('Same types result in draw - Rock vs Rock', () => {
      const rock1 = new Card(CardType.ROCK);
      const rock2 = new Card(CardType.ROCK);
      expect(getWinner(rock1, rock2)).toBe('draw');
    });

    test('Same types result in draw - Paper vs Paper', () => {
      const paper1 = new Card(CardType.PAPER);
      const paper2 = new Card(CardType.PAPER);
      expect(getWinner(paper1, paper2)).toBe('draw');
    });

    test('Same types result in draw - Scissors vs Scissors', () => {
      const scissors1 = new Card(CardType.SCISSORS);
      const scissors2 = new Card(CardType.SCISSORS);
      expect(getWinner(scissors1, scissors2)).toBe('draw');
    });
  });

  describe('Hybrid Cards', () => {
    test('Paper-Rock hybrid beats Scissors (as Rock)', () => {
      const hybrid = new Card(CardType.PAPER_ROCK);
      const scissors = new Card(CardType.SCISSORS);
      expect(getWinner(hybrid, scissors)).toBe('card1');
    });

    test('Paper-Rock hybrid beats Rock (as Paper)', () => {
      const hybrid = new Card(CardType.PAPER_ROCK);
      const rock = new Card(CardType.ROCK);
      expect(getWinner(hybrid, rock)).toBe('card1');
    });

    test('Hybrid vs Hybrid can result in both winning (draw)', () => {
      const hybrid1 = new Card(CardType.PAPER_ROCK);
      const hybrid2 = new Card(CardType.SCISSORS_PAPER);
      const result = getWinner(hybrid1, hybrid2);
      expect(result).toBe('draw');
    });
  });

  describe('Block Cards', () => {
    test('Block card vs normal card returns blocked', () => {
      const block = new Card(CardType.BLOCK_DRAW_TWO);
      const rock = new Card(CardType.ROCK);
      expect(getWinner(block, rock)).toBe('blocked');
    });

    test('Normal card vs block card returns blocked', () => {
      const paper = new Card(CardType.PAPER);
      const block = new Card(CardType.BLOCK_DISCARD);
      expect(getWinner(paper, block)).toBe('blocked');
    });

    test('Block vs Block returns blocked', () => {
      const block1 = new Card(CardType.BLOCK_DRAW_TWO);
      const block2 = new Card(CardType.BLOCK_DISCARD);
      expect(getWinner(block1, block2)).toBe('blocked');
    });
  });

  describe('Edge Cases', () => {
    test('Null card returns draw', () => {
      const rock = new Card(CardType.ROCK);
      expect(getWinner(null, rock)).toBe('draw');
      expect(getWinner(rock, null)).toBe('draw');
    });

    test('Both null returns draw', () => {
      expect(getWinner(null, null)).toBe('draw');
    });
  });
});
