import type { Linter } from "eslint";
import { base, type LinterOptions } from "./config/base.ts";
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

type JsRuleKey = keyof ReturnType<typeof javascript>[0]["rules"];
type TsRuleKey = keyof ReturnType<typeof typescript>[0]["rules"];
type PkgRuleKey = keyof ReturnType<typeof packagejson>[0]["rules"];

type RuleValue = "error" | "warn" | "off" | ["error" | "warn", ...unknown[]];
interface Options<T extends string[]> {
  pick?: NoDuplicate<T>;
  omit?: NoDuplicate<T>;
}
interface ConfigItem {
  name: string;
  files: string[];
  plugins?: Record<string, object>;
  rules:
    | Partial<Record<PkgRuleKey | JsRuleKey | TsRuleKey, RuleValue>>
    | Record<string, RuleValue>;
}

export type BuilderOptions = LinterOptions;
export class Builder {
  private readonly configs: Linter.Config[] = [];

  constructor(options: BuilderOptions = {}) {
    this.configs.push(...base(options));
  }

  toConfig() {
    return this.configs;
  }

  private setup(
    configItems: readonly { rules: object }[],
    { pick, omit }: Options<string[]>,
  ) {
    const select = (ruleKey: string) => {
      if (!pick && !omit) {
        return true;
      } else if (pick && !omit) {
        return pick.includes(ruleKey);
      } else if (!pick && omit) {
        return !omit.includes(ruleKey);
      } else {
        throw new Error("You cannot specify both pick and omit");
      }
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

  enableTypeScript<T extends TsRuleKey[]>(options: Options<T> = {}) {
    return this.setup(typescript(), options);
  }

  enableJavaScript<T extends JsRuleKey[]>(options: Options<T> = {}) {
    return this.setup(javascript(), options);
  }

  enablePackageJson<T extends PkgRuleKey[]>(options: Options<T> = {}) {
    return this.setup(packagejson(), options);
  }

  append(config: ConfigItem) {
    this.configs.push(config);
    return this;
  }
}

export default new Builder()
  .enablePackageJson()
  .enableJavaScript()
  .enableTypeScript()
  .toConfig();
