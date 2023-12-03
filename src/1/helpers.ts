import {
  DIGIT_BY_FIRST_LETTER,
  DIGIT_TO_VALUE,
  VALID_FIRST_LETTER,
} from "./constants";
import { ValidDigit } from "./types";

export const getNumberFromInput = (
  input: string,
  position: "first" | "last"
) => {
  const stringArray = input.split("");
  const stringValues =
    position === "first" ? stringArray : stringArray.reverse();

  return stringValues.find((value) => !isNaN(Number.parseInt(value)));
};

export const getValueFromInput = (input: string) =>
  Number.parseInt(
    `${getNumberFromInput(input, "first")}${getNumberFromInput(input, "last")}`
  );

export const getFinalNumberFromInputs = (inputs: string[]) =>
  inputs.map(getValueFromInput).reduce((acc, curr) => acc + curr, 0);

export const isValidFirstDigit = (digit: string) =>
  VALID_FIRST_LETTER.includes(digit);

/** This function consider that the input already has its first letter valid as digit */
export const extractNumberFromInput = (
  input: string
): ValidDigit | undefined => {
  const possibleDigits = DIGIT_BY_FIRST_LETTER[input[0]];

  for (const digit of possibleDigits) {
    const subInput = input.slice(0, digit.length);

    if (subInput === digit) return digit;
  }

  return undefined;
};

export const parseInputToNumber = (input: string) => {
  const parsedNumbers: number[] = [];
  let currentIndex = 0;

  while (currentIndex < input.length) {
    const currentValue = input[currentIndex];

    // We got a number
    if (!isNaN(Number.parseInt(currentValue))) {
      parsedNumbers.push(Number.parseInt(currentValue));
      // we got a string
    } else {
      if (isValidFirstDigit(currentValue)) {
        const extractedDigit = extractNumberFromInput(
          input.slice(currentIndex)
        );

        if (!extractedDigit) {
        } else {
          parsedNumbers.push(DIGIT_TO_VALUE[extractedDigit]);
        }
      }
    }
    currentIndex++;
  }

  return parsedNumbers;
};

export const getNumberValueFromInput = (input: string) => {
  const parsedInput = parseInputToNumber(input);

  return Number.parseInt(
    `${parsedInput[0]}${parsedInput[parsedInput.length - 1]}`
  );
};
