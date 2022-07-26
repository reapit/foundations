export function isEmail(email: string) {
  // eslint-disable-next-line
  const pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
  return pattern.test(email)
}

export function isValidHttpsUrl(url: string) {
  return /^\s*(https:\/\/)([a-z\d-]{1,63}\.)*[a-z\d-]{1,255}\.[a-z]{2,6}\s*/.test(url)
}

export function isValidHttpUrl(url: string) {
  return /^\s*(http:\/\/)([a-z\d-]{1,63}\.)*[a-z\d-]{1,255}\.[a-z]{2,6}\s*/.test(url)
}

export function whiteListLocalhostAndIsValidUrl(url: string) {
  return isValidHttpsUrl(url) || /http?:\/\/localhost/.test(url)
}

export function isValidRedirectUrls(urls: string) {
  return urls
    .split(',')
    .filter((url) => !!url)
    .every((url) => isValidHttpsUrl(url) || /http?:\/\/localhost/.test(url))
}

export function checkValidCustomScheme(url: string): boolean {
  const result = url.match(/([a-zA-Z]+):\/\/(.+)/)
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

export function isValidUrlWithCustomScheme(urls?: string): boolean {
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

export function isValidLimitToClientIds(clientIds: string): boolean {
  // Only allow strings with 3 characters seperated by a comma
  return clientIds
    .replace(/\s/g, '')
    .split(',')
    .every((clientId) => /^.{3}$/.test(clientId))
}

export function isValidTelephone(phone: string) {
  // eslint-disable-next-line
  const pattern = /((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))/g
  return pattern.test(phone)
}

export function isValidPersonName(name: string) {
  const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*){1,255}$/g
  return pattern.test(name)
}
