import {
  getAllDiffSequences,
  getDiffSequence,
  getSequence,
  getSequencePredicate,
  isFinalDiffSequence,
} from "./helpers";

describe("Day 9", () => {
  describe("getSequence", () => {
    it("should return a sequence", () => {
      const input = "1 3 6 10 15 21";

      const sequence = [1, 3, 6, 10, 15, 21];

      expect(getSequence(input)).toEqual(sequence);
    });
  });

  describe("getDiffSequence", () => {
    it("should return a diff sequence", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      const diff = [2, 3, 4, 5, 6];

      expect(getDiffSequence(sequence)).toEqual(diff);
    });
  });

  describe("isFinalDiffSequence", () => {
    it("should return false", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      expect(isFinalDiffSequence(sequence)).toEqual(false);
    });

    it("should return true", () => {
      const sequence = [0, 0, 0, 0, 0, 0];

      expect(isFinalDiffSequence(sequence)).toEqual(true);
    });
  });

  describe("getAllDiffSequences", () => {
    it("should return all the diff sequences", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      const diffSequences = [
        [1, 3, 6, 10, 15, 21],
        [2, 3, 4, 5, 6],
        [1, 1, 1, 1],
        [0, 0, 0],
      ];

      expect(getAllDiffSequences(sequence)).toEqual(diffSequences);
    });
  });

  describe("getSequencePredicate", () => {
    it("should return 28", () => {
      const sequence = [1, 3, 6, 10, 15, 21];

      expect(getSequencePredicate(sequence, "end")).toEqual(28);
    });

    it("should return 68", () => {
      const sequence = [10, 13, 16, 21, 30, 45];

      expect(getSequencePredicate(sequence, "end")).toEqual(68);
    });

    it("should return 18", () => {
      const sequence = [0, 3, 6, 9, 12, 15];

      expect(getSequencePredicate(sequence, "end")).toEqual(18);
    });

    it("should return 5", () => {
      const sequence = [10, 13, 16, 21, 30, 45];

      expect(getSequencePredicate(sequence, "start")).toEqual(5);
    });
  });
});
