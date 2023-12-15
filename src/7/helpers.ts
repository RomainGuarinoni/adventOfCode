import { Card, HAND_RANK, Hand, JOKER } from "./constants";

const getCardRanks = (withJoker = false): Record<Card, number> => ({
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: withJoker ? 1 : 11,
  Q: 12,
  K: 13,
  A: 14,
});

export const convertJokerToHand = (cards: Record<string, number>) => {
  if (!(JOKER in cards)) return cards;

  const nbJokers = cards[JOKER];

  delete cards[JOKER];

  const highestCard = Object.keys(cards).reduce((highest, curr) => {
    const highestValue = cards[highest];
    const currentValue = cards[curr];

    if (currentValue > highestValue) return curr;

    return highest;
  }, Object.keys(cards)[0]);

  cards[highestCard] += nbJokers;

  return cards;
};

export const getHand = (input: string, withJoker: boolean): Hand => {
  const cards: Record<string, number> = {};

  for (const card of input) {
    if (card in cards) cards[card]++;
    else cards[card] = 1;
  }

  if (withJoker) convertJokerToHand(cards);

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

export const sortHand = (
  firstHand: [string, number],
  secondHand: [string, number],
  withJoker: boolean
) => {
  const firstHandValue = HAND_RANK[getHand(firstHand[0], withJoker)];
  const secondHandValue = HAND_RANK[getHand(secondHand[0], withJoker)];

  if (firstHandValue !== secondHandValue)
    return firstHandValue - secondHandValue;

  const cardRanks = getCardRanks(withJoker);

  for (let i = 0; i < firstHand[0].length; i++) {
    const firstCardValue = cardRanks[firstHand[0][i]];
    const secondCardValue = cardRanks[secondHand[0][i]];

    if (firstCardValue !== secondCardValue)
      return firstCardValue - secondCardValue;
  }

  return 0;
};

export const getTotalWinningScore = (
  inputs: [string, number][],
  withJoker = false
) =>
  inputs
    .sort((a, b) => sortHand(a, b, withJoker))
    .reduce((acc, curr, index) => acc + (index + 1) * (curr[1] as number), 0);
