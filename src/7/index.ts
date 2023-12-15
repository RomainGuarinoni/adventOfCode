import { getTotalWinningScore, sortHand } from "./helpers";
import { inputs } from "./inputs.json";

const firstFinalNumber = getTotalWinningScore(inputs as [string, number][]);

console.log("First part day 7 response", firstFinalNumber);

const secondFinalNumber = getTotalWinningScore(
  inputs as [string, number][],
  true // with joker
);

// 250957639
console.log("Second part day 7 response", secondFinalNumber);
