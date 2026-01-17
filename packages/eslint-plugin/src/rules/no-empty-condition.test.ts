import { test } from "@fenge/dev-utils";
import { noEmptyCondition } from "./no-empty-condition.ts";

const valid = [
  "for(let i = 0; i < 10; i++) {}",
  "for(let i = 0; i < arr.length; i++) {}",
  "for(; condition; ) {}",
  "for(let i = 0; someCondition(); i++) {}",
  "while(condition) {}",
  "for(const item of items) {}",
  "for(let i = 0; true; i++) {}",
  "for(let i = 0; 1; i++) {}",
  "for(let i = 0; 'string'; i++) {}",
];

const invalid = [
  "for(let i = 0; ; i++) {}",
  "for(; ; ) {}",
  "for(let i = 0; ; ) {}",
  "for(; ; i++) {}",
  "for(let i = 0; ''; i++) {}",
  "for(let i = 0; 0; i++) {}",
  "for(let i = 0; false; i++) {}",
  "for(let i = 0; null; i++) {}",
  "for(let i = 0; undefined; i++) {}",
];

test({ valid, invalid, ...noEmptyCondition });
