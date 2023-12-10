import {
  createConvertionMap,
  findConvertedNumber,
  getConvertedNumbers,
  getConvertedNumbersThroughConvertionMaps,
  getRangeFromKey,
} from "./helpers";
import { ConvertionMap } from "./types";

describe("Day 5", () => {
  describe("createConvertionMap", () => {
    it("should create a convertion map", () => {
      const inputs = [
        [20, 15, 5],
        [5, 30, 10],
      ];

      const expectedConvertionMap: ConvertionMap = {
        "15-19": 5,
        "30-39": -25,
      };
      expect(createConvertionMap(inputs)).toEqual(expectedConvertionMap);
    });
  });

  describe("getRangeFromKey", () => {
    it("should return the range from a key input", () => {
      const key = "10-50";
      const expectedRange = [10, 50];

      expect(getRangeFromKey(key)).toEqual(expectedRange);
    });
  });

  describe("findConvertedNumber", () => {
    const convertionMap: ConvertionMap = {
      "15-19": 5,
      "30-39": -25,
    };

    it("number is start of range", () => {
      const number = 15;

      const expectedNumber = 20;

      expect(findConvertedNumber(number, convertionMap)).toEqual(
        expectedNumber
      );
    });

    it("number is end of range", () => {
      const number = 39;

      const expectedNumber = 14;

      expect(findConvertedNumber(number, convertionMap)).toEqual(
        expectedNumber
      );
    });

    it("number is in middle of range", () => {
      const number = 17;

      const expectedNumber = 22;

      expect(findConvertedNumber(number, convertionMap)).toEqual(
        expectedNumber
      );
    });

    it("number is outside low map", () => {
      const number = 14;

      const expectedNumber = 14;

      expect(findConvertedNumber(number, convertionMap)).toEqual(
        expectedNumber
      );
    });

    it("number is outside high map", () => {
      const number = 40;

      const expectedNumber = 40;

      expect(findConvertedNumber(number, convertionMap)).toEqual(
        expectedNumber
      );
    });
  });

  describe("getConvertedNumbers", () => {
    it("should return the colnverted numbers in order", () => {
      const convertionMap: ConvertionMap = {
        "15-19": 5,
        "30-39": -25,
      };

      const numbers = [15, 39, 17, 14, 40];

      const output = [20, 14, 22, 14, 40];
      expect(getConvertedNumbers(numbers, convertionMap)).toEqual(output);
    });
  });

  describe("getConvertedNumbers", () => {
    it("should return the output numbers with multiple convertions", () => {
      const convertionMapOne: ConvertionMap = {
        "15-19": 5,
        "30-39": -25,
      };

      const convertionMapTwo: ConvertionMap = {
        "20-22": 10,
        "12-20": -5,
      };

      const numbers = [15, 39, 17, 14, 40];

      const output = [30, 9, 32, 9, 40];

      expect(
        getConvertedNumbersThroughConvertionMaps(numbers, [
          convertionMapOne,
          convertionMapTwo,
        ])
      ).toEqual(output);
    });
  });

  describe("e2e test", () => {
    it("should return 35", () => {
      const seeds = [79, 14, 55, 13];

      const seedToSoil = [
        [50, 98, 2],
        [52, 50, 48],
      ];

      const soilToFertilizer = [
        [0, 15, 37],
        [37, 52, 2],
        [39, 0, 15],
      ];

      const fertilizerToWater = [
        [49, 53, 8],
        [0, 11, 42],
        [42, 0, 7],
        [57, 7, 4],
      ];

      const waterToLight = [
        [88, 18, 7],
        [18, 25, 70],
      ];

      const lightToTemperature = [
        [45, 77, 23],
        [81, 45, 19],
        [68, 64, 13],
      ];

      const temperatureToHumidity = [
        [0, 69, 1],
        [1, 0, 69],
      ];

      const humidityToLocation = [
        [60, 56, 37],
        [56, 93, 4],
      ];

      const ORDERED_CONVERTION_MAPS = [
        seedToSoil,
        soilToFertilizer,
        fertilizerToWater,
        waterToLight,
        lightToTemperature,
        temperatureToHumidity,
        humidityToLocation,
      ].map(createConvertionMap);

      const convertedNumbers = getConvertedNumbersThroughConvertionMaps(
        seeds,
        ORDERED_CONVERTION_MAPS
      );

      const output = Math.min(...convertedNumbers);

      expect(output).toEqual(35);
    });
  });
});
