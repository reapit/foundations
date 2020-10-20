/**
 * Global override types to make the compiler happy
 */

declare namespace yargs {
  // eslint-disable-next-line
  export type Arguments<T> = any
}

declare module '*.jpg'
declare module '*.png'
