const fs = require("node:fs");
const promises = require("node:fs/promises");
const path = require("node:path");
async function copyDir() {
  promises.mkdir(__dirname + "/files-copy", { recursive: true });
  const sourceDir = path.join(__dirname, "files/");
  const targetDir = path.join(__dirname, "files-copy/");
  const sourceFiles = await promises.readdir(sourceDir);
  const targetFiles = await promises.readdir(targetDir);
  targetFiles.forEach((file) => {
    fs.unlink(path.join(targetDir, file), (err) => {
      if (err) throw err;
    });
  });
  sourceFiles.forEach((file) => {
    try {
      promises.copyFile(path.join(sourceDir, file), path.join(targetDir, file));
    } catch (err) {
      console.error(err);
    }
  });
}
copyDir();
