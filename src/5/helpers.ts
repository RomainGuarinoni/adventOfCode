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

export const getRangeStartAndEnd = (key: string) =>
  key.split("-").map((v) => Number.parseInt(v));

export const findConvertedNumber = (
  number: number,
  convertionMap: ConvertionMap
) => {
  for (const key in convertionMap) {
    const [start, end] = getRangeStartAndEnd(key);

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

export const sortRanges = (ranges: string[]) => {
  ranges.sort((rangeA, rangeB) => {
    const [startA] = getRangeStartAndEnd(rangeA);
    const [startB] = getRangeStartAndEnd(rangeB);

    return startA - startB;
  });

  return ranges;
};

export const sortConvertionMapRange = (convertionMap: ConvertionMap) => {
  const ranges = Object.keys(convertionMap);

  return sortRanges(ranges);
};

//

export const getMatchingConvertionRange = (
  rangeToConvert: string,
  convertionMap: ConvertionMap
) => {
  const sortedRanges = sortConvertionMapRange(convertionMap);

  const matchingConvertionRange: string[] = [];
  const [rangeToConvertStart, rangeToConvertEnd] =
    getRangeStartAndEnd(rangeToConvert);
  for (const range of sortedRanges) {
    const [start, end] = getRangeStartAndEnd(range);

    if (end < rangeToConvertStart) continue;

    // overlap start
    if (start <= rangeToConvertStart && end >= rangeToConvertStart) {
      matchingConvertionRange.push(range);
      continue;
    }

    // inside
    if (start >= rangeToConvertStart && end <= rangeToConvertEnd) {
      matchingConvertionRange.push(range);
      continue;
    }

    // overlap end
    if (start <= rangeToConvertEnd && end >= rangeToConvertEnd) {
      matchingConvertionRange.push(range);
      continue;
    }

    if (start > rangeToConvertStart) break;
  }

  return matchingConvertionRange;
};

export const convertRange = (
  rangeToConvert: string,
  convertionMap: ConvertionMap
): string[] => {
  // Store all the converted range
  const convertedRanges: string[] = [];

  // First, we get all the range that are
  const matchingConvertionRange = getMatchingConvertionRange(
    rangeToConvert,
    convertionMap
  );

  // Hold the current range to convert

  if (!matchingConvertionRange.length) {
    return [rangeToConvert];
  }

  let currentRangeToConvert = rangeToConvert;

  matchingConvertionRange.forEach((range) => {
    const [rangeStart, rangeEnd] = getRangeStartAndEnd(range);
    const [currStart, currEnd] = getRangeStartAndEnd(currentRangeToConvert);

    const offset = convertionMap[range];

    let convertedStart: number;

    if (rangeStart <= currStart) {
      convertedStart = currStart + offset;
    } else {
      const unConvertedRange = `${currStart}-${rangeStart - 1}`;
      convertedRanges.push(unConvertedRange);

      convertedStart = rangeStart + offset;
    }

    if (rangeEnd >= currEnd) {
      const convertedEnd = currEnd + offset;
      convertedRanges.push(`${convertedStart}-${convertedEnd}`);
      currentRangeToConvert = null;
    } else {
      const convertedEnd = rangeEnd + offset;
      convertedRanges.push(`${convertedStart}-${convertedEnd}`);
      currentRangeToConvert = `${rangeEnd + 1}-${currEnd}`;
    }
  });

  if (currentRangeToConvert !== null) {
    convertedRanges.push(currentRangeToConvert);
  }

  return convertedRanges;
};

export const generateRangesFromSeeds = (seeds: number[]) => {
  const ranges: string[] = [];
  while (seeds.length) {
    const start = seeds.shift();
    const offset = seeds.shift();

    ranges.push(`${start}-${start + offset - 1}`);
  }

  return ranges;
};
