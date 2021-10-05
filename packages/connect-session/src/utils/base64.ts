import base64 from 'base64-js'

export function padding(str) {
  const mod = str.length % 4
  const pad = 4 - mod

  if (mod === 0) {
    return str
  }

  return str + new Array(1 + pad).join('=')
}

export function byteArrayToString(array) {
  let result = ''
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i])
  }
  return result
}

export function stringToByteArray(str) {
  const arr = new Array(str.length)
  for (let a = 0; a < str.length; a++) {
    arr[a] = str.charCodeAt(a)
  }
  return arr
}

export function encodeString(str) {
  return base64
    .fromByteArray(
      // @ts-ignore
      stringToByteArray(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
          // @ts-ignore
          return String.fromCharCode('0x' + p1)
        }),
      ),
    )
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_';
}

export function decodeToString(str) {
  str = padding(str)
    .replace(/-/g, '+') // Convert '-' to '+'
    .replace(/_/g, '/') // Convert '_' to '/'

  return decodeURIComponent(
    byteArrayToString(base64.toByteArray(str))
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
}
