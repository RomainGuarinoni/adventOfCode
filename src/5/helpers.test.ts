import {
  convertRange,
  createConvertionMap,
  findConvertedNumber,
  generateRangesFromSeeds,
  getConvertedNumbers,
  getConvertedNumbersThroughConvertionMaps,
  getMatchingConvertionRange,
  getRangeStartAndEnd,
  sortConvertionMapRange,
  sortRanges,
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

  describe("getRangeStartAndEnd", () => {
    it("should return the range from a key input", () => {
      const key = "10-50";
      const expectedRange = [10, 50];

      expect(getRangeStartAndEnd(key)).toEqual(expectedRange);
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

  describe("sortConvertionMapRange", () => {
    it("should sort the convertion map", () => {
      const convertionMapTwo: ConvertionMap = {
        "20-22": 10,
        "12-20": -5,
        "5-2": 0,
        "40-26": 3,
        "13-48": 8,
      };

      const sortedRange = ["5-2", "12-20", "13-48", "20-22", "40-26"];

      expect(sortConvertionMapRange(convertionMapTwo)).toEqual(sortedRange);
    });
  });

  describe("getMatchingConvertionRange", () => {
    describe("All the convertion range are before", () => {
      it("should return empty array", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "10-11": 4,
          "12-19": 6,
        };

        const expectedConvertedRange = [];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("All the convertion range are after", () => {
      it("should return empty array", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "26-28": 4,
          "40-50": 4,
          "100-189": 6,
        };

        const expectedConvertedRange = [];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the all range", () => {
      it("should return one range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-28": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["15-28"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the start range", () => {
      it("should return one range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-22": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["15-22"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the end range", () => {
      it("should return one range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "22-28": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["22-28"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the middle range", () => {
      it("should return one range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "21-23": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["21-23"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("Two converted range wrap the all range", () => {
      it("should return two range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-23": 4,
          "24-25": 6,
          "40-60": 6,
        };

        const expectedConvertedRange = ["15-23", "24-25"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("Multiple converted range wrap the all range", () => {
      it("should return two range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-20": 4,
          "22-24": 6,
          "25-30": 6,
          "36-66": 6,
        };

        const expectedConvertedRange = ["15-20", "22-24", "25-30"];

        expect(getMatchingConvertionRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });
  });

  describe("convertRange", () => {
    describe("All the convertion range are before", () => {
      it("should be the same range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "10-11": 4,
          "12-19": 6,
        };

        const expectedConvertedRange = [range];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("All the convertion range are after", () => {
      it("should be the same range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "26-28": 4,
          "40-50": 4,
          "100-189": 6,
        };

        const expectedConvertedRange = [range];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the all range", () => {
      it("should return one converted range range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-28": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["24-29"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the start range", () => {
      it("should return the converted and the rest", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-22": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["24-26", "23-25"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the end range", () => {
      it("should return the converted and the rest", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "22-28": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["20-21", "26-29"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("One converted range wrap the middle range", () => {
      it("should return one converted and 2 rest", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "21-23": 4,
          "40-50": 6,
        };

        const expectedConvertedRange = ["20-20", "25-27", "24-25"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("Two converted range wrap the all range", () => {
      it("should return two converted range", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-23": 4,
          "24-25": 6,
          "40-60": 6,
        };

        const expectedConvertedRange = ["24-27", "30-31"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("Multiple converted range wrap the all range", () => {
      it("should all the converted and the rest", () => {
        const range = "20-25";

        const convertionMap: ConvertionMap = {
          "0-10": 4,
          "15-20": 4,
          "22-24": 6,
          "25-30": 6,
          "36-66": 6,
        };

        const expectedConvertedRange = ["24-24", "21-21", "28-30", "31-31"];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });

    describe("Multiple converted range wrap the all range complex", () => {
      it("should all the converted and the rest", () => {
        const range = "10-30";

        const convertionMap: ConvertionMap = {
          "0-4": 2,
          "5-14": 4,
          "20-23": 1,
          "27-38": 6,
          "39-55": 8,
        };

        const expectedConvertedRange = [
          "14-18",
          "15-19",
          "21-24",
          "24-26",
          "33-36",
        ];

        expect(convertRange(range, convertionMap)).toEqual(
          expectedConvertedRange
        );
      });
    });
  });

  describe("generateRangesFromSeeds", () => {
    it("should return the ranges", () => {
      const seeds = [79, 14, 55, 13];

      const expectedRange = ["79-92", "55-67"];

      expect(generateRangesFromSeeds(seeds)).toEqual(expectedRange);
    });
  });

  describe("e2e two", () => {
    it("should return 46", () => {
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

      let ranges = generateRangesFromSeeds(seeds);

      ORDERED_CONVERTION_MAPS.forEach((convertionMap) => {
        const convertedRanges = [];

        ranges.forEach((range) => {
          convertedRanges.push(...convertRange(range, convertionMap));
        });

        ranges = convertedRanges;
      });

      const sortedRanges = sortRanges(ranges);

      const smallerRange = sortedRanges[0];

      const [start] = getRangeStartAndEnd(smallerRange);

      expect(start).toEqual(46);
    });
  });
});
