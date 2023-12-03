const { exec } = require("child_process");

const directoryNumber = process.argv[2];

if (!directoryNumber) {
  console.error("Please provide a directory number as an argument.");
  process.exit(1);
}

const scriptPath = `./src/${directoryNumber}/index.ts`;

exec(`ts-node ${scriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running script: ${error.message}`);
    console.error(stderr);
    process.exit(1);
  }

  console.log(stdout);
});
