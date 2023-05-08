const fs = require("node:fs");
const promises = require("node:fs/promises");
const path = require("node:path");
export async function makeCssBundle() {
  const sourceCssFiles = await promises.readdir(path.join(__dirname, "styles"));
  const bundle = fs.createWriteStream(
    path.join(__dirname, "project-dist", "bundle.css")
  );
  for (const file of sourceCssFiles) {
    if (path.extname(file).slice(1) === "css") {
      fs.createReadStream(path.join(__dirname, "styles", file)).pipe(bundle);
    }
  }
}
makeCssBundle();
