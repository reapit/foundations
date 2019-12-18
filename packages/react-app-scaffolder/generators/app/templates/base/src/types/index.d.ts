/**
 * Gobal override types to make the compiler happy
 */

declare namespace yargs {
  export type Arguments<T> = any
}

declare module '*.css'
declare module '*.scss'
declare module '*.scss?mod'
declare module '*.sass'
declare module '*.jpg'

declare module 'swagger-ui-react'
