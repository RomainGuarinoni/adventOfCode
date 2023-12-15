import { Nodes } from "./types";

export const convertInputsToNodes = (inputs: string[]) => {
  const nodes: Nodes = {};

  inputs.forEach((input) => {
    const [key, directions] = input.split(" = ");

    const [left, right] = directions
      .replace("(", "")
      .replace(")", "")
      .split(", ");

    nodes[key] = [left, right];
  });

  return nodes;
};

export const getnbSteps = (inputs: string[], directions: string) => {
  const nodes = convertInputsToNodes(inputs);

  let currentNodeKey = "AAA";
  let nbStep = 0;
  let currentIndexDirection = 0;

  while (currentNodeKey !== "ZZZ") {
    nbStep++;

    const direction = directions[currentIndexDirection];

    const currentNodeDirection = nodes[currentNodeKey];

    if (direction === "R") {
      currentNodeKey = currentNodeDirection[1];
    } else {
      currentNodeKey = currentNodeDirection[0];
    }

    if (currentIndexDirection + 1 >= directions.length) {
      currentIndexDirection = 0;
    } else {
      currentIndexDirection++;
    }
  }

  return nbStep;
};
