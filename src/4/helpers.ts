import { Game } from "./types";

export const isNotEmpty = (string: string) => string !== "";

export const convertInputsAsGames = (inputs: string[]): Game[] =>
  inputs.map((input, index) => {
    const game: Game = {
      index: index + 1,
      winningNumbers: [],
      playerNumbers: [],
    };

    const numbers = input.split(":")[1];

    const [winningNumbers, playerNumbers] = numbers.split("|");

    game.winningNumbers = winningNumbers
      .split(" ")
      .filter(isNotEmpty)
      .map((number) => Number.parseInt(number));

    game.playerNumbers = playerNumbers
      .split(" ")
      .filter(isNotEmpty)
      .map((number) => Number.parseInt(number));

    return game;
  });

export const getPlayerWinningNumbers = ({
  winningNumbers,
  playerNumbers,
}: Game): number[] =>
  playerNumbers.filter((number) => winningNumbers.includes(number));

export const getWinningScore = (winnerNumbers: number[]) => {
  if (winnerNumbers.length === 0) return 0;
  if (winnerNumbers.length === 1) return 1;

  return new Array(winnerNumbers.length - 1).fill("").reduce((acc) => {
    return acc * 2;
  }, 1);
};

export const getTotalScratchCard = (games: Game[]) => {
  const gamesWithCopy: Game[] = games;

  let currentGameIndex = 0;

  while (currentGameIndex < gamesWithCopy.length) {
    const currentGame = gamesWithCopy[currentGameIndex];

    const nbWinningNumbers = getPlayerWinningNumbers(currentGame).length;

    const originalGameIndex = currentGame.index - 1;

    for (let i = 0; i < nbWinningNumbers; i++) {
      gamesWithCopy.push(games[originalGameIndex + (i + 1)]);
    }

    currentGameIndex++;
  }

  return currentGameIndex;
};
