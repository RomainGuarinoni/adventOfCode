import { Position } from "./types";

export const isNumber = (input: string) => !isNaN(Number.parseInt(input));

export const isSymbol = (input: string) => !isNumber(input) && input !== ".";

export const createMatrixFromInputs = (inputs: string[]) =>
  inputs.reduce<string[][]>((acc, curr) => [...acc, curr.split("")], []);

export const getNumberPositionFromLineWithStartIndex = (
  line: string[],
  position: number
) => {
  if (!isNumber(line[position])) return undefined;

  let positions = [position];
  let currentIndex = position + 1;

  while (currentIndex < line.length && isNumber(line[currentIndex])) {
    positions.push(currentIndex);
    currentIndex++;
  }

  return positions;
};

export const isContactTopOrBottom = (
  matrix: string[][],
  lineIndex: number,
  positions: number[],
  predicate: (item: string) => boolean,
  direction: "top" | "bottom"
): Position[] | undefined => {
  if (direction === "top" && lineIndex === 0) return undefined;
  if (direction === "bottom" && lineIndex >= matrix.length - 1)
    return undefined;

  const contactPositions: Position[] = [];

  positions.forEach((position) => {
    if (
      predicate(matrix[lineIndex + (direction === "top" ? -1 : 1)][position])
    ) {
      contactPositions.push([
        lineIndex + (direction === "top" ? -1 : 1),
        position,
      ]);
    }
  });
  return contactPositions.length ? contactPositions : undefined;
};

export const isContactLeftOrRight = (
  matrix: string[][],
  lineIndex: number,
  positions: number[],
  predicate: (item: string) => boolean,
  direction: "left" | "right"
): Position | undefined => {
  const position =
    direction === "left" ? positions[0] : positions[positions.length - 1];

  if (direction === "left" && position === 0) return undefined;
  if (direction === "right" && position >= matrix[lineIndex].length - 1)
    return undefined;

  if (
    predicate(matrix[lineIndex][position + (direction === "left" ? -1 : 1)])
  ) {
    return [lineIndex, position + (direction === "left" ? -1 : 1)];
  }

  return undefined;
};

export const isContactCorners = (
  matrix: string[][],
  lineIndex: number,
  positions: number[],
  predicate: (item: string) => boolean,
  y: "top" | "bottom",
  x: "left" | "right"
): Position | undefined => {
  const position = x === "left" ? positions[0] : positions.at(-1);

  if (y === "top" && lineIndex === 0) return undefined;
  if (y === "bottom" && lineIndex >= matrix.length - 1) return undefined;
  if (x === "left" && position === 0) return undefined;
  if (x === "right" && position >= matrix[lineIndex].length - 1)
    return undefined;

  if (
    predicate(
      matrix[lineIndex + (y === "top" ? -1 : 1)][
        position + (x === "left" ? -1 : 1)
      ]
    )
  ) {
    return [
      lineIndex + (y === "top" ? -1 : 1),
      position + (x === "left" ? -1 : 1),
    ];
  }

  return undefined;
};

export const isItemInContactToPredicate = (
  matrix: string[][],
  lineIndex: number,
  positions: number[],
  predicate: (item: string) => boolean
) => {
  const contactTop = isContactTopOrBottom(
    matrix,
    lineIndex,
    positions,
    predicate,
    "top"
  );

  const contactBottom = isContactTopOrBottom(
    matrix,
    lineIndex,
    positions,
    predicate,
    "bottom"
  );

  const contactLeft = isContactLeftOrRight(
    matrix,
    lineIndex,
    positions,
    predicate,
    "left"
  );

  const contactRight = isContactLeftOrRight(
    matrix,
    lineIndex,
    positions,
    predicate,
    "right"
  );

  const contactTopLeft = isContactCorners(
    matrix,
    lineIndex,
    positions,
    predicate,
    "top",
    "left"
  );

  const contactTopRight = isContactCorners(
    matrix,
    lineIndex,
    positions,
    predicate,
    "top",
    "right"
  );

  const contactBottomLeft = isContactCorners(
    matrix,
    lineIndex,
    positions,
    predicate,
    "bottom",
    "left"
  );

  const contactBottomRight = isContactCorners(
    matrix,
    lineIndex,
    positions,
    predicate,
    "bottom",
    "right"
  );

  return [
    ...(contactTop ? contactTop : []),
    ...(contactBottom ? contactBottom : []),
    ...(contactLeft ? [contactLeft] : []),
    ...(contactRight ? [contactRight] : []),
    ...(contactTopLeft ? [contactTopLeft] : []),
    ...(contactTopRight ? [contactTopRight] : []),
    ...(contactBottomLeft ? [contactBottomLeft] : []),
    ...(contactBottomRight ? [contactBottomRight] : []),
  ];
};

