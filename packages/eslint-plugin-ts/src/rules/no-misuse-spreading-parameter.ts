import {
  ESLintUtils,
  type ParserServicesWithTypeInformation,
} from "@typescript-eslint/utils";
import type { Rule } from "eslint";
import type ts from "typescript";
import { getRuleName, type GetNode } from "../utils.ts";

type CallExpression = GetNode<"CallExpression">;
type NewExpression = GetNode<"NewExpression">;

const name = getRuleName(import.meta.url);
const rule: Rule.RuleModule = {
  meta: {
    messages: {
      default:
        "Disallow spreading parameter when the corresponding place in the function definition is not a rest parameter.",
    },
  },
  create: (context) => {
    let parserServices: ParserServicesWithTypeInformation | undefined =
      undefined;
    let checker: ts.TypeChecker | undefined = undefined;
    const isSpreadingParameter = (
      node: CallExpression | NewExpression,
      index: number,
    ) => {
      parserServices ??= ESLintUtils.getParserServices(context as any);
      checker ??= parserServices.program.getTypeChecker();

      const dotDotDot = checker
        .getResolvedSignature(
          parserServices.esTreeNodeToTSNodeMap.get(node as any) as
            | ts.CallExpression
            | ts.NewExpression,
        )
        ?.getDeclaration()
        .parameters.at(index)?.dotDotDotToken;
      // Using `dotDotDot?.kind === ts.SyntaxKind.DotDotDotToken` is the best. But relying ts is not good.
      return typeof dotDotDot?.kind === "number";
    };

    const handle = (node: CallExpression | NewExpression) => {
      node.arguments.forEach((arg, index) => {
        if (
          arg.type === "SpreadElement" &&
          !isSpreadingParameter(node, index)
        ) {
          context.report({ node: arg, messageId: "default" });
        }
      });
    };

    return {
      CallExpression: handle,
      NewExpression: handle,
    };
  },
};

export const noMisuseSpreadingParameter = { name, rule };
