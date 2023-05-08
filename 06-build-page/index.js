const fs = require("node:fs");
const path = require("node:path");
const promises = require("node:fs/promises");

const source = path.join(__dirname, "assets/");
const target = path.join(__dirname, "project-dist", "assets/");

async function copyFolders(source, target) {
  await promises.rm(target, { recursive: true, force: true });
  await promises.mkdir(target, { recursive: true });
  const sourceFiles = await promises.readdir(source, { withFileTypes: true });
  for (const file of sourceFiles) {
    try {
      if (file.isFile()) {
        await promises.copyFile(
          path.join(source, file.name),
          path.join(target, file.name)
        );
      } else {
        copyFolders(path.join(source, file.name), path.join(target, file.name));
      }
    } catch (err) {
      console.error(err);
    }
  }
}

async function mergeCss() {
  try {
    const files = await promises.readdir(path.join(__dirname, "styles"));
    const stream = fs.createWriteStream(
      path.join(__dirname, "project-dist", "style.css")
    );
    for (const file of files) {
      if (path.extname(file).slice(1) === "css") {
        fs.createReadStream(path.join(__dirname, "styles", file)).pipe(stream);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function replaceComponent(component) {
  try {
    const componentData = await promises.readFile(
      path.join(__dirname, "components", component),
      { encoding: "utf-8" }
    );
    return componentData;
  } catch (err) {
    console.error(err);
  }
}

async function buildTemplate() {
  try {
    const outputHtml = path.join(__dirname, "project-dist", "index.html");
    const template = path.join(__dirname, "template.html");
    const components = await promises.readdir(
      path.join(__dirname, "components")
    );
    let templateData = await promises.readFile(template, "utf8");
    for (const component of components) {
      const name = path.parse(component).name;
      const templateName = `{{${name}}}`;
      if (path.extname(component).slice(1) === "html") {
        const textComponent = await replaceComponent(component);
        templateData = templateData.replace(templateName, textComponent);
      }
    }

    fs.writeFile(outputHtml, templateData, function (err) {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function buildPage() {
  try {
    await promises.mkdir(path.join(__dirname, "/project-dist"), {
      recursive: true,
    });
    copyFolders(source, target);
    buildTemplate();
    mergeCss();
  } catch (err) {
    console.log(err);
  }
}

buildPage();
