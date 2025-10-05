/**
 * AI difficulty and card selection logic
 * Provides three difficulty modes: Easy, Normal, and Hard
 */

import { CardType } from "./Card.js";

/**
 * Outcome matrix for rock-paper-scissors
 * win = +1, draw = 0, loss = -1
 */
const OUTCOME = {
  [CardType.ROCK]: {
    [CardType.ROCK]: 0,
    [CardType.PAPER]: -1,
    [CardType.SCISSORS]: 1,
  },
  [CardType.PAPER]: {
    [CardType.ROCK]: 1,
    [CardType.PAPER]: 0,
    [CardType.SCISSORS]: -1,
  },
  [CardType.SCISSORS]: {
    [CardType.ROCK]: -1,
    [CardType.PAPER]: 1,
    [CardType.SCISSORS]: 0,
  },
};

/**
 * Calculates probability distribution for opponent's next play
 * Uses Bayesian blending of deck counts, play history, and prior
 * @param {Object} params
 * @param {Object} params.oppRemainingCounts - Cards left in opponent's deck
 * @param {Object} params.oppHistoryCounts - Cards opponent has played
 * @param {number} params.historyWeight - Weight for play history (0-1), default 0.6
 * @param {Object} params.prior - Laplace smoothing prior
 * @returns {Object} Probability distribution {rock: p, paper: p, scissors: p}
 */
function opponentTypeProbs({
  oppRemainingCounts,
  oppHistoryCounts,
  historyWeight = 0.6,
  prior = { [CardType.ROCK]: 1, [CardType.PAPER]: 1, [CardType.SCISSORS]: 1 },
}) {
  const types = [CardType.ROCK, CardType.PAPER, CardType.SCISSORS];

  const histTotal =
    types.reduce((s, t) => s + (oppHistoryCounts[t] || 0), 0) || 1;
  const histP = Object.fromEntries(
    types.map((t) => [t, (oppHistoryCounts[t] || 0) / histTotal])
  );

  const deckCounts = types.map((t) => oppRemainingCounts[t] || 0);
  const deckTotal = deckCounts.reduce((a, b) => a + b, 0) || 1;

  const blended = {};
  let sum = 0;
  for (const t of types) {
    const deckP = (oppRemainingCounts[t] || 0) / deckTotal;
    const p = (1 - historyWeight) * deckP + historyWeight * histP[t];
    blended[t] = p + (prior[t] || 0) * 1e-6;
    sum += blended[t];
  }

  for (const t of types) blended[t] /= sum || 1;

  return blended;
}

/**
 * Gets the base type for card comparison (handles special cards)
 * @param {Card} card - Card to get base type from
 * @returns {string} Base card type for probability calculations
 */
function getCardBaseType(card) {
  if (card.baseTypes.includes(CardType.ROCK)) return CardType.ROCK;
  if (card.baseTypes.includes(CardType.PAPER)) return CardType.PAPER;
  if (card.baseTypes.includes(CardType.SCISSORS)) return CardType.SCISSORS;
  return null;
}

/**
 * Chooses the best card for AI to play based on difficulty mode
 * @param {Array<Card>} aiHand - Cards in AI's hand
 * @param {Object} oppRemainingCounts - Counts of card types left in opponent's deck
 * @param {Object} oppHistoryCounts - Counts of card types opponent has played
 * @param {string} mode - Difficulty mode: 'easy' | 'normal' | 'hard'
 * @returns {number} Index of card to play from aiHand
 */
export function chooseCard(
  aiHand,
  oppRemainingCounts,
  oppHistoryCounts,
  mode = "normal"
) {
  if (!aiHand || aiHand.length === 0) {
    return 0;
  }

  if (mode === "normal") {
    return Math.floor(Math.random() * aiHand.length);
  }

  const probs = opponentTypeProbs({ oppRemainingCounts, oppHistoryCounts });

  const scores = aiHand.map((card, index) => {
    const baseType = getCardBaseType(card);
    if (!baseType || !OUTCOME[baseType]) {
      return { index, ev: 0 };
    }

    const ev =
      probs[CardType.ROCK] * OUTCOME[baseType][CardType.ROCK] +
      probs[CardType.PAPER] * OUTCOME[baseType][CardType.PAPER] +
      probs[CardType.SCISSORS] * OUTCOME[baseType][CardType.SCISSORS];

    return { index, ev };
  });

  if (mode === "easy") {
    scores.sort((a, b) => a.ev - b.ev);
    return scores[0].index;
  }

  if (mode === "hard") {
    scores.sort((a, b) => b.ev - a.ev);
    return scores[0].index;
  }

  return Math.floor(Math.random() * aiHand.length);
}

/**
 * Updates opponent play history and remaining deck counts
 * Call this after opponent plays a card
 * @param {Card} playedCard - Card that was played
 * @param {Object} oppRemainingCounts - Mutable counts object to update
 * @param {Object} oppHistoryCounts - Mutable counts object to update
 */
export function updateCounts(playedCard, oppRemainingCounts, oppHistoryCounts) {
  const baseType = getCardBaseType(playedCard);
  if (!baseType) return;

  oppHistoryCounts[baseType] = (oppHistoryCounts[baseType] || 0) + 1;
  if (oppRemainingCounts[baseType] > 0) {
    oppRemainingCounts[baseType] -= 1;
  }
}

/**
 * Initializes card counts from a deck
 * @param {Deck} deck - Deck to count
 * @returns {Object} Card type counts {rock: n, paper: n, scissors: n}
 */
export function initializeCounts(deck) {
  const counts = {
    [CardType.ROCK]: 0,
    [CardType.PAPER]: 0,
    [CardType.SCISSORS]: 0,
  };

  for (const card of deck.cards) {
    const baseType = getCardBaseType(card);
    if (baseType) {
      counts[baseType] = (counts[baseType] || 0) + 1;
    }
  }

  return counts;
}
