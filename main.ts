// The joke about the demo — writes one line to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My agent's demo was so convincing that it believed its own code worked, and so did I, until production disagreed.";

const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry must be 1-280 code points, got ${codePoints}`);
}
if (!JOKE.trim()) {
  throw new Error("entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
