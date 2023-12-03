export const getNumberFromInput = (
  input: string,
  position: "first" | "last"
) => {
  const stringArray = input.split("");
  const stringValues =
    position === "first" ? stringArray : stringArray.reverse();

  return stringValues.find((value) => !isNaN(Number.parseInt(value)));
};

export const getValueFromInput = (input: string) =>
  Number.parseInt(
    `${getNumberFromInput(input, "first")}${getNumberFromInput(input, "last")}`
  );

export const getFinalNumberFromInputs = (inputs: string[]) =>
  inputs.map(getValueFromInput).reduce((acc, curr) => acc + curr, 0);
