import type { AST } from "jsonc-eslint-parser";

export function getReportingNode(
  node: AST.JSONNode,
  paths: string[],
): AST.JSONNode {
  const [field, ...restPaths] = paths;
  if (!field) {
    return node;
  }
  let next: AST.JSONNode | undefined = undefined;
  if (node.type === "JSONObjectExpression") {
    const property = node.properties.find(
      (property) =>
        "key" in property &&
        "value" in property.key &&
        property.key.value === field,
    );
    if (property) {
      next = property.value;
    }
  } else if (node.type === "JSONArrayExpression") {
    const element = node.elements[Number(field)];
    if (element) {
      next = element;
    }
  }
  if (!next) {
    return node;
  }
  return getReportingNode(next, restPaths);
}
