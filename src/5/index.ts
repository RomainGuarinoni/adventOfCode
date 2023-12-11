import {
  convertRange,
  createConvertionMap,
  findConvertedNumber,
  generateRangesFromSeeds,
  getConvertedNumbersThroughConvertionMaps,
  getRangeStartAndEnd,
  sortRanges,
} from "./helpers";
import {
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
} from "./inputs.json";

const ORDERED_CONVERTION_MAPS = [
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
].map(createConvertionMap);

const firstFinalNumber = Math.min(
  ...getConvertedNumbersThroughConvertionMaps(seeds, ORDERED_CONVERTION_MAPS)
);

console.log("First part day 5 response", firstFinalNumber);

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

const [secondFinalNumber] = getRangeStartAndEnd(smallerRange);

console.log("Second part day 5 response", secondFinalNumber);
