import { createMatrixFromInputs, getValidNumbersFromMatrix } from "./helpers";
import { inputs } from "./inputs.json";

const matrix = createMatrixFromInputs(inputs);

const numbers = getValidNumbersFromMatrix(matrix);

console.log(numbers);

const firstFinalNumber = numbers.reduce((acc, curr) => acc + curr, 0);

console.log("First part day 3 response", firstFinalNumber);
