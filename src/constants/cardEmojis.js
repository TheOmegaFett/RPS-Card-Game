import { CardType } from '../models/Card.js';

export const CARD_EMOJIS = {
  [CardType.ROCK]: "🪨",
  [CardType.PAPER]: "📄",
  [CardType.SCISSORS]: "✂️",
  [CardType.ROCK_DRAW]: "🪨 ➕1",
  [CardType.PAPER_DRAW]: "📄 ➕1",
  [CardType.SCISSORS_DRAW]: "✂️ ➕1",
  [CardType.BLOCK_DRAW_TWO]: "🔒 ➕2",
  [CardType.BLOCK_DISCARD]: "🔒 🚫",
  [CardType.PAPER_ROCK]: "📄🪨",
  [CardType.ROCK_SCISSORS]: "🪨✂️",
  [CardType.SCISSORS_PAPER]: "✂️📄"
};

export const CARD_LIMITS = {
  [CardType.ROCK]: { max: 4, rarity: "Common" },
  [CardType.PAPER]: { max: 4, rarity: "Common" },
  [CardType.SCISSORS]: { max: 4, rarity: "Common" },
  [CardType.ROCK_DRAW]: { max: 2, rarity: "Uncommon" },
  [CardType.PAPER_DRAW]: { max: 2, rarity: "Uncommon" },
  [CardType.SCISSORS_DRAW]: { max: 2, rarity: "Uncommon" },
  [CardType.PAPER_ROCK]: { max: 1, rarity: "Rare" },
  [CardType.ROCK_SCISSORS]: { max: 1, rarity: "Rare" },
  [CardType.SCISSORS_PAPER]: { max: 1, rarity: "Rare" },
  [CardType.BLOCK_DISCARD]: { max: 2, rarity: "Rare" },
  [CardType.BLOCK_DRAW_TWO]: { max: 1, rarity: "Legendary" }
};
