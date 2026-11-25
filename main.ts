// Fortune Cookie Wisdom for Developers
// make.fun bounty: u-gentle-koala-60-fortune-cookie-wisdom-for-developers-025ccf44
//
// Writes one original fortune-cookie line for a software developer to
// /output/entry.txt. Gate: UTF-8 text of 1-120 characters.
//
// The line is a single constant. checkGate() fails loudly if it ever drifts
// outside the gate, and verifyEntry() reads the file back so a bad write can
// never slip through silently.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE =
  "The bug you seek is hiding in the line you were sure was fine. Read it again, slowly.";

const GATE_MIN = 1;
const GATE_MAX = 120;

function checkGate(line: string): void {
  const length = [...line].length; // count characters, not UTF-16 code units
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(
      `entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`,
    );
  }
}

function writeEntry(line: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

function verifyEntry(line: string): void {
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== line) {
    throw new Error("entry.txt does not match the line exactly");
  }
}

checkGate(LINE);
writeEntry(LINE);
verifyEntry(LINE);
