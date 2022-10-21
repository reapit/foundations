/**
 * Gobal override types to make the compiler happy
 */

declare module '*.jpg'

declare module '*.svg' {
  const content: any
  export default content
}
