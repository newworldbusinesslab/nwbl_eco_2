import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const [destination, option] = process.argv.slice(2);
if (!destination || (option && option !== "--check")) {
  throw new Error("Usage: node scripts/sync-sites.mjs EXISTING_NWBL_SITE [--check]");
}
const target = resolve(destination);
const config = JSON.parse(readFileSync(join(target, "site.config.json"), "utf8"));
if (config.brand !== "nwbl" || !existsSync(join(target, ".openai/hosting.json"))) {
  throw new Error("Choose the existing main NWBL Sites checkout.");
}

const shared = [
  "public/images", "public/motion", "quantum", "src/data", "src/types",
  "src/components/cards", "src/components/guide", "src/components/layout",
  "src/components/research", "src/components/sections", "src/components/shared",
  "src/components/visuals", "src/lib/guide-directory.ts", "src/lib/guide-server.ts",
  "src/app/globals.css", "src/app/page.tsx", "docs/extending-the-lab.md",
];
const names = execFileSync("git", ["ls-files", "-z", "--", ...shared], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
const changed = [];
for (const name of names) {
  const source = join(root, name), dest = join(target, name);
  if (existsSync(dest) && readFileSync(source).equals(readFileSync(dest))) continue;
  changed.push(name);
  if (option !== "--check") {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(source, dest);
  }
}
if (option === "--check" && changed.length) {
  console.error("Different shared files:\n" + changed.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`${names.length} shared files checked, ${changed.length} copied.`);
}
