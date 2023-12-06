import {
  createMatrixFromInputs,
  getNumberFromPositions,
  getNumberPositionFromLineWithStartIndex,
  getValidNumbersFromMatrix,
  isNumber,
  isItemInContactToPredicate,
  isSymbol,
  findFullNumberFromPosition,
  getContactPositionByLine,
  findAllGearRatios,
} from "./helpers";
import { Position } from "./types";

describe("Day 3", () => {
  describe("isSymbol", () => {
    it("it should return false with number", () => {
      const input = "3";

      expect(isSymbol(input)).toEqual(false);
    });

    it("it should return false with .", () => {
      const input = ".";

      expect(isSymbol(input)).toEqual(false);
    });

    it("it should return position with symbol", () => {
      const input = "(";

      expect(isSymbol(input)).toEqual(true);
    });
  });

  describe("isNumber", () => {
    it("it should return position with number", () => {
      const input = "3";

      expect(isNumber(input)).toEqual(true);
    });

    it("it should return false with .", () => {
      const input = ".";

      expect(isNumber(input)).toEqual(false);
    });
  });

  describe("createMatrixFromInputs", () => {
    it("should create a matrix", () => {
      const input = ["234...@..6", "2.4.*..*.6"];

      const expectedValue = [
        ["2", "3", "4", ".", ".", ".", "@", ".", ".", "6"],
        ["2", ".", "4", ".", "*", ".", ".", "*", ".", "6"],
      ];

      expect(createMatrixFromInputs(input)).toEqual(expectedValue);
    });
  });

  describe("getNumberPositionFromLineWithStartIndex", () => {
    const input = [".", "1", "2", "3", "*", "."];

    it("should return the positions of thenumber", () => {
      const expectedPositions = [1, 2, 3];

      expect(getNumberPositionFromLineWithStartIndex(input, 1)).toEqual(
        expectedPositions
      );
    });

    it("should return undefined", () => {
      const expectedPositions = undefined;

      expect(getNumberPositionFromLineWithStartIndex(input, 0)).toEqual(
        expectedPositions
      );
    });
  });

  describe("isItemInContactToPredicate", () => {
    it("should return position for top contact", () => {
      const matrix = [
        [".", "*", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1, 2];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[0, 1]]);
    });

    it("should return position for bottom contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", "*", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1, 2];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[2, 1]]);
    });

    it("should return position for right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "*", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[1, 2]]);
    });

    it("should return position for left contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["*", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[1, 0]]);
    });

    it("should return position for top left contact", () => {
      const matrix = [
        ["*", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[0, 0]]);
    });

    it("should return position for top right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "*"],
        [".", ".", ".", ".", ".", ".", ".", "3", "3", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [7, 8];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[0, 9]]);
    });

    it("should return position for bottom left contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        ["*", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[2, 0]]);
    });

    it("should return position for bottom right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "3", "3", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "*"],
      ];

      const lineIndex = 1;

      const positions = [7, 8];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([[2, 9]]);
    });

    it("should return empty array", () => {
      const matrix = [
        [".", ".", ".", ".", "*", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "*", ".", "3", "3", "3", "3"],
        [".", ".", ".", ".", "*", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [6, 7, 8];

      expect(
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
      ).toEqual([]);
    });

    it("should return all the positions array", () => {
      const matrix = [
        [".", ".", ".", ".", "*", "*", ".", ".", ".", "."],
        [".", ".", ".", "*", "4", "5", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", "*", "*", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [4, 5];

      const expectedPositions: Position[] = [
        [0, 4],
        [0, 5],
        [2, 5],
        [1, 3],
        [2, 6],
      ];

      const result = isItemInContactToPredicate(
        matrix,
        lineIndex,
        positions,
        isSymbol
      );

      expect(result).toEqual(expectedPositions);
    });

    it("should return all the positions aroundthe gear", () => {
      const matrix = [
        ["1", "1", "1"],
        ["1", "*", "1"],
        ["1", "1", "1"],
      ];

      const expectedPositions: Position[] = [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 0],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];

      const lineIndex = 1;

      const positions = [1];

      const contactPositions = isItemInContactToPredicate(
        matrix,
        lineIndex,
        positions,
        isNumber
      );

      const contactPositionByLines = getContactPositionByLine(contactPositions);

      expect(contactPositionByLines).toEqual({
        0: [0],
        1: [0, 2],
        2: [0],
      });
    });
  });

  describe("getNumberFromPositions", () => {
    it("should return 245", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "2", "4", "5", ".", ".", ".", ".", "3", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2, 3];

      expect(getNumberFromPositions(matrix, lineIndex, positions)).toEqual(245);
    });
  });

  describe("getValidNumbersFromMatrix", () => {
    it("should return all the number surrounded with a symbol", () => {
      const matrix = [
        [".", ".", "2", "3", "*", ".", "4", ".", ".", "."],
        [".", "2", "4", "5", ".", "9", ".", "*", "3", "."],
        ["1", "4", ".", ".", ".", ".", ".", ".", "3", "6"],
      ];

      const expectedNumbers = [23, 4, 245, 9, 3, 36];

      expect(getValidNumbersFromMatrix(matrix)).toEqual(expectedNumbers);
    });
  });

  describe("end to end test", () => {
    it("should return a sum of inputs", () => {
      const inputs = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ];

      const matrix = createMatrixFromInputs(inputs);

      const numbers = getValidNumbersFromMatrix(matrix);

      const sum = numbers.reduce((acc, curr) => acc + curr, 0);

      expect(sum).toEqual(4361);
    });

    it("should return 0", () => {
      const inputs = [
        "467..114..",
        ".........*",
        "*.35.*****",
        ".....*****",
        "617.**....",
        ".......58.",
        "*.592.....",
        "*.....755.",
        "..........",
        ".664.598..",
      ];

      const matrix = createMatrixFromInputs(inputs);

      const numbers = getValidNumbersFromMatrix(matrix);

      const sum = numbers.reduce((acc, curr) => acc + curr, 0);

      expect(sum).toEqual(0);
    });
  });

  describe("findFullNumberFromPosition", () => {
    it("should return the full number", () => {
      const matrix = [
        [".", ".", ".", ".", "*", "*", ".", ".", ".", "."],
        [".", ".", ".", "*", "4", "5", "4", "3", ".", "."],
        [".", ".", ".", ".", ".", "*", "*", ".", ".", "."],
      ];

      const expectedNumber = 4543;

      expect(findFullNumberFromPosition(matrix, [1, 5])).toEqual(
        expectedNumber
      );
    });

    it("should return the full number", () => {
      const matrix = [
        [".", ".", "."],
        ["2", "4", "6"],
        [".", ".", "."],
      ];

      const expectedNumber = 246;

      expect(findFullNumberFromPosition(matrix, [1, 1])).toEqual(
        expectedNumber
      );
    });
  });

  describe("getContactPositionByLine", () => {
    it("should filter the contact positions", () => {
      const contactPositions: Position[] = [
        [0, 3],
        [0, 4],
        [0, 1],
        [0, 10],
        [1, 5],
        [1, 6],
        [2, 8],
        [2, 4],
        [0, 20],
      ];

      const expectedContacts = {
        0: [1, 3, 10, 20],
        1: [5],
        2: [4, 8],
      };

      expect(getContactPositionByLine(contactPositions)).toEqual(
        expectedContacts
      );
    });
  });

  describe("e2e findAllGearRatios", () => {
    it("should return the gear ratio 1", () => {
      const input = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ];

      const matrix = createMatrixFromInputs(input);

      const expectedValue = 467835;

      expect(findAllGearRatios(matrix)).toEqual(expectedValue);
    });

    it("should return the gear ratio 2", () => {
      const input = [
        "..2.2..*..",
        "...*..2.2.",
        "......2.*.",
        "..2...*...",
        "..2*..2...",
        ".2.2......",
        "..*..2....",
        ".2.22*2...",
        "2.2..2....",
        ".*2...2*2.",
      ];

      const gearValue = 4;
      const nbGear = 4;

      const matrix = createMatrixFromInputs(input);

      const expectedValue = gearValue * nbGear;

      expect(findAllGearRatios(matrix)).toEqual(expectedValue);
    });
  });
});
