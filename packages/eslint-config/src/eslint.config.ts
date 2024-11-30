import { base } from "./config/base.js";
import { javascript } from "./config/javascript.js";
import { packagejson } from "./config/packagejson.js";
import { typescript } from "./config/typescript.js";

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

interface Options<T extends string[]> {
  pick?: NoDuplicate<T>;
  omit?: NoDuplicate<T>;
  extend?: Record<
    string,
    "error" | "warn" | "off" | ["error" | "warn", ...unknown[]]
  >;
  override?: Partial<
    Record<
      T[number],
      "error" | "warn" | "off" | ["error" | "warn", ...unknown[]]
    >
  >;
}

export class Builder {
  private readonly configs: object[] = [...base()];

  toConfig() {
    return this.configs;
  }

  private setup(
    [mainConfig, ...otherConfigs]: readonly [
      { plugins: object; rules: object },
      ...object[],
    ],
    { pick, omit, extend = {}, override = {} }: Options<string[]>,
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
    const rules = Object.fromEntries(
      Object.entries(mainConfig.rules).filter(([ruleKey]) => select(ruleKey)),
    );
    // check `override` field
    Object.keys(override).forEach((key) => {
      if (!(key in rules)) {
        throw new Error(`The overriding rule key ${key} is not existing.`);
      }
    });
    // check `extend` field
    Object.keys(extend).forEach((key) => {
      if (key in rules) {
        throw new Error(`The extending rule key ${key} is already existing.`);
      }
      if (key.includes("/")) {
        const pluginName = key.split("/")[0];
        if (!pluginName)
          throw new Error(`The extending rule key '${key}' is invalid`);
        if (!(pluginName in mainConfig.plugins)) {
          const supportedPlugins = Object.keys(mainConfig.plugins)
            .map((k) => `'${k}'`)
            .join(",");
          throw new Error(
            `The plugin name '${pluginName}' of extending rule key '${key}' is not supported. Only ${supportedPlugins} plugins are supported.`,
          );
        }
      }
    });
    this.configs.push(
      { ...mainConfig, rules: { ...rules, ...override, ...extend } },
      ...otherConfigs,
    );
    return this;
  }

  enableTypescript<T extends TsRuleKey[]>(options: Options<T> = {}) {
    return this.setup(typescript(), options);
  }

  enableJavascript<T extends JsRuleKey[]>(options: Options<T> = {}) {
    return this.setup(javascript(), options);
  }

  enablePackagejson<T extends PkgRuleKey[]>(options: Options<T> = {}) {
    return this.setup(packagejson(), options);
  }
}

export default new Builder()
  .enablePackagejson()
  .enableJavascript()
  .enableTypescript()
  .toConfig();
