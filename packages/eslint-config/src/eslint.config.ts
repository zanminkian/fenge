import type { Linter } from "eslint";
import { base, type BaseOptions } from "./config/base.ts";
import { html } from "./config/html.ts";
import { javascript } from "./config/javascript.ts";
import { packagejson } from "./config/packagejson.ts";
import { typescript } from "./config/typescript.ts";

type NoDuplicate<A extends unknown[]> = {
  [I in keyof A]: true extends {
    [J in keyof A]: J extends I ? false : A[J] extends A[I] ? true : false;
  }[number]
    ? never
    : A[I];
};

type OriginJsRuleKey = keyof ReturnType<typeof javascript>[0]["rules"];
type OriginTsRuleKey = keyof ReturnType<typeof typescript>[0]["rules"];
type OriginPkgRuleKey = keyof ReturnType<typeof packagejson>[0]["rules"];
type OriginHtmlRuleKey = keyof ReturnType<typeof html>[0]["rules"];

type GetPlugins<T extends string> = T extends `${infer Left}/${string}`
  ? Left
  : never;

type JsRuleKey = OriginJsRuleKey | `${GetPlugins<OriginJsRuleKey>}/*`;
type TsRuleKey = OriginTsRuleKey | `${GetPlugins<OriginTsRuleKey>}/*`;
type PkgRuleKey = OriginPkgRuleKey | `${GetPlugins<OriginPkgRuleKey>}/*`;
type HtmlRuleKey = OriginHtmlRuleKey | `${GetPlugins<OriginHtmlRuleKey>}/*`;

type RuleValue = "error" | "warn" | "off" | ["error" | "warn", ...unknown[]];
interface Options<P extends string[], O extends string[]> {
  pick?: NoDuplicate<P>;
  omit?: NoDuplicate<O>;
}
interface ConfigItem {
  name?: string;
  files?: string[];
  plugins?: Record<string, object>;
  rules:
    | Partial<Record<PkgRuleKey | JsRuleKey | TsRuleKey, RuleValue>>
    | Record<string, RuleValue>;
}

export type LinterConfig = Linter.Config;
export type BuilderOptions = BaseOptions;
export class Builder {
  private readonly configs: LinterConfig[] = [];
  private readonly options: BuilderOptions;

  private readonly enabled = new Set<"js" | "ts" | "pkg" | "html">();

  constructor(options: BuilderOptions = {}) {
    this.options = options;
  }

  toConfig(): LinterConfig[] {
    return [...base(this.options, this.enabled), ...this.configs];
  }

  private setup(
    configItems: readonly { rules: object }[],
    { pick, omit }: Options<string[], string[]>,
  ) {
    const match = (pattern: string, ruleKey: string) => {
      if (pattern === ruleKey) return true;
      if (pattern.endsWith("/*"))
        return ruleKey.startsWith(pattern.slice(0, -1));
      return false;
    };
    const select = (ruleKey: string) => {
      let result = true;
      if (pick) {
        result &&= pick.some((pattern) => match(pattern, ruleKey));
      }
      if (omit) {
        result &&= !omit.some((pattern) => match(pattern, ruleKey));
      }
      return result;
    };
    const result = configItems.map((configItem) => ({
      ...configItem,
      rules: Object.fromEntries(
        Object.entries(configItem.rules).filter(([ruleKey]) => select(ruleKey)),
      ),
    }));
    this.configs.push(...result);

    return this;
  }

  // We must use generics instead of removing them and directly using `options: Options<TsRuleKey[], TsRuleKey[]>`,
  // otherwise `NoDuplicate` will not work, allowing users to pass duplicate values, e.g.: `enableTypeScript({ pick: ['no-var', 'no-var'] })`
  enableTypeScript<P extends TsRuleKey[], O extends TsRuleKey[]>(
    options: Options<P, O> = {},
  ) {
    this.enabled.add("ts");
    return this.setup(typescript(), options);
  }

  enableJavaScript<P extends JsRuleKey[], O extends JsRuleKey[]>(
    options: Options<P, O> = {},
  ) {
    this.enabled.add("js");
    return this.setup(javascript(), options);
  }

  enablePackageJson<P extends PkgRuleKey[], O extends PkgRuleKey[]>(
    options: Options<P, O> = {},
  ) {
    this.enabled.add("pkg");
    return this.setup(packagejson(), options);
  }

  enableHtml<P extends HtmlRuleKey[], O extends HtmlRuleKey[]>(
    options: Options<P, O> = {},
  ) {
    this.enabled.add("html");
    return this.setup(html(), options);
  }

  enableAll<
    HP extends HtmlRuleKey[],
    HO extends HtmlRuleKey[],
    PP extends PkgRuleKey[],
    PO extends PkgRuleKey[],
    JP extends JsRuleKey[],
    JO extends JsRuleKey[],
    TP extends TsRuleKey[],
    TO extends TsRuleKey[],
  >(options?: {
    html?: Options<HP, HO>;
    packagejson?: Options<PP, PO>;
    javascript?: Options<JP, JO>;
    typescript?: Options<TP, TO>;
  }) {
    return this.enableHtml(options?.html)
      .enablePackageJson(options?.packagejson)
      .enableJavaScript(options?.javascript)
      .enableTypeScript(options?.typescript);
  }

  append(config: ConfigItem) {
    this.configs.push(config);
    return this;
  }
}

export default new Builder().enableAll().toConfig();
