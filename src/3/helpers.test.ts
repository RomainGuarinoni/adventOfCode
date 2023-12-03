import {
  createMatrixFromInputs,
  getNumberFromPositions,
  getNumberPositionFromLineWithStartIndex,
  getValidNumbersFromMatrix,
  isNumber,
  isNumberInContactWithSymbol,
  isSymbol,
} from "./helpers";

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

    it("it should return true with symbol", () => {
      const input = "(";

      expect(isSymbol(input)).toEqual(true);
    });
  });

  describe("isNumber", () => {
    it("it should return true with number", () => {
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

  describe("isNumberInContactWithSymbol", () => {
    it("should return true for top contact", () => {
      const matrix = [
        [".", "*", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1, 2];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for bottom contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", "*", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1, 2];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["2", "3", "*", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [0, 1];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for left contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["*", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for top left contact", () => {
      const matrix = [
        ["*", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for top right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "*"],
        [".", ".", ".", ".", ".", ".", ".", "3", "3", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [7, 8];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for bottom left contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "3", "4", ".", ".", ".", ".", ".", ".", "."],
        ["*", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [1, 2];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return true for bottom right contact", () => {
      const matrix = [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "3", "3", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "*"],
      ];

      const lineIndex = 1;

      const positions = [7, 8];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        true
      );
    });

    it("should return false", () => {
      const matrix = [
        [".", ".", ".", ".", "*", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", "*", ".", "3", "3", "3", "3"],
        [".", ".", ".", ".", "*", ".", ".", ".", ".", "."],
      ];

      const lineIndex = 1;

      const positions = [6, 7, 8];

      expect(isNumberInContactWithSymbol(matrix, lineIndex, positions)).toEqual(
        false
      );
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
});
