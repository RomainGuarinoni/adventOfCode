import { isGameValid, parseGameResult } from "./helpers";
import { inputs } from "./inputs.json";

const finalNumber = inputs.reduce((acc, curr) => {
  const gameResult = parseGameResult(curr);

  if (!isGameValid(gameResult)) {
    return acc;
  }

  return acc + gameResult.gameId;
}, 0);

console.log(finalNumber);
