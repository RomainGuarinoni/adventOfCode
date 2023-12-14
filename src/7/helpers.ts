import { CARD_RANKS, HAND_RANK, Hand } from "./constants";

export const getHand = (input: string): Hand => {
  const cards: Record<string, number> = {};

  for (const card of input) {
    if (card in cards) cards[card]++;
    else cards[card] = 1;
  }

  const uniqueCards = Object.keys(cards);

  switch (uniqueCards.length) {
    case 1:
      return "FiveOfKind";
    case 2:
      if (cards[uniqueCards[0]] === 3 || cards[uniqueCards[0]] === 2)
        return "FullHouse";
      return "FourOfKind";
    case 3:
      if (cards[uniqueCards[0]] === 2 || cards[uniqueCards[1]] === 2)
        return "TwoPair";
      return "ThreeOfKind";
    case 4:
      return "OnePair";
    default:
      return "HighCard";
  }
};

export const sortHand = (firstHand: string[], secondHand: string[]) => {
  const firstHandValue = HAND_RANK[getHand(firstHand[0])];
  const secondHandValue = HAND_RANK[getHand(secondHand[0])];

  if (firstHandValue !== secondHandValue)
    return firstHandValue - secondHandValue;

  for (let i = 0; i < firstHand[0].length; i++) {
    const firstCardValue = CARD_RANKS[firstHand[0][i]];
    const secondCardValue = CARD_RANKS[secondHand[0][i]];

    if (firstCardValue !== secondCardValue)
      return firstCardValue - secondCardValue;
  }

  return 0;
};

export const getTotalWinningScore = (inputs: (string | number)[][]) =>
  inputs
    .sort(sortHand)
    .reduce((acc, curr, index) => acc + (index + 1) * (curr[1] as number), 0);
