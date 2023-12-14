import { getTotalWinningScore, sortHand } from "./helpers";
import { inputs } from "./inputs.json";

console.log(inputs.sort(sortHand).reverse());

const firstFinalNumber = getTotalWinningScore(inputs);

console.log("First part day 7 response", firstFinalNumber);

const secondFinalNumber = 0;

console.log("Second part day 7 response", secondFinalNumber);
