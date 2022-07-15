import { History } from 'history'

export enum ExternalPages {
  appMarketplaceAdminDocs = 'https://foundations-documentation.reapit.cloud/', // TODO complete docs
}

export const openNewPage = (uri: string) => () => {
  window.open(uri, '_blank')
}

export const navigate = (history: History, route: string) => (): void => {
  history.push(route)
}
