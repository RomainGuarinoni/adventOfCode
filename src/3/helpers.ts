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

export const isNumberInContactWithSymbol = (
  matrix: string[][],
  lineIndex: number,
  positions: number[]
) => {
  if (lineIndex > 0) {
    const isInContactFromTop = positions.some((position) =>
      isSymbol(matrix[lineIndex - 1][position])
    );

    if (isInContactFromTop) return true;
  }

  if (lineIndex < matrix.length - 1) {
    const isInContactFromBottom = positions.some((position) =>
      isSymbol(matrix[lineIndex + 1][position])
    );

    if (isInContactFromBottom) return true;
  }

  if (positions[positions.length - 1] < matrix[0].length - 1) {
    const isInContactFromRight = isSymbol(
      matrix[lineIndex][positions[positions.length - 1] + 1]
    );

    if (isInContactFromRight) return true;
  }

  if (positions[0] > 0) {
    const isInContactFromLeft = isSymbol(matrix[lineIndex][positions[0] - 1]);

    if (isInContactFromLeft) return true;
  }

  if (lineIndex > 0 && positions[0] > 0) {
    const isInContactFromTopLeft = isSymbol(
      matrix[lineIndex - 1][positions[0] - 1]
    );

    if (isInContactFromTopLeft) return true;
  }

  if (lineIndex > 0 && positions[positions.length - 1] < matrix[0].length - 1) {
    const isInContactFromTopRight = isSymbol(
      matrix[lineIndex - 1][positions[positions.length - 1] + 1]
    );

    if (isInContactFromTopRight) return true;
  }

  if (lineIndex < matrix.length - 1 && positions[0] > 0) {
    const isInContactFromBottomLeft = isSymbol(
      matrix[lineIndex + 1][positions[0] - 1]
    );

    if (isInContactFromBottomLeft) return true;
  }

  if (
    lineIndex < matrix.length - 1 &&
    positions[positions.length - 1] < matrix[0].length - 1
  ) {
    const isInContactFromBottomRight = isSymbol(
      matrix[lineIndex + 1][positions[positions.length - 1] + 1]
    );

    if (isInContactFromBottomRight) return true;
  }

  return false;
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

      if (isNumberInContactWithSymbol(matrix, lineIndex, positions)) {
        validNumbers.push(getNumberFromPositions(matrix, lineIndex, positions));
      }

      currentIndex += positions.length;
    }
  });
  return validNumbers;
};
