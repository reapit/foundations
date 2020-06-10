/**
 * Trim string values, then remove falsy values from Object.
 * @param {Object} obj - The object to clean.
 */
export function cleanObject(obj: Object): { [key: string]: any } {
  return Object.keys(obj).reduce((newObj, key) => {
    let value = obj[key]
    if (typeof value === 'string') value = value.trim()
    if (value) {
      newObj[key] = value
    }
    return newObj
  }, {})
}
