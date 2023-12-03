import { MAX_BLUE, MAX_GREEN, MAX_RED } from "./constants";
import { GameResult, Round } from "./types";

export const parseGameResult = (input: string): GameResult => {
  const split = input.split(": ");

  const gameId = parseInt(split[0].split(" ")[1]);

  const gameResult: GameResult = {
    gameId,
    rounds: [],
  };

  const rounds = split[1].split("; ");

  rounds.forEach((round) => {
    const roundObject: Round = {
      green: 0,
      red: 0,
      blue: 0,
    };

    const cubes = round.split(", ");

    cubes.forEach((cube) => {
      const [value, colour] = cube.split(" ");

      roundObject[colour] = parseInt(value);
    });

    gameResult.rounds.push(roundObject);
  });

  return gameResult;
};

export const isRoundValid = (round: Round) =>
  round.blue <= MAX_BLUE && round.green <= MAX_GREEN && round.red <= MAX_RED;

export const isGameValid = (game: GameResult) =>
  game.rounds.every(isRoundValid);

export const getMinimumNbCube = (rounds: Round[]): Round => {
  const minimumRound: Round = {
    red: 0,
    blue: 0,
    green: 0,
  };

  rounds.forEach((round) => {
    Object.entries(round).forEach(([colour, value]) => {
      if (minimumRound[colour] < value) minimumRound[colour] = value;
    });
  });

  return minimumRound;
};

export const getCubePower = (round: Round) =>
  Object.values(round).reduce((acc, curr) => acc * curr, 1);
