import path from "node:path";
import process from "node:process";

export const name = "required-dev-engines";
export const rule = {
  meta: {
    messages: {
      missingField: "Missing required field: {{ field }}",
      invalidOnFail: "`onFail` must be `error` if present",
    },
    docs: {
      description:
        "`devEngines` field is required in the root package.json and must contain `runtime` and `packageManager` with `name` and `version` properties. If `onFail` is present, it must be `error`.",
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

        // Check required fields for runtime
        (runtime.type === "JSONArrayExpression"
          ? runtime.elements
          : [runtime]
        ).forEach((element) => {
          checkAndGet(element, "name", context);
          checkAndGet(element, "version", context);
        });
        // Check required fields for packageManager
        (packageManager.type === "JSONArrayExpression"
          ? packageManager.elements
          : [packageManager]
        ).forEach((element) => {
          checkAndGet(element, "name", context);
          checkAndGet(element, "version", context);
        });

        // 2. check `onFail`
        const onFailNodes = [];
        // Collect onFail nodes from runtime
        (runtime.type === "JSONArrayExpression"
          ? runtime.elements
          : [runtime]
        ).forEach((element) => {
          const onFail = checkAndGet(element, "onFail");
          if (onFail) onFailNodes.push(onFail);
        });
        // Collect onFail nodes from packageManager
        (packageManager.type === "JSONArrayExpression"
          ? packageManager.elements
          : [packageManager]
        ).forEach((element) => {
          const onFail = checkAndGet(element, "onFail");
          if (onFail) onFailNodes.push(onFail);
        });
        // Validate all onFail values
        onFailNodes
          .filter((onFail) => onFail.value !== "error")
          .forEach((onFail) => {
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
