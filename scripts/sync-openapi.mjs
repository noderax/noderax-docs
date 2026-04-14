import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const docsRoot = resolve(import.meta.dirname, "..");
const apiRoot = resolve(docsRoot, "../noderax-api");
const sourceFile = resolve(apiRoot, "openapi/openapi.json");
const destinationFile = resolve(docsRoot, "openapi/openapi.json");

if (existsSync(resolve(apiRoot, "package.json"))) {
  execFileSync("pnpm", ["openapi:export"], {
    cwd: apiRoot,
    stdio: "inherit",
  });
}

if (!existsSync(sourceFile)) {
  throw new Error(
    `OpenAPI export not found at ${sourceFile}. Run pnpm --dir ../noderax-api openapi:export first.`,
  );
}

mkdirSync(dirname(destinationFile), { recursive: true });
copyFileSync(sourceFile, destinationFile);

console.log(`Copied OpenAPI schema to ${destinationFile}`);
