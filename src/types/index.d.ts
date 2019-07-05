/**
 * Gobal override types to make the compiler happy
 */

declare namespace yargs {
  export type Arguments<T> = any
}

declare module '*.scss'
declare module '*.scss?mod'
declare module '*.sass'
