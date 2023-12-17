import { createPlan, getLoopLength } from "./helpers";
import { inputs } from "./inputs.json";

const firstFinalNumber = getLoopLength(createPlan(inputs)) / 2;

console.log("First part day 10 response", firstFinalNumber);

const secondFinalNumber = 0;

console.log("Second part day 10 response", secondFinalNumber);
