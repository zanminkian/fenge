import fs from "node:fs";
import path from "node:path";

export function isWorkspaceRootPkg(pkgPath: string) {
  const dir = path.dirname(pkgPath);
  return (
    !!JSON.parse(fs.readFileSync(pkgPath, "utf8")).workspaces ||
    fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) ||
    fs.existsSync(path.join(dir, "pnpm-workspace.yml"))
  );
}

export function isValidSemVer(version: unknown) {
  if (typeof version !== "string") return false;
  // https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(
    version,
  );
}
