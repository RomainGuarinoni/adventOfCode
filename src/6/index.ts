import { createRace, getTotalwinningDuration } from "./helpers";
import { inputs } from "./inputs.json";
import { Race } from "./types";

const races = inputs.map(createRace);

const firstFinalNumber = races.reduce((acc, curr) => {
  const totalWinningDuration = getTotalwinningDuration(curr);

  return acc * totalWinningDuration;
}, 1);

// 500346
console.log("First part day 6 response", firstFinalNumber);

const secondRace: Race = {
  duration: 51926890,
  bestDistance: 222203111261225,
};

console.log("Second part day 6 response", getTotalwinningDuration(secondRace));
