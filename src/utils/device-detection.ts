export function isAndroid() {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1
}

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

export function isMacLike() {
  return navigator.userAgent.indexOf('Mac OS X') > -1
}
