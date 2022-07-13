import { History } from 'history'

export const openNewPage = (uri: string) => () => {
  window.open(uri, '_blank')
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}

export const handleLaunchApp = (connectIsDesktop: boolean, id?: string, launchUri?: string) => () => {
  if (!launchUri || !id) {
    return
  }

  if (connectIsDesktop) {
    window.location.href = `agencycloud://app?id=${id}&launchUri=${launchUri}`
    return
  }

  window.location.href = launchUri
}
