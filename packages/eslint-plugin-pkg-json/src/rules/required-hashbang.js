// As a result, if the bin file have no executable permission, the cli package works well in npm and pnpm.
// Therefore, checking the bin file starting with hashbang is enough.
import fs from "node:fs";
import path from "node:path";

export const name = "required-hashbang";
export const rule = {
  meta: {
    docs: {
      description: "The bin file should starts with a hashbang",
    },
  },
  create: (context) => ({
    "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
      const bin = node.properties.find((p) => p.key.value === "bin");
      if (!bin) {
        return;
      }
      if (bin.value.type === "JSONLiteral") {
        if (typeof bin.value.value !== "string") {
          return reportNotStandard(context, bin.value);
        }
        if (!isValidBinPath(context.filename, bin.value.value)) {
          return reportInvalidBinPath(context, bin.value);
        }
      } else if (bin.value.type === "JSONObjectExpression") {
        bin.value.properties.forEach((property) => {
          if (typeof property.value.value !== "string") {
            return reportNotStandard(context, property.value);
          }
          if (!isValidBinPath(context.filename, property.value.value)) {
            return reportInvalidBinPath(context, property.value);
          }
        });
      } else {
        return reportNotStandard(context, bin);
      }
    },
  }),
};

function reportNotStandard(context, node) {
  context.report({
    node,
    message:
      "The `bin` field should be a string or an object whose values are strings",
  });
}

function reportInvalidBinPath(context, node) {
  context.report({
    node,
    message: "The bin file should starts with a hashbang",
  });
}

function isValidBinPath(filename, binPath) {
  const filePath = path.resolve(path.dirname(filename), binPath);
  try {
    return fs.readFileSync(filePath, "utf8").trimStart().startsWith("#!");
  } catch {
    return false;
  }
}
