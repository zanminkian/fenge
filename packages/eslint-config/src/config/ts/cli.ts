import { getJsCli } from "../js/cli.js";

export function getTsCli() {
  const jsCli = getJsCli();
  return {
    ...jsCli,
    name: "fenge/typescript/cli",
    files: ["**/*.cli.{ts,cts,mts,tsx}"],
    rules: {
      ...jsCli.rules,
    },
  } as const;
}
