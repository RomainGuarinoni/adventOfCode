import {
  createConvertionMap,
  findConvertedNumber,
  getConvertedNumbersThroughConvertionMaps,
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
