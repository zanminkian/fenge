import path from "node:path";
import process from "node:process";
import { isValidSemVer } from "../common.ts";

export const name = "required-dev-engines";
export const rule = {
  meta: {
    messages: {
      missingField: "Missing required field: {{ field }}",
      invalidSemVer: "Invalid SemVer version for `packageManager.version`",
      invalidOnFail: "`onFail` must be `error` if present",
    },
    docs: {
      description:
        "`devEngines` field is required in the root package.json and must contain `runtime` and `packageManager` with `name` and `version` properties. If `onFail` is present, it must be `error`. The `version` in `packageManager` must be a valid SemVer.",
    },
  },
  create: (context) => {
    if (context.filename !== path.join(process.cwd(), "package.json")) {
      return {};
    }
    return {
      "Program > JSONExpressionStatement > JSONObjectExpression": (node) => {
        // 1. check required fields
        const devEngines = checkAndGet(node, "devEngines", context);
        if (!devEngines) {
          return;
        }
        const packageManager = checkAndGet(
          devEngines,
          "packageManager",
          context,
        );
        if (!packageManager) return;
        const runtime = checkAndGet(devEngines, "runtime", context);
        if (!runtime) return;

        checkAndGet(runtime, "name", context);
        checkAndGet(runtime, "version", context);
        checkAndGet(packageManager, "name", context);
        const pmVersion = checkAndGet(packageManager, "version", context);

        // 2. check `packageManager.version`
        if (pmVersion && !isValidSemVer(pmVersion.value)) {
          return context.report({
            node: pmVersion,
            messageId: "invalidSemVer",
          });
        }

        // 3. check `onFail`
        [checkAndGet(runtime, "onFail"), checkAndGet(packageManager, "onFail")]
          .filter((onFail) => !!onFail)
          .forEach((onFail) => {
            if (onFail.value !== "error")
              context.report({
                node: onFail,
                messageId: "invalidOnFail",
              });
          });
      },
    };
  },
};

function checkAndGet(obj, property, context) {
  const foundProperty =
    obj.type !== "JSONObjectExpression"
      ? undefined
      : obj.properties.find((p) => p.key.value === property);
  if (!foundProperty) {
    context?.report({
      node: obj,
      messageId: "missingField",
      data: { field: property },
    });
    return undefined;
  }

  return foundProperty.value;
}
