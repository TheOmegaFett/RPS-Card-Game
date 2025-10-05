/**
 * Card rarity limits - defines maximum count per deck for each card type
 */
export const CARD_LIMITS = {
  Rock: { max: 4, rarity: "Common" },
  Paper: { max: 4, rarity: "Common" },
  Scissors: { max: 4, rarity: "Common" },
  "Rock and Draw One": { max: 2, rarity: "Uncommon" },
  "Paper and Draw One": { max: 2, rarity: "Uncommon" },
  "Scissors and Draw One": { max: 2, rarity: "Uncommon" },
  "Paper and Rock": { max: 1, rarity: "Rare" },
  "Rock and Scissors": { max: 1, rarity: "Rare" },
  "Scissors and Paper": { max: 1, rarity: "Rare" },
  "Block and Discard One": { max: 2, rarity: "Rare" },
  "Block and Draw Two": { max: 1, rarity: "Legendary" },
};

/**
 * Deck constraints
 */
export const DECK_MIN = 10;
export const DECK_MAX = 20;
export const INITIAL_HAND_SIZE = 3;
