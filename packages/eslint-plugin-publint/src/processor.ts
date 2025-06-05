import type { Linter } from "eslint";

export const processor: Linter.Processor = {
  preprocess: (text) => [`(${text})`],
  postprocess: (messages) => messages.flat(),
};
