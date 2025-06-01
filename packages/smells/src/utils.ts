import { globby } from "globby";

export function isJs(file: string) {
  return /\.(js|mjs|cjs|jsx)$/.test(file);
}

export function isTs(file: string) {
  return /\.(ts|mts|cts|tsx)$/.test(file);
}

export function isDts(file: string) {
  return /\.d\.(ts|mts|cts|tsx)$/.test(file);
}

export async function walkDir(
  pattern: string,
  ignore: string | undefined,
  cb: (file: string) => Promise<void>,
) {
  const promises = (
    await globby(pattern, {
      absolute: true,
      gitignore: true,
      ...(!!ignore && { ignore: [ignore] }),
    })
  )
    .filter((filePath) => isJs(filePath) || isTs(filePath))
    .map(async (filePath) => await cb(filePath));
  await Promise.all(promises);
}
