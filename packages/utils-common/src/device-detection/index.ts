export const isAndroid = () => {
  return navigator.userAgent.toLowerCase().indexOf('android') > -1
}

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}
