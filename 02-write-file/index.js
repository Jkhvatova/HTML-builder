const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });
let stream = fs.createWriteStream(path.join(__dirname, "text.txt"));

const stopInput = () => {
  output.write(`Oh, that's all? See you next time!\n`);
  process.exit(0);
};
output.write("Please, write something!\n");

rl.on("line", (line) => {
  if (line === "exit") {
    stopInput();
  }
  stream.write(`${line}\n`);
});

rl.on("SIGINT", () => {
  stopInput();
});
