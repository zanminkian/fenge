import { getJsEntrance } from "../js/entrance.ts";

export function getTsEntrance() {
  const jsEntrance = getJsEntrance();
  return {
    ...jsEntrance,
    name: "fenge/typescript/entrance",
    files: ["**/main.{ts,cts,mts,tsx}"],
    rules: {
      ...jsEntrance.rules,
    },
  } as const;
}
