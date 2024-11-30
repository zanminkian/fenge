import { jsConfig } from "../js/config.js";

export const tsConfig = {
  ...jsConfig,
  name: "fenge/typescript/config",
  files: ["**/*.config.{ts,cts,mts,tsx}"],
  rules: {
    ...jsConfig.rules,
  },
} as const;
