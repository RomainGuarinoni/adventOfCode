import * as fs from "fs";
import * as path from "path";

const SRC_DIR = "./src";

const nbDirectories = fs
  .readdirSync(SRC_DIR, { withFileTypes: true })
  .filter((file) => file.isDirectory() && file.name !== "scripts").length;

const newDirectoryName = nbDirectories + 1;

console.log(`Create files for Day ${newDirectoryName}`);

const newDirectoryPath = path.join(SRC_DIR, newDirectoryName.toString());

const INDEX_CONTENT = `import {inputs} from "./inputs.json"

const firstFinalNumber = 0;

console.log("First part day ${newDirectoryName} response", firstFinalNumber);

const secondFinalNumber = 0;

console.log("Second part day ${newDirectoryName} response", secondFinalNumber);
`;

const INPUTS_CONTENT = `
{
  "inputs" : []
}
`;

const HELPERS_TEST_CONTENT = `
describe("Day ${newDirectoryName}",()=>{
  
})
`;

fs.mkdirSync(newDirectoryPath);

fs.writeFileSync(path.join(newDirectoryPath, "index.ts"), INDEX_CONTENT);
fs.writeFileSync(path.join(newDirectoryPath, "inputs.json"), INPUTS_CONTENT);
fs.writeFileSync(path.join(newDirectoryPath, "helpers.ts"), "");
fs.writeFileSync(path.join(newDirectoryPath, "types.ts"), "");
fs.writeFileSync(path.join(newDirectoryPath, "constants.ts"), "");
fs.writeFileSync(
  path.join(newDirectoryPath, "helpers.test.ts"),
  HELPERS_TEST_CONTENT
);

console.log(`Day ${newDirectoryName} is ready, lets code !!`);
