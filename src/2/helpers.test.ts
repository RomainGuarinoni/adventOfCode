import { isGameValid, isRoundValid, parseGameResult } from "./helpers";
import { GameResult, Round } from "./types";

describe("Day 2", () => {
  describe("parseGameResult", () => {
    it("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", () => {
      const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";

      const expectedGameResult: GameResult = {
        gameId: 1,
        rounds: [
          { blue: 3, red: 4, green: 0 },
          { blue: 6, red: 1, green: 2 },
          { blue: 0, red: 0, green: 2 },
        ],
      };

      expect(parseGameResult(input)).toEqual(expectedGameResult);
    });

    it("Game 15: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green", () => {
      const input = "Game 15: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

      const expectedGameResult: GameResult = {
        gameId: 15,
        rounds: [
          { blue: 1, red: 6, green: 3 },
          { blue: 2, red: 1, green: 2 },
        ],
      };

      expect(parseGameResult(input)).toEqual(expectedGameResult);
    });
  });

  describe("isRoundValid", () => {
    it("should be valid", () => {
      const round: Round = {
        blue: 14,
        red: 12,
        green: 13,
      };

      expect(isRoundValid(round)).toEqual(true);
    });

    it("should be invalid", () => {
      const round: Round = {
        blue: 14,
        red: 13,
        green: 13,
      };

      expect(isRoundValid(round)).toEqual(false);
    });
  });

  describe("isGameValid", () => {
    it("should be valid", () => {
      const game: GameResult = {
        gameId: 3,
        rounds: [
          {
            blue: 14,
            red: 12,
            green: 13,
          },
          {
            blue: 3,
            red: 2,
            green: 12,
          },
        ],
      };

      expect(isGameValid(game)).toEqual(true);
    });

    it("should be invalid", () => {
      const game: GameResult = {
        gameId: 3,
        rounds: [
          {
            blue: 14,
            red: 12,
            green: 13,
          },
          {
            blue: 3,
            red: 20,
            green: 12,
          },
        ],
      };

      expect(isGameValid(game)).toEqual(false);
    });
  });
});
