import {
  convertInputsAsGames,
  getPlayerWinningNumbers,
  getTotalScratchCard,
  getWinningScore,
} from "./helpers";
import { inputs } from "./inputs.json";
import { Game } from "./types";

const games = convertInputsAsGames(inputs);

const firstFinalNumber = games.reduce((totalScore, game) => {
  const playerWinningNumbers = getPlayerWinningNumbers(game);

  return (totalScore += getWinningScore(playerWinningNumbers));
}, 0);

console.log("First part day 3 response", firstFinalNumber);

const secondFinalNumber = getTotalScratchCard(games);

console.log("Second part day 3 response", secondFinalNumber);
