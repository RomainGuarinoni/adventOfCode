import { convertInputsToNodes, getnbSteps } from "./helpers";

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

  describe("e2e", () => {
    it("should return 6", () => {
      const inputs = [
        "AAA = (BBB, BBB)",
        "BBB = (AAA, ZZZ)",
        "ZZZ = (ZZZ, ZZZ)",
      ];

      const directions = "LLR";

      const expectedNbSteps = 6;

      expect(getnbSteps(inputs, directions)).toEqual(expectedNbSteps);
    });
  });
});
