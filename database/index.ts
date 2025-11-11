// src/database/index.ts
import fs from "fs";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models: Record<string, any> = {};

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.endsWith(".ts") &&
      !file.endsWith(".d.ts") &&
      !file.includes("index.")
  );

for (const file of files) {
  const modulePath = path.join(__dirname, file);
  const imported = await import(modulePath);

  // Merge all exported members into models
  Object.assign(models, imported);
}

export default models;
