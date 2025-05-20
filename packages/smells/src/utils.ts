import { globby } from "globby";

export function isTs(file: string) {
  return /\.(ts|mts|cts|tsx)$/.test(file);
}

export function isJs(file: string) {
  return /\.(js|mjs|cjs|jsx)$/.test(file);
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
    .map((filePath) => cb(filePath));
  await Promise.all(promises);
}
