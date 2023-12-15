export type Card = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "T" | "J" | "Q" | "K" | "A";

export type Hand =
  | "FiveOfKind"
  | "FourOfKind"
  | "FullHouse"
  | "ThreeOfKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

export const HAND_RANK: Record<Hand, number> = {
  HighCard: 1,
  OnePair: 2,
  TwoPair: 3,
  ThreeOfKind: 4,
  FullHouse: 5,
  FourOfKind: 6,
  FiveOfKind: 7,
};

export const JOKER: Card = "J";
