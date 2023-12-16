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

export const getnbStepsFirstPart = (
  inputs: string[],
  directions: string,
  start: string,
  predicate: (nodeKey: string) => boolean
) => {
  const nodes = convertInputsToNodes(inputs);

  let currentNodeKey = start;
  let nbStep = 0;
  let currentIndexDirection = 0;

  while (!predicate(currentNodeKey)) {
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

function leastCommonMultiple(values: number[]) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  var multiple = Math.min(...values);
  values.forEach(function (n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

export const getStartingNodes = (nodes: Nodes) =>
  Object.keys(nodes).filter((key) => key.endsWith("A"));

export const isendingKey = (key: string) => key.endsWith("Z");

export const getnbStepsSecondPart = (inputs: string[], directions: string) => {
  const nodes = convertInputsToNodes(inputs);

  const startingNodeKeys = getStartingNodes(nodes);
  const startingNodesNbSteps: number[] = [];

  startingNodeKeys.forEach((key) => {
    startingNodesNbSteps.push(
      getnbStepsFirstPart(inputs, directions, key, isendingKey)
    );
  });

  return leastCommonMultiple(startingNodesNbSteps);
};
