export const GLOBAL_KEY = '__REAPIT_MARKETPLACE_GLOBALS__'

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
