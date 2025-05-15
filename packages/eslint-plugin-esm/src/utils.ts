import type { Rule } from "eslint";

/**
 * Like [lodash.memoize](https://lodash.com/docs/4.17.15#memoize)
 * Type `Res` must be non-nullable, otherwise it will cause bug.
 */
export function memoize<Arg, Res extends NonNullable<unknown>>(
  fn: (arg: Arg) => Res,
): (arg: Arg) => Res {
  const cache = new Map<Arg, Res>(); // memory leak
  return (arg: Arg) => {
    const cachedResult = cache.get(arg);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

export type GetNode<T extends keyof Rule.NodeListener> = Parameters<
  NonNullable<Rule.NodeListener[T]>
>[0];