export const getNumberFromPositions = (
  matrix: string[][],
  lineNumber: number,
  positions: number[]
) =>
  Number.parseInt(
    positions.reduce((acc, curr) => `${acc}${matrix[lineNumber][curr]}`, "")
  );

export const getValidNumbersFromMatrix = (matrix: string[][]) => {
  const validNumbers: number[] = [];

  matrix.forEach((line, lineIndex) => {
    let currentIndex = 0;

    while (currentIndex < line.length) {
      const positions = getNumberPositionFromLineWithStartIndex(
        line,
        currentIndex
      );

      if (!positions) {
        currentIndex++;
        continue;
      }

      if (
        isItemInContactToPredicate(matrix, lineIndex, positions, isSymbol)
          .length
      ) {
        validNumbers.push(getNumberFromPositions(matrix, lineIndex, positions));
      }

      currentIndex += positions.length;
    }
  });
  return validNumbers;
};

export const findFullNumberFromPosition = (
  matrix: string[][],
  position: Position
) => {
  const line = position[0];

  let fullNumber = [matrix[line][position[1]]];

  let left = position[1] > 0 ? position[1] - 1 : undefined;
  let right =
    position[1] < matrix[line].length - 1 ? position[1] + 1 : undefined;

  while (typeof left === "number" || typeof right === "number") {
    if (typeof left === "number") {
      const value = matrix[line][left];

      if (!value || !isNumber(value)) {
        left = undefined;
      } else {
        fullNumber.unshift(value);

        if (left > 0) {
          left -= 1;
        } else {
          left = undefined;
        }
      }
    }

    if (typeof right === "number") {
      const value = matrix[line][right];

      if (!value || !isNumber(value)) {
        right = undefined;
      } else {
        fullNumber.push(value);

        if (right < matrix[line].length - 1) {
          right += 1;
        } else {
          right = undefined;
        }
      }
    }
  }

  return Number.parseInt(fullNumber.join(""));
};

export const getContactPositionByLine = (positions: Position[]) => {
  const positionByLine: Record<number, number[]> = {};

  positions.forEach((position) => {
    const line = position[0];
    const positionInTheLine = position[1];

    if (line in positionByLine) {
      positionByLine[line].push(positionInTheLine);
    } else {
      positionByLine[line] = [positionInTheLine];
    }
  });

  Object.values(positionByLine).forEach((positions) =>
    positions.sort((a, b) => a - b)
  );

  Object.entries(positionByLine).forEach(([lineIndex, positions]) => {
    const filteredPosition: number[] = [];

    positions.forEach((position, index) => {
      if (index === 0) return filteredPosition.push(position);

      if (position - 1 !== positions[index - 1])
        filteredPosition.push(position);
    });

    positionByLine[lineIndex] = filteredPosition;
  });

  return positionByLine;
};

export const findAllGearRatios = (matrix: string[][]) => {
  let finalGearRation = 0;

  for (let line = 0; line < matrix.length; line++) {
    for (let row = 0; row < matrix[line].length; row++) {
      const currentItem = matrix[line][row];

      if (currentItem !== "*") continue;

      const contactPositions = isItemInContactToPredicate(
        matrix,
        line,
        [row],
        isNumber
      );

      const contactPositionByLines = getContactPositionByLine(contactPositions);

      const contactNumbers: number[] = [];

      Object.entries(contactPositionByLines).forEach(([line, positions]) => {
        const lineNumber = Number.parseInt(line);

        positions.forEach((position) => {
          contactNumbers.push(
            findFullNumberFromPosition(matrix, [lineNumber, position])
          );
        });
      });

      if (contactNumbers.length !== 2) continue;

      const totalNumber = contactNumbers[0] * contactNumbers[1];
      finalGearRation += totalNumber;
    }
  }

  return finalGearRation;
};
