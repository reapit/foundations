/**
 * Gobal override types to make the compiler happy
 */

declare namespace yargs {
  export type Arguments<T> = any
}

declare module 'redux-saga-testing' {
  const sagaHelper: (params: IterableIterator<any>) => any
  export default sagaHelper
}
