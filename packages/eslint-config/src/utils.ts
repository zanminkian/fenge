import fs from "node:fs/promises";

export async function exists(filepath: string) {
  return await fs
    .access(filepath)
    .then(() => true)
    .catch(() => false);
}
