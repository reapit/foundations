/**
 * Gobal override types to make the compiler happy
 */

declare module '*.jpg'

declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg' {
  const content: any
  export default content
}
