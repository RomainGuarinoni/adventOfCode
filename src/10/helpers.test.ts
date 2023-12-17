import {
  createPlan,
  getStartingPosition,
  getNextPosition,
  getStartingPositionNextDirection,
  getLoopLength,
} from "./helpers";

describe("Day 10", () => {
  describe("createPlan", () => {
    it("should create a plan", () => {
      const input = [".....", ".F-7.", ".|.|.", ".L-J.", "....."];

      const plan = [
        [".", ".", ".", ".", "."],
        [".", "F", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];

      expect(createPlan(input)).toEqual(plan);
    });
  });

  describe("getStartingPosition", () => {
    it("should return [1,1]", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", "S", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];

      const position = [1, 1];

      expect(getStartingPosition(plan)).toEqual(position);
    });

    it("should throw an error", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", "F", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];

      const error = new Error("No starting position found");

      expect(() => getStartingPosition(plan)).toThrow(error);
    });
  });

  describe("getStartingPositionNextDirection", () => {
    it("should return directions middle", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", "S", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];

      const startingPosition: [number, number] = [1, 1];
      const expectedDirection = [
        [2, 1],
        [1, 2],
      ];

      expect(getStartingPositionNextDirection(plan, startingPosition)).toEqual(
        expectedDirection
      );
    });

    it("should return directions top right", () => {
      const plan = [
        [".", ".", ".", "-", "S"],
        [".", ".", ".", ".", "|"],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
      ];

      const startingPosition: [number, number] = [0, 4];
      const expectedDirection = [
        [1, 4],
        [0, 3],
      ];

      expect(getStartingPositionNextDirection(plan, startingPosition)).toEqual(
        expectedDirection
      );
    });

    it("should return directions top letf", () => {
      const plan = [
        ["S", "7", ".", ".", "."],
        ["L", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
      ];

      const startingPosition: [number, number] = [0, 0];
      const expectedDirection = [
        [1, 0],
        [0, 1],
      ];

      expect(getStartingPositionNextDirection(plan, startingPosition)).toEqual(
        expectedDirection
      );
    });

    it("should return directions bottom letf", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        ["F", ".", ".", ".", "."],
        ["S", "J", ".", ".", "."],
      ];

      const startingPosition: [number, number] = [4, 0];
      const expectedDirection = [
        [3, 0],
        [4, 1],
      ];

      expect(getStartingPositionNextDirection(plan, startingPosition)).toEqual(
        expectedDirection
      );
    });

    it("should return directions bottom right", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "7"],
        [".", ".", ".", "F", "S"],
      ];

      const startingPosition: [number, number] = [4, 4];
      const expectedDirection = [
        [3, 4],
        [4, 3],
      ];

      expect(getStartingPositionNextDirection(plan, startingPosition)).toEqual(
        expectedDirection
      );
    });

    it("should return an error because less than 2 direction", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "7"],
        [".", ".", ".", "|", "S"],
      ];

      const startingPosition: [number, number] = [4, 4];
      const error = new Error(
        "More or less than 2 possible directions from start position"
      );

      expect(() =>
        getStartingPositionNextDirection(plan, startingPosition)
      ).toThrow(error);
    });

    it("should return an error because more than 2 direction", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", ".", "|", ".", "."],
        [".", "L", "S", "7", "."],
        [".", ".", "L", ".", "."],
        [".", ".", ".", ".", "."],
      ];

      const startingPosition: [number, number] = [4, 4];
      const error = new Error(
        "More or less than 2 possible directions from start position"
      );

      expect(() =>
        getStartingPositionNextDirection(plan, startingPosition)
      ).toThrow(error);
    });
  });

  describe("getNextPosition", () => {
    describe("VERTICAL_PIPE", () => {
      it("should return down", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", "|", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [3, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [4, 2];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return up", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", "|", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [1, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [0, 2];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });

    describe("HORIZONTAL_PIPE", () => {
      it("should return right", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", "-", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 3] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [2, 4];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return left", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", "-", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 1] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [2, 0];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });

    describe("NORTH_EAST_PIPE", () => {
      it("should return up", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", "L", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 1] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [1, 1];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return right", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", "L", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [3, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [3, 3];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });

    describe("NORTH_WEST_PIPE", () => {
      it("should return up", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", "J", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 3] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [1, 3];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return left", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", "J", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [3, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [3, 1];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });

    describe("SOUTH_EAST_PIPE", () => {
      it("should return down", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", "F", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 1] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [3, 1];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return right", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", "F", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [1, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [1, 3];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });

    describe("SOUTH_WEST_PIPE", () => {
      it("should return down", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", "S", "7", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [2, 3] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [3, 3];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });

      it("should return left", () => {
        const plan = [
          [".", ".", ".", ".", "."],
          [".", ".", "7", ".", "."],
          [".", ".", "S", ".", "."],
          [".", ".", ".", ".", "."],
          [".", ".", ".", ".", "."],
        ];

        const currentPosition = [1, 2] as [number, number];
        const previousPosition = [2, 2] as [number, number];
        const expectedNextPosition = [1, 1];

        expect(
          getNextPosition(plan, currentPosition, previousPosition)
        ).toEqual(expectedNextPosition);
      });
    });
  });

  describe("getLoopLength", () => {
    it("should return 8", () => {
      const plan = [
        [".", ".", ".", ".", "."],
        [".", "S", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ];

      expect(getLoopLength(plan)).toEqual(8);
    });

    it("should return 16", () => {
      const plan = [
        [".", ".", "F", "7", "."],
        [".", "F", "J", "|", "."],
        ["S", "J", ".", "L", "7"],
        ["|", "F", "-", "-", "J"],
        ["L", "J", ".", ".", "."],
      ];

      expect(getLoopLength(plan)).toEqual(16);
    });
  });
});
