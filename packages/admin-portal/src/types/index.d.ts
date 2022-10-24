/**
 * Gobal override types to make the compiler happy
 */

declare namespace yargs {
  // eslint-disable-next-line
  export type Arguments<T> = any
}

declare module '*.css'
declare module '*.jpg'
declare module '*.png'
declare module '*.pdf'
declare module '*.svg'

declare module 'swagger-ui-react'
