import {
  convertInputsToNodes,
  getnbStepsFirstPart,
  getnbStepsSecondPart,
} from "./helpers";

describe("Day 8", () => {
  describe("convertInputsToNodes", () => {
    it("should return the nodes", () => {
      const inputs = [
        "DRM = (DLQ, BGR)",
        "PKD = (TNC, DKH)",
        "FSM = (LKS, KPG)",
      ];

      const expectedNodes = {
        DRM: ["DLQ", "BGR"],
        PKD: ["TNC", "DKH"],
        FSM: ["LKS", "KPG"],
      };

      expect(convertInputsToNodes(inputs)).toEqual(expectedNodes);
    });
  });

  describe("e2e first part", () => {
    it("should return 6", () => {
      const inputs = [
        "AAA = (BBB, BBB)",
        "BBB = (AAA, ZZZ)",
        "ZZZ = (ZZZ, ZZZ)",
      ];

      const directions = "LLR";

      const expectedNbSteps = 6;

      expect(
        getnbStepsFirstPart(inputs, directions, "AAA", (key) => key === "ZZZ")
      ).toEqual(expectedNbSteps);
    });
  });

  describe("e2e second part", () => {
    it("should return 6", () => {
      const inputs = [
        "11A = (11B, XXX)",
        "11B = (XXX, 11Z)",
        "11Z = (11B, XXX)",
        "22A = (22B, XXX)",
        "22B = (22C, 22C)",
        "22C = (22Z, 22Z)",
        "22Z = (22B, 22B)",
        "XXX = (XXX, XXX)",
      ];

      const directions = "LR";

      const expectedNbSteps = 6;

      expect(getnbStepsSecondPart(inputs, directions)).toEqual(expectedNbSteps);
    });
  });
});
