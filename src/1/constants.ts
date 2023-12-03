import { ValidDigit } from "./types";

export const DIGIT_BY_FIRST_LETTER: Record<string, ValidDigit[]> = {
  o: ["one"],
  t: ["two", "three"],
  f: ["four", "five"],
  s: ["six", "seven"],
  e: ["eight"],
  n: ["nine"],
};

export const DIGIT_TO_VALUE: Record<ValidDigit, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export const VALID_FIRST_LETTER = Object.keys(DIGIT_BY_FIRST_LETTER);
