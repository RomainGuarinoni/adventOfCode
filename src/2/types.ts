export type Round = {
  red: number;
  green: number;
  blue: number;
};

export type GameResult = {
  gameId: number;
  rounds: Round[];
};
