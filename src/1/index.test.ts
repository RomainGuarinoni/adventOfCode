import {
  getNumberFromInput,
  getValueFromInput,
  getFinalNumberFromInputs,
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
});
