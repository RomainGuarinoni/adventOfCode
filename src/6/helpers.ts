import { Race } from "./types";

export const createRace = (input: number[]): Race => ({
  duration: input[0],
  bestDistance: input[1],
});

export const getTotalwinningDuration = (race: Race) => {
  const firstRoot = Math.ceil(
    (race.duration +
      Math.sqrt(Math.pow(race.duration, 2) - 4 * race.bestDistance)) /
      2
  );

  const secondRoot = Math.floor(
    (race.duration -
      Math.sqrt(Math.pow(race.duration, 2) - 4 * race.bestDistance)) /
      2
  );

  return firstRoot - secondRoot - 1;
};
