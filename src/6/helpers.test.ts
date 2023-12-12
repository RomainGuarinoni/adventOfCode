import { createRace, getTotalwinningDuration } from "./helpers";
import { Race } from "./types";

describe("Day 6", () => {
  describe("createRace", () => {
    it("return a Race object", () => {
      const input = [51, 222];
      const expectedRace: Race = {
        duration: 51,
        bestDistance: 222,
      };

      expect(createRace(input)).toEqual(expectedRace);
    });
  });

  describe("getTotalwinningDuration", () => {
    it("should return 4", () => {
      const race: Race = {
        duration: 7,
        bestDistance: 9,
      };

      const expectedResult = 4;

      expect(getTotalwinningDuration(race)).toEqual(expectedResult);
    });

    it("should return 8", () => {
      const race: Race = {
        duration: 15,
        bestDistance: 40,
      };

      const expectedResult = 8;

      expect(getTotalwinningDuration(race)).toEqual(expectedResult);
    });

    it("should return 9", () => {
      const race: Race = {
        duration: 30,
        bestDistance: 200,
      };

      const expectedResult = 9;

      expect(getTotalwinningDuration(race)).toEqual(expectedResult);
    });
  });
});
