export const isImageType = (type: string) => {
  const regex = /^image\//
  return regex.test(type)
}

export const isValidUrlWithCustomScheme = (urls: string): boolean => {
  if (!urls) {
    return false
  }

  // remove all white-space and filter all empty urls
  return urls
    .replace(/\s/g, '')
    .split(',')
    .filter((url) => url)
    .every((url) => checkValidCustomScheme(url))
}

export const checkValidCustomScheme = (url: string): boolean => {
  const result = url.match(/^([a-zA-Z]{2,100}):\/\/([a-zA-Z\d-]{1,63})(.[a-z]{2,6}|:\d{2,6})/)
  if (!result) {
    return false
  }
  const [, protocol, link] = result
  // allow http only for localhost
  if (protocol === 'http') {
    return link.indexOf('localhost') === 0
  }

  return !!protocol && !!link
}

export const isValidLimitToClientIds = (clientIds: string): boolean => {
  // Only allow strings with 15 characters seperated by a comma
  return clientIds
    .replace(/\s/g, '')
    .split(',')
    .every((clientId) => clientId.length >= 3 && clientId.length <= 15)
}

export const isValidHttpsUrl = (url: string) => {
  return /^\s*(https:\/\/)([a-z\d-]{1,63}\.)*[a-z\d-]{1,255}(.[a-z]{2,6}|:[0-9]{2,6})\s*/.test(url)
}

export const isValidHttpUrl = (url: string) => {
  return /^\s*(http:\/\/)([a-z\d-]{1,63}\.)*[a-z\d-]{1,255}(.[a-z]{2,6}|:[0-9]{2,6})\s*/.test(url)
}

export const whiteListLocalhostAndIsValidUrl = (url: string) => {
  return isValidHttpsUrl(url) || /http?:\/\/localhost/.test(url)
}

export const hasSpecialChars = (value: string): boolean => {
  if (!value) return false

  if (/^[\w\-\s£$@%&*()?!%/=+'"~^,.#;:]+$/.test(value) && /^((?!javascript).)*$/.test(value.toLowerCase())) {
    return false
  }

  return true
}
