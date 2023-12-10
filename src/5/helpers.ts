import { ConvertionMap } from "./types";

export const createConvertionMap = (inputs: number[][]) => {
  const map: ConvertionMap = {};

  inputs.forEach((input) => {
    const [dest, source, range] = input;

    const key = `${source}-${source + range - 1}`;

    const offset = dest - source;

    map[key] = offset;
  });

  return map;
};

export const getRangeFromKey = (key: string) =>
  key.split("-").map((v) => Number.parseInt(v));

export const findConvertedNumber = (
  number: number,
  convertionMap: ConvertionMap
) => {
  for (const key in convertionMap) {
    const [start, end] = getRangeFromKey(key);

    if (number < start || number > end) continue;

    const offset = convertionMap[key];

    return number + offset;
  }

  return number;
};

export const getConvertedNumbers = (
  numbers: number[],
  convertionMap: ConvertionMap
) => numbers.map((number) => findConvertedNumber(number, convertionMap));

export const getConvertedNumbersThroughConvertionMaps = (
  numbers: number[],
  convertionMaps: ConvertionMap[]
) => {
  let output: number[] = [...numbers];

  convertionMaps.forEach(
    (convertionMap) => (output = getConvertedNumbers(output, convertionMap))
  );

  return output;
};
