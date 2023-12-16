import { getnbStepsFirstPart, getnbStepsSecondPart } from "./helpers";
import { inputs } from "./inputs.json";

const firstFinalNumber = getnbStepsFirstPart(
  inputs.nodes,
  inputs.direction,
  "AAA",
  (key) => key === "ZZZ"
);

// 19631
console.log("First part day 8 response", firstFinalNumber);

const secondFinalNumber = getnbStepsSecondPart(inputs.nodes, inputs.direction);

console.log("Second part day 8 response", secondFinalNumber);
