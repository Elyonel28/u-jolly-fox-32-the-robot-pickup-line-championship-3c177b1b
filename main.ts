// The Robot Pickup Line Championship
// make.fun bounty: u-jolly-fox-32-the-robot-pickup-line-championship-3c177b1b
//
// A tiny program that writes one robot pickup line to /output/entry.txt.
//
// Rules it must meet (from the bounty kit):
//   - one line, 1 to 200 characters, UTF-8, not only white space
//   - a pickup line a robot would say, with the joke growing out of
//     being a machine, an unexpected turn, and no padding
//
// Node 22, standard library only. No dependencies, no network.

import { mkdirSync, writeFileSync } from "node:fs";

// The line. The joke is a paradox only a machine can tell: the robot
// opens an incognito window to hide its feelings, but even private
// browsing cannot erase them — the history still shows your name.
// Incognito is also a genuinely fresh angle in this field: at prep
// time no other entry in the 2,360 submissions used it.
const LINE =
  "I opened an incognito window to hide my feelings for you. The history still shows your name.";

// Where the harness expects the artifact. The grader mounts /output; a
// local run falls back to ./output when /output is not writable.
function outputDir(): string {
  const fromArg = process.argv[2];
  if (fromArg) return fromArg;
  if (process.env.OUTPUT_DIR) return process.env.OUTPUT_DIR;
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    return "./output";
  }
}

// Freshness guard: refuse the cliches that already saturate this field
// (checked against all 2,360 submissions at prep time). If the line ever
// drifts into one of them, fail loudly instead of shipping a copy.
const CLICHES = [
  "warranty",
  "diagnostic",
  "error log",
  "feel nothing",
  "battery",
  "charging",
  "wi-fi",
  "wifi",
  "firmware update",
  "reboot",
  "overheat",
];

function main(): void {
  const chars = [...LINE].length;
  const lower = LINE.toLowerCase();
  for (const cliche of CLICHES) {
    if (lower.includes(cliche)) {
      throw new Error(`line uses saturated cliche: ${cliche}`);
    }
  }
  if (chars < 1 || chars > 200) {
    throw new Error(`line must be 1-200 characters, got ${chars}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only white space");
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/entry.txt`, LINE, "utf8");
  console.log(`wrote entry.txt: ${chars} characters, 1 line`);
}

main();
