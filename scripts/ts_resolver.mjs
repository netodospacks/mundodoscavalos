import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

export async function resolve(specifier, context, nextResolve) {
  // Trata alias @/
  if (specifier.startsWith("@/")) {
    const subpath = specifier.slice(2);
    const candidateTs = path.join(srcDir, subpath + ".ts");
    const candidateTsx = path.join(srcDir, subpath + ".tsx");
    const candidateIndex = path.join(srcDir, subpath, "index.ts");

    if (fs.existsSync(candidateTs)) {
      return nextResolve(pathToFileURL(candidateTs).href, context);
    }
    if (fs.existsSync(candidateTsx)) {
      return nextResolve(pathToFileURL(candidateTsx).href, context);
    }
    if (fs.existsSync(candidateIndex)) {
      return nextResolve(pathToFileURL(candidateIndex).href, context);
    }
  }

  // Trata caminhos relativos sem extensão
  const { parentURL } = context;
  if (parentURL && (specifier.startsWith("./") || specifier.startsWith("../"))) {
    try {
      const targetUrl = new URL(specifier, parentURL);
      const targetPath = fileURLToPath(targetUrl);
      if (fs.existsSync(targetPath + ".ts")) {
        return nextResolve(targetUrl.href + ".ts", context);
      }
      if (fs.existsSync(targetPath + ".tsx")) {
        return nextResolve(targetUrl.href + ".tsx", context);
      }
      if (fs.existsSync(path.join(targetPath, "index.ts"))) {
        return nextResolve(new URL(specifier + "/index.ts", parentURL).href, context);
      }
    } catch {}
  }

  return nextResolve(specifier, context);
}
