import {
  getCubePower,
  getMinimumNbCube,
  isGameValid,
  parseGameResult,
} from "./helpers";
import { inputs } from "./inputs.json";

const firstFinalNumber = inputs.reduce((acc, curr) => {
  const gameResult = parseGameResult(curr);

  if (!isGameValid(gameResult)) {
    return acc;
  }

  return acc + gameResult.gameId;
}, 0);

console.log("First part day 2 response", firstFinalNumber);

const secondFinalNumber = inputs
  .map(parseGameResult)
  .map(({ rounds }) => getMinimumNbCube(rounds))
  .map(getCubePower)
  .reduce((acc, curr) => acc + curr, 0);

console.log("Second part day 2 response", secondFinalNumber);
