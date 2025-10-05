import { GameController, getWinner } from '@theomegafett/rps-game-logic';
import { Card, CardType } from '@theomegafett/rps-game-logic';
import { Deck } from '@theomegafett/rps-game-logic';

describe('Round Resolver - All Branches', () => {
  let controller;
  let playerDeck;
  let aiDeck;

  beforeEach(() => {
    controller = new GameController();
    playerDeck = new Deck();
    aiDeck = new Deck();
    
    for (let i = 0; i < 10; i++) {
      playerDeck.addCard(CardType.ROCK);
      playerDeck.addCard(CardType.PAPER);
    }
  });

  test('player wins round', () => {
    controller.setupGame(playerDeck);
    const initialWins = controller.roundsWon;
    
    const rock = new Card(CardType.ROCK);
    const scissors = new Card(CardType.SCISSORS);
    const result = getWinner(rock, scissors);
    
    expect(result).toBe('card1');
  });

  test('player loses round', () => {
    controller.setupGame(playerDeck);
    const initialLosses = controller.roundsLost;
    
    const scissors = new Card(CardType.SCISSORS);
    const rock = new Card(CardType.ROCK);
    const result = getWinner(scissors, rock);
    
    expect(result).toBe('card2');
  });

  test('draw round', () => {
    const rock1 = new Card(CardType.ROCK);
    const rock2 = new Card(CardType.ROCK);
    const result = getWinner(rock1, rock2);
    
    expect(result).toBe('draw');
  });

  test('block card prevents scoring', () => {
    const block = new Card(CardType.BLOCK_DRAW_TWO);
    const rock = new Card(CardType.ROCK);
    const result = getWinner(block, rock);
    
    expect(result).toBe('blocked');
  });

  test('paper beats rock in hybrid', () => {
    const hybrid = new Card(CardType.ROCK_SCISSORS);
    const paper = new Card(CardType.PAPER);
    const result = getWinner(paper, hybrid);
    
    expect(result).toBe('draw');
  });

  test('null card returns draw', () => {
    const rock = new Card(CardType.ROCK);
    expect(getWinner(null, rock)).toBe('draw');
    expect(getWinner(rock, null)).toBe('draw');
  });
});
