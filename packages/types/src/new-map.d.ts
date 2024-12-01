/* eslint-disable @typescript-eslint/prefer-function-type */
interface MapConstructor {
  new <K = unknown, V = unknown>(): Map<K, V>;
}
