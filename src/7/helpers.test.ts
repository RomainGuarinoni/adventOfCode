import { Hand } from "./constants";
import {
  convertJokerToHand,
  getHand,
  getTotalWinningScore,
  sortHand,
} from "./helpers";

describe("Day 7", () => {
  describe("getHand", () => {
    it("should return a FiveOfKind", () => {
      const hand = "AAAAA";

      const res: Hand = "FiveOfKind";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a FourOfKind", () => {
      const hand = "AAAAT";

      const res: Hand = "FourOfKind";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a FullHouse", () => {
      const hand = "AAATT";

      const res: Hand = "FullHouse";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a ThreeOfKind", () => {
      const hand = "AAATQ";

      const res: Hand = "ThreeOfKind";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a TwoPair", () => {
      const hand = "AATT2";

      const res: Hand = "TwoPair";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a OnePair", () => {
      const hand = "AA123";

      const res: Hand = "OnePair";

      expect(getHand(hand, false)).toEqual(res);
    });

    it("should return a HighCard", () => {
      const hand = "12345";

      const res: Hand = "HighCard";

      expect(getHand(hand, false)).toEqual(res);
    });
  });

  describe("sort", () => {
    it("should sort the cards", () => {
      const cards = [
        ["32T3K", 765],
        ["T55J5", 684],
        ["KK677", 28],
        ["KTJJT", 220],
        ["QQQJA", 483],
        ["12345", 483],
        ["98765", 483],
        ["23456", 483],
      ] as [string, number][];

      const expectedCards = [
        ["12345", 483],
        ["23456", 483],
        ["98765", 483],
        ["32T3K", 765],
        ["KTJJT", 220],
        ["KK677", 28],
        ["T55J5", 684],
        ["QQQJA", 483],
      ];

      cards.sort((a, b) => sortHand(a, b, false));

      expect(cards).toEqual(expectedCards);
    });

    it("should sort the cards", () => {
      const cards = [
        ["AAAAT", 765],
        ["AAAAA", 684],
        ["AAATT", 28],
        ["AATT2", 220],
        ["AAATQ", 483],
        ["12345", 483],
        ["AA123", 483],
      ] as [string, number][];

      const expectedCards = [
        ["12345", 483],
        ["AA123", 483],
        ["AATT2", 220],
        ["AAATQ", 483],
        ["AAATT", 28],
        ["AAAAT", 765],
        ["AAAAA", 684],
      ];

      cards.sort((a, b) => sortHand(a, b, false));

      expect(cards).toEqual(expectedCards);
    });
  });

  describe("e2e first part", () => {
    it("should return 6440", () => {
      const cards = [
        ["32T3K", 765],
        ["T55J5", 684],
        ["KK677", 28],
        ["KTJJT", 220],
        ["QQQJA", 483],
      ] as [string, number][];

      const value = 6440;

      const firstFinalNumber = getTotalWinningScore(cards);

      expect(firstFinalNumber).toEqual(value);
    });
  });

  describe("convertJokerToHand", () => {
    it("should convert joker to cards", () => {
      const cards = {
        J: 2,
        2: 1,
        3: 2,
      };

      const expectedCards = {
        2: 1,
        3: 4,
      };

      expect(convertJokerToHand(cards)).toEqual(expectedCards);
    });

    it("should convert joker to cards", () => {
      const cards = {
        J: 1,
        2: 1,
        A: 2,
        3: 1,
      };

      const expectedCards = {
        2: 1,
        A: 3,
        3: 1,
      };

      expect(convertJokerToHand(cards)).toEqual(expectedCards);
    });

    it("should convert joker to cards", () => {
      const cards = {
        J: 1,
        2: 1,
        A: 1,
        3: 1,
        T: 1,
      };

      const expectedCards = {
        2: 2,
        A: 1,
        3: 1,
        T: 1,
      };

      expect(convertJokerToHand(cards)).toEqual(expectedCards);
    });
  });

  describe("e2e part 2", () => {
    it("should return 5905", () => {
      const cards = [
        ["32T3K", 765],
        ["T55J5", 684],
        ["KK677", 28],
        ["KTJJT", 220],
        ["QQQJA", 483],
      ] as [string, number][];

      const value = 5905;

      const firstFinalNumber = getTotalWinningScore(cards, true);

      expect(firstFinalNumber).toEqual(value);
    });
  });
});
