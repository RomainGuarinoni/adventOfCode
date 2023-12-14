export type Card = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "T" | "J" | "Q" | "K" | "A";

export type Hand =
  | "FiveOfKind"
  | "FourOfKind"
  | "FullHouse"
  | "ThreeOfKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

export const CARD_RANKS: Record<Card, number> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  T: 9,
  J: 10,
  Q: 11,
  K: 12,
  A: 13,
};

export const HAND_RANK: Record<Hand, number> = {
  HighCard: 1,
  OnePair: 2,
  TwoPair: 3,
  ThreeOfKind: 4,
  FullHouse: 5,
  FourOfKind: 6,
  FiveOfKind: 7,
};
