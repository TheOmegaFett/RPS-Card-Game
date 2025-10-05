import { chooseCard, updateCounts, initializeCounts } from '../src/ai.js';
import { Card, CardType } from '../src/Card.js';
import { Deck } from '../src/Deck.js';

describe('AI Module', () => {
  describe('chooseCard', () => {
    const createHand = () => [
      new Card(CardType.ROCK),
      new Card(CardType.PAPER),
      new Card(CardType.SCISSORS),
    ];

    test('Normal mode returns random valid index', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 5, [CardType.PAPER]: 5, [CardType.SCISSORS]: 5 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'normal');
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(aiHand.length);
    });

    test('Hard mode prefers paper when opponent has many rocks', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 8, [CardType.PAPER]: 1, [CardType.SCISSORS]: 1 };
      const oppHistory = { [CardType.ROCK]: 2, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'hard');
      expect(aiHand[index].type).toBe(CardType.PAPER);
    });

    test('Hard mode prefers scissors when opponent has many papers', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 1, [CardType.PAPER]: 8, [CardType.SCISSORS]: 1 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 2, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'hard');
      expect(aiHand[index].type).toBe(CardType.SCISSORS);
    });

    test('Hard mode prefers rock when opponent has many scissors', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 1, [CardType.PAPER]: 1, [CardType.SCISSORS]: 8 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 0, [CardType.SCISSORS]: 2 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'hard');
      expect(aiHand[index].type).toBe(CardType.ROCK);
    });

    test('Easy mode chooses worst option (loses)', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 8, [CardType.PAPER]: 1, [CardType.SCISSORS]: 1 };
      const oppHistory = { [CardType.ROCK]: 2, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'easy');
      expect(aiHand[index].type).toBe(CardType.SCISSORS);
    });

    test('Returns valid index for empty history', () => {
      const aiHand = createHand();
      const oppRemaining = { [CardType.ROCK]: 5, [CardType.PAPER]: 5, [CardType.SCISSORS]: 5 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'hard');
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(aiHand.length);
    });

    test('Handles empty hand gracefully', () => {
      const aiHand = [];
      const oppRemaining = { [CardType.ROCK]: 5, [CardType.PAPER]: 5, [CardType.SCISSORS]: 5 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      const index = chooseCard(aiHand, oppRemaining, oppHistory, 'hard');
      expect(index).toBe(0);
    });
  });

  describe('updateCounts', () => {
    test('Updates history and remaining counts correctly', () => {
      const card = new Card(CardType.ROCK);
      const oppRemaining = { [CardType.ROCK]: 5, [CardType.PAPER]: 5, [CardType.SCISSORS]: 5 };
      const oppHistory = { [CardType.ROCK]: 0, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      updateCounts(card, oppRemaining, oppHistory);

      expect(oppHistory[CardType.ROCK]).toBe(1);
      expect(oppRemaining[CardType.ROCK]).toBe(4);
    });

    test('Does not go below zero for remaining counts', () => {
      const card = new Card(CardType.ROCK);
      const oppRemaining = { [CardType.ROCK]: 0, [CardType.PAPER]: 5, [CardType.SCISSORS]: 5 };
      const oppHistory = { [CardType.ROCK]: 5, [CardType.PAPER]: 0, [CardType.SCISSORS]: 0 };

      updateCounts(card, oppRemaining, oppHistory);

      expect(oppHistory[CardType.ROCK]).toBe(6);
      expect(oppRemaining[CardType.ROCK]).toBe(0);
    });
  });

  describe('initializeCounts', () => {
    test('Counts all basic cards correctly', () => {
      const deck = new Deck();
      deck.addCard(CardType.ROCK);
      deck.addCard(CardType.ROCK);
      deck.addCard(CardType.PAPER);
      deck.addCard(CardType.SCISSORS);

      const counts = initializeCounts(deck);

      expect(counts[CardType.ROCK]).toBe(2);
      expect(counts[CardType.PAPER]).toBe(1);
      expect(counts[CardType.SCISSORS]).toBe(1);
    });

    test('Counts draw cards based on their base type', () => {
      const deck = new Deck();
      deck.addCard(CardType.ROCK_DRAW);
      deck.addCard(CardType.PAPER_DRAW);
      deck.addCard(CardType.SCISSORS_DRAW);

      const counts = initializeCounts(deck);

      expect(counts[CardType.ROCK]).toBe(1);
      expect(counts[CardType.PAPER]).toBe(1);
      expect(counts[CardType.SCISSORS]).toBe(1);
    });
  });
});
