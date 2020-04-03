import { storageAvailable } from '../../utils/local-storage/local-storage-check'
export const GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'
export const LOCALSTORAGE_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

/**
 * If key is undefined, then return entire object,
 * else return value by key
 */
export const getMarketplaceGlobalsByKey = (key?: string) => {
  if (!window || !window[GLOBAL_KEY]) {
    return
  }
  if (key === undefined) {
    return window[GLOBAL_KEY]
  }
  return window[GLOBAL_KEY][key]
}

/**
 * Used to set data into window.__REAPIT_MARKETPLACE_GLOBALS__ via localStorage and return that object,
 * Append to current existingObject and Overwrite if key is existed
 */
export const setMarketplaceGlobalsByKey = (
  keyValueObject: { [key: string]: string } = {},
): { [key: string]: string } | undefined => {
  if (storageAvailable('localStorage')) {
    const existingObject = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) as string)
    const globalsObject =
      typeof existingObject === 'object' && existingObject !== null
        ? { ...existingObject, ...keyValueObject }
        : { ...keyValueObject }
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(globalsObject))
    window[GLOBAL_KEY] = globalsObject
    window.location.reload()
    return globalsObject
  }
  console.log("Your browser doesn't support localStorage")
  return
}

/**
 * Used to clear localStorage and window globalsObject
 */
export const clearMarkeplaceGlobals = () => {
  if (storageAvailable('localStorage')) {
    window.localStorage.removeItem(LOCALSTORAGE_KEY)
  }
  window[GLOBAL_KEY] = undefined
  window.location.reload()
  return true
}

/**
 * To check if localStorage has globalObject data
 * If has, restore it, otherwise, skip
 */
export const restoreGlobalObjectFromLS = (): { [key: string]: string } | boolean | null => {
  if (storageAvailable('localStorage')) {
    const localStorageObject = JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) as string)
    if (typeof localStorageObject === 'object' && localStorageObject !== null) {
      const globalsObject = { ...localStorageObject }
      window[GLOBAL_KEY] = globalsObject
      console.log(`window.${GLOBAL_KEY} is set to`, JSON.parse(JSON.stringify(globalsObject)))
      return globalsObject
    }
    // Clear storage if it's non-object
    window.localStorage.removeItem(LOCALSTORAGE_KEY)
    window[GLOBAL_KEY] = undefined
    return false
  }
  console.log("Your browser doesn't support localStorage")
  return null
}

/**
 * Used to inject window.desktopMode and window.webMode functions used to switch between mode
 * Call this before initializing state related to LoginMode
 * E.g. If you're using Redux, call this before initializing store,
 * If you're using React without Redux, call this in index.js
 */
export const injectSwitchModeToWindow = () => {
  Object.defineProperty(window, 'desktopMode', {
    value: setMarketplaceGlobalsByKey,
  })
  Object.defineProperty(window, 'webMode', {
    value: clearMarkeplaceGlobals,
  })
  // Only restore if window[GLOBAL_KEY] is writable
  // In REAL DESKTOP mode, window.__REAPIT_MARKETPLACE_GLOBALS__ writable is false
  // and this function will not be executed
  if (Object.getOwnPropertyDescriptor(window, GLOBAL_KEY)?.writable) {
    restoreGlobalObjectFromLS()
  }
}
