import {
  HORIZONTAL_PIPE,
  NORTH_EAST_PIPE,
  NORTH_WEST_PIPE,
  SOUTH_EAST_PIPE,
  SOUTH_WEST_PIPE,
  STARTING_POSITION,
  VERTICAL_PIPE,
} from "./constants";

export const createPlan = (input: string[]): string[][] =>
  input.map((line) => line.split(""));

export const getStartingPosition = (plan: string[][]): [number, number] => {
  for (let i = 0; i < plan.length; i++) {
    for (let j = 0; j < plan[i].length; j++) {
      if (plan[i][j] === STARTING_POSITION) return [i, j];
    }
  }
  throw new Error("No starting position found");
};

export const getStartingPositionNextDirection = (
  plan: string[][],
  startingPosition: [number, number]
): [number, number][] => {
  const [startLine, startRow] = startingPosition;
  const directions: [number, number][] = [];
  const top = startLine > 0 ? plan[startLine - 1][startRow] : undefined;
  const bottom =
    startLine < plan.length - 1 ? plan[startLine + 1][startRow] : undefined;
  const left = startRow > 0 ? plan[startLine][startRow - 1] : undefined;
  const right =
    startRow < plan[0].length - 1 ? plan[startLine][startRow + 1] : undefined;

  if (top) {
    if ([VERTICAL_PIPE, SOUTH_EAST_PIPE, SOUTH_WEST_PIPE].includes(top)) {
      directions.push([startLine - 1, startRow]);
    }
  }

  if (bottom) {
    if ([VERTICAL_PIPE, NORTH_EAST_PIPE, NORTH_WEST_PIPE].includes(bottom)) {
      directions.push([startLine + 1, startRow]);
    }
  }

  if (left) {
    if ([HORIZONTAL_PIPE, SOUTH_EAST_PIPE, NORTH_EAST_PIPE].includes(left)) {
      directions.push([startLine, startRow - 1]);
    }
  }

  if (right) {
    if ([HORIZONTAL_PIPE, SOUTH_WEST_PIPE, NORTH_WEST_PIPE].includes(right)) {
      directions.push([startLine, startRow + 1]);
    }
  }

  if (directions.length !== 2) {
    throw new Error(
      "More or less than 2 possible directions from start position"
    );
  }

  return directions;
};

export const getNextPosition = (
  plan: string[][],
  position: [number, number],
  previousPosition: [number, number]
): [number, number] => {
  const currentPosition = plan[position[0]][position[1]];

  const possiblePositions: [number, number][] = [];

  switch (currentPosition) {
    case VERTICAL_PIPE:
      possiblePositions.push(
        [position[0] + 1, position[1]],
        [position[0] - 1, position[1]]
      );
      break;
    case HORIZONTAL_PIPE:
      possiblePositions.push(
        [position[0], position[1] + 1],
        [position[0], position[1] - 1]
      );
      break;

    case NORTH_EAST_PIPE:
      possiblePositions.push(
        [position[0] - 1, position[1]],
        [position[0], position[1] + 1]
      );
      break;

    case NORTH_WEST_PIPE:
      possiblePositions.push(
        [position[0] - 1, position[1]],
        [position[0], position[1] - 1]
      );
      break;

    case SOUTH_EAST_PIPE:
      possiblePositions.push(
        [position[0] + 1, position[1]],
        [position[0], position[1] + 1]
      );
      break;

    case SOUTH_WEST_PIPE:
      possiblePositions.push(
        [position[0] + 1, position[1]],
        [position[0], position[1] - 1]
      );
      break;
  }

  return possiblePositions.filter(
    (position) =>
      !(
        position[0] === previousPosition[0] &&
        position[1] === previousPosition[1]
      )
  )[0];
};

export const getLoopLength = (plan: string[][]) => {
  const startingPosition = getStartingPosition(plan);

  const possibleNextDirection = getStartingPositionNextDirection(
    plan,
    startingPosition
  );

  const nextDirection = possibleNextDirection[0];

  let nbStep = 1;
  let currentPosition = nextDirection;
  let previousPosition = startingPosition;

  while (
    !(
      currentPosition[0] === startingPosition[0] &&
      currentPosition[1] === startingPosition[1]
    )
  ) {
    nbStep++;

    const nextCurrentPosition = getNextPosition(
      plan,
      currentPosition,
      previousPosition
    );
    previousPosition = currentPosition;

    currentPosition = nextCurrentPosition;
  }

  return nbStep;
};
