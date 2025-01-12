import { getJsConfig } from "../js/config.ts";

export function getTsConfig() {
  const jsConfig = getJsConfig();
  return {
    ...jsConfig,
    name: "fenge/typescript/config",
    files: ["**/*.config.{ts,cts,mts,tsx}"],
    rules: {
      ...jsConfig.rules,
    },
  } as const;
}
