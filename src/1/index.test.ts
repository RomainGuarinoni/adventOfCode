import {
  getNumberFromInput,
  getValueFromInput,
  getFinalNumberFromInputs,
  isValidFirstDigit,
  extractNumberFromInput,
  parseInputToNumber,
  getNumberValueFromInput,
} from "./helpers";

describe("Day 1", () => {
  const input = "djf5jkdf8";

  describe("getNumberFromInput", () => {
    it("return the first number of the input", () => {
      const expectedNumber = "5";
      expect(getNumberFromInput(input, "first")).toEqual(expectedNumber);
    });

    it("return the last number of the input", () => {
      const expectedNumber = "8";
      expect(getNumberFromInput(input, "last")).toEqual(expectedNumber);
    });
  });

  describe("getValueFromInput", () => {
    it("return the number value from an input", () => {
      const expectedValue = 58;

      expect(getValueFromInput(input)).toEqual(expectedValue);
    });
  });

  describe("getFinalNumberFromInputs", () => {
    it("Return the sum of all the inputs values", () => {
      const inputs = ["sdj4ijg5", "djgos9jdf89dfjk2"];
      const expectedValue = 45 + 92;

      expect(getFinalNumberFromInputs(inputs)).toEqual(expectedValue);
    });
  });

  describe("isValidFirstDigit", () => {
    it("should return true", () => {
      expect(isValidFirstDigit("t")).toEqual(true);
    });

    it("should return false", () => {
      expect(isValidFirstDigit("a")).toEqual(false);
    });
  });

  describe("extractNumberFromInput", () => {
    it("should extract the number 4", () => {
      expect(extractNumberFromInput("four")).toStrictEqual("four");
    });

    it("should return undefined", () => {
      expect(extractNumberFromInput("foor")).toBeUndefined();
    });

    it("should return five", () => {
      expect(extractNumberFromInput("fivefour")).toStrictEqual("five");
    });
  });

  describe("parseInputToNumber", () => {
    const input = "oneighttwo4dfkjfour9";

    it("parse the input and return the numbers", () => {
      const expectedNumbers = [1, 8, 2, 4, 4, 9];

      expect(parseInputToNumber(input)).toEqual(expectedNumbers);
    });
  });

  describe("getNumberValueFromInput", () => {
    it("get a the final number from an input", () => {
      const input = "onetwo4dfkjfour9";

      const expectedValue = 19;

      expect(getNumberValueFromInput(input)).toEqual(expectedValue);
    });
  });
});
