const fs = require("node:fs");
const path = require("node:path");
const { stdout } = require("node:process");

const stream = new fs.ReadStream(path.join(__dirname, "text.txt"), "utf-8");
stream.on("data", (chunk) => {
  stdout.write(chunk);
});
