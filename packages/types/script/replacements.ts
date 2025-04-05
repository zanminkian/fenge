const reflectReplacements = [
  // Reflect.apply
  {
    file: "lib.es2015.reflect.d",
    searchValue:
      "function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;",
    replaceValue:
      "// function apply(target: Function, thisArgument: any, argumentsList: ArrayLike<any>): any;",
  },
  // Reflect.deleteProperty
  {
    file: "lib.es2015.reflect.d",
    searchValue:
      "function deleteProperty(target: object, propertyKey: PropertyKey): boolean;",
    replaceValue:
      "function deleteProperty<T extends object>(target: T, propertyKey: keyof T): boolean;",
  },
  // Reflect.get
  {
    file: "lib.es2015.reflect.d",
    searchValue: `function get<T extends object, P extends PropertyKey>(
        target: T,
        propertyKey: P,
        receiver?: unknown,
    ): P extends keyof T ? T[P] : any;`,
    replaceValue: `function get<T extends object, P extends PropertyKey>(
        target: T,
        propertyKey: P,
        receiver?: unknown,
    ): P extends keyof T ? T[P] : unknown;`,
  },
  // Reflect.set
  {
    file: "lib.es2015.reflect.d",
    searchValue:
      "function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;",
    replaceValue:
      "// function set(target: object, propertyKey: PropertyKey, value: any, receiver?: any): boolean;",
  },
];

const promiseReplacements = [
  // new Promise
  {
    file: "lib.es2015.promise.d",
    searchValue:
      "new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;",
    replaceValue:
      "new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: Error) => void) => void): Promise<T>;",
  },
  // Promise.reject
  {
    file: "lib.es2015.promise.d",
    searchValue: "reject<T = never>(reason?: any): Promise<T>;",
    replaceValue: "reject<T = never>(reason?: Error): Promise<T>;",
  },
  // Promise.then
  {
    file: "lib.es5.d",
    searchValue:
      "then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;",
    replaceValue:
      "then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;",
  },
  // Promise.catch
  {
    file: "lib.es5.d",
    searchValue:
      "catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;",
    replaceValue:
      "catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;",
  },
];

const containerReplacements = [
  // Array.isArray
  {
    file: "lib.es5.d",
    searchValue: "isArray(arg: any): arg is any[];",
    replaceValue: "isArray(arg: any): arg is unknown[];",
  },
  // new Map
  {
    file: "lib.es2015.iterable.d",
    searchValue: "new (): Map<any, any>;",
    replaceValue: "new (): Map<unknown, unknown>;",
  },
  // new Map. Removing this should work. To be on the safe side, we'll leave it in
  {
    file: "lib.es2015.collection.d",
    searchValue: "new (): Map<any, any>;",
    replaceValue: "new (): Map<unknown, unknown>;",
  },
];

const jsonReplacements = [
  // JSON.parse
  {
    file: "lib.es5.d",
    searchValue:
      "parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;",
    replaceValue:
      "parse(text: string, reviver?: (this: any, key: string, value: any) => any): unknown;",
  },
];

export const replacements: {
  file: string;
  searchValue: string;
  replaceValue: string;
}[] = [
  ...reflectReplacements,
  ...promiseReplacements,
  ...containerReplacements,
  ...jsonReplacements,
];
