import { getSequence, getSequencePredicate } from "./helpers";
import { inputs } from "./inputs.json";

const firstFinalNumber = inputs
  .map(getSequence)
  .map((sequence) => getSequencePredicate(sequence, "end"))
  .reduce((acc, curr) => acc + curr, 0);

console.log("First part day 9 response", firstFinalNumber);

const secondFinalNumber = inputs
  .map(getSequence)
  .map((sequence) => getSequencePredicate(sequence, "start"))
  .reduce((acc, curr) => acc + curr, 0);

console.log("Second part day 9 response", secondFinalNumber);
