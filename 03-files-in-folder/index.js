const fs = require("node:fs");
const promises = require("node:fs/promises");
const path = require("node:path");

const folderPath = path.join(__dirname, "secret-folder/");
promises.readdir(folderPath, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    const filePath = `${folderPath}${file.name}`;
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(err);
      } else {
        if (stats.isFile()) {
          console.log(
            `${path.parse(filePath).name} - ${path
              .extname(filePath)
              .slice(1)} - ${stats.size}b`
            // `${path.parse(file).name} - ${path.extname(file).slice(1)} - ${
            //   stats.size
            // }b`
          );
        }
      }
    });
  });
});
