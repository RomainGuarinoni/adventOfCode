import { Sequence } from "./types";

export const getSequence = (input: string): Sequence =>
  input.split(" ").map((i) => Number.parseInt(i));

export const getDiffSequence = (sequence: Sequence) => {
  const diffSequence: Sequence = [];

  if (sequence.length <= 1) return;

  for (let i = 1; i < sequence.length; i++) {
    const diff = sequence[i] - sequence[i - 1];
    diffSequence.push(diff);
  }

  return diffSequence;
};

export const isFinalDiffSequence = (sequence: Sequence) =>
  sequence.every((n) => n === 0);

export const getAllDiffSequences = (sequence: Sequence) => {
  const diffSequences: Sequence[] = [sequence];

  let shouldRun = true;

  while (shouldRun) {
    const lastDiffSequence = diffSequences[diffSequences.length - 1];

    if (isFinalDiffSequence(lastDiffSequence)) {
      shouldRun = false;
    } else {
      diffSequences.push(getDiffSequence(lastDiffSequence));
    }
  }

  return diffSequences;
};

export const getSequencePredicate = (
  sequence: Sequence,
  position: "start" | "end"
) => {
  const diffSequences = getAllDiffSequences(sequence);
  const predicates: number[] = [0];

  for (let i = diffSequences.length - 2; i >= 0; i--) {
    const currDiffSequence = diffSequences[i];

    const currDiffSequenceValue =
      currDiffSequence[position === "end" ? currDiffSequence.length - 1 : 0];

    const lastPredicateValue =
      predicates[predicates.length - 1] * (position === "end" ? 1 : -1);

    const predicate = currDiffSequenceValue + lastPredicateValue;

    predicates.push(predicate);
  }

  return predicates[predicates.length - 1];
};
