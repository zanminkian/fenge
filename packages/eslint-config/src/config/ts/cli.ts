import { jsCli } from "../js/cli.js";

export const tsCli = {
  ...jsCli,
  name: "fenge/typescript/cli",
  files: ["**/*.cli.{ts,cts,mts,tsx}"],
  rules: {
    ...jsCli.rules,
  },
} as const;
