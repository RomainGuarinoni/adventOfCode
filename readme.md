# Advent Of Code

My solutions of the [advent of code](https://adventofcode.com/)

## How to get result of a specific day

To get the result of a specific day, run the following command:

```shell
npm run eval <day>
```

for example, with the day 1 :

```shell
npm run eval 1
```

## How the code is done

Under the `src` folders, you have a folder for each day

Each folders have the same files inside:

- **inputs.json**: The data used to compute the results in a json format
- **index.ts**: The file where the response for the day are computed
- **helpers.ts**: All the helpers used to compute the results
- **helpers.test.ts**: All the unit and e2e tests for the helpers
- **types.ts** _(optionnal)_ the types for the helpers, if needed
- **contants.ts** _(optionnal)_: the constants for the helpers, if needed
