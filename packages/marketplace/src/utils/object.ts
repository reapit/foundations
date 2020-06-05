export function cleanObject(obj: Object) {
  return Object.keys(obj).reduce((newObj, key) => {
    let value = obj[key]
    if (typeof value === 'string') value = value.trim()
    if (value) {
      newObj[key] = value
    }
    return newObj
  }, {})
}
