/**
 * Global override types to make the compiler happy
 */

declare namespace yargs {
  export type Arguments<T> = any // eslint-disable-line
}

declare module '*.css'
declare module '*.scss'
declare module '*.scss?mod'
declare module '*.sass'
declare module '*.jpg'
declare module '*.png'
declare module '*.pdf'
declare module '*.svg'

declare module 'swagger-ui-react'
