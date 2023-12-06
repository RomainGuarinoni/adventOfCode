import {
  convertInputsAsGames,
  getPlayerWinningNumbers,
  getTotalScratchCard,
  getWinningScore,
} from "./helpers";
import { Game } from "./types";

describe("Day 4", () => {
  describe("convertInputsAsGames", () => {
    it("should return the games", () => {
      const inputs = [
        "Card 1: 1 2 3 4 | 5 6 7 8",
        "Card 1: 2 3 4 5 | 9 8 7 6 5 ",
      ];

      const expectedGames: Game[] = [
        {
          index: 1,
          winningNumbers: [1, 2, 3, 4],
          playerNumbers: [5, 6, 7, 8],
        },
        {
          index: 2,
          winningNumbers: [2, 3, 4, 5],
          playerNumbers: [9, 8, 7, 6, 5],
        },
      ];

      expect(convertInputsAsGames(inputs)).toEqual(expectedGames);
    });
  });

  describe("getPlayerWinningNumbers", () => {
    it("should return ther winning numbers of the player", () => {
      const game: Game = {
        index: 2,
        winningNumbers: [2, 3, 4, 5],
        playerNumbers: [9, 8, 7, 6, 5, 2],
      };

      const expectedNumber = [5, 2];

      expect(getPlayerWinningNumbers(game)).toEqual(expectedNumber);
    });
  });
  describe("getWinningScore", () => {
    it("should return 0", () => {
      const winningNumbers: number[] = [];
      const expectedScore = 0;
      expect(getWinningScore(winningNumbers)).toEqual(expectedScore);
    });

    it("should return 1", () => {
      const winningNumbers: number[] = [298];
      const expectedScore = 1;
      expect(getWinningScore(winningNumbers)).toEqual(expectedScore);
    });

    it("should return 8", () => {
      const winningNumbers: number[] = [1, 2, 3, 4];
      const expectedScore = 8;
      expect(getWinningScore(winningNumbers)).toEqual(expectedScore);
    });
  });

  describe("e2e", () => {
    it("should return  30", () => {
      const inputs = [
        "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
        "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
        "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
        "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
        "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
      ];

      const games = convertInputsAsGames(inputs);

      const expectedResult = 30;

      expect(getTotalScratchCard(games)).toEqual(expectedResult);
    });
  });
});
