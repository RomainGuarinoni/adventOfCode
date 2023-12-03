import { getFinalNumberFromInputs, getNumberValueFromInput } from "./helpers";
import { inputs } from "./inputs.json";

const finalValueFirst = getFinalNumberFromInputs(inputs);

console.log("First part day 1 response", finalValueFirst);

const finalValueSecond = inputs.reduce(
  (acc, curr) => acc + getNumberValueFromInput(curr),
  0
);

console.log("Second part day 1 response", finalValueSecond);
