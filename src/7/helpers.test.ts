import { Hand } from "./constants";
import { getHand, getTotalWinningScore, sortHand } from "./helpers";

describe("Day 7", () => {
  describe("getHand", () => {
    it("should return a FiveOfKind", () => {
      const hand = "AAAAA";

      const res: Hand = "FiveOfKind";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a FourOfKind", () => {
      const hand = "AAAAT";

      const res: Hand = "FourOfKind";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a FullHouse", () => {
      const hand = "AAATT";

      const res: Hand = "FullHouse";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a ThreeOfKind", () => {
      const hand = "AAATQ";

      const res: Hand = "ThreeOfKind";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a TwoPair", () => {
      const hand = "AATT2";

      const res: Hand = "TwoPair";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a OnePair", () => {
      const hand = "AA123";

      const res: Hand = "OnePair";

      expect(getHand(hand)).toEqual(res);
    });

    it("should return a HighCard", () => {
      const hand = "12345";

      const res: Hand = "HighCard";

      expect(getHand(hand)).toEqual(res);
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
      ];

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

      cards.sort(sortHand);

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
      ];

      const expectedCards = [
        ["12345", 483],
        ["AA123", 483],
        ["AATT2", 220],
        ["AAATQ", 483],
        ["AAATT", 28],
        ["AAAAT", 765],
        ["AAAAA", 684],
      ];

      cards.sort(sortHand);

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
      ];

      const value = 6440;

      const firstFinalNumber = getTotalWinningScore(cards);

      expect(firstFinalNumber).toEqual(value);
    });
  });
});
