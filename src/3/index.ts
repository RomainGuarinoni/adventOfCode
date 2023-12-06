import {
  createMatrixFromInputs,
  findAllGearRatios,
  getValidNumbersFromMatrix,
} from "./helpers";
import { inputs } from "./inputs.json";

const matrix = createMatrixFromInputs(inputs);

const numbers = getValidNumbersFromMatrix(matrix);

const firstFinalNumber = numbers.reduce((acc, curr) => acc + curr, 0);

// First part day 3 response 540025
console.log("First part day 3 response", firstFinalNumber);

const secondFinalNumber = findAllGearRatios(matrix);

console.log("Second part day 3 response", secondFinalNumber);
