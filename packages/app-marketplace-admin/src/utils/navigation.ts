import { NavigateFunction } from 'react-router'

export enum ExternalPages {
  appMarketplaceAdminDocs = 'https://foundations-documentation.reapit.cloud/',
}

export const openNewPage = (uri: string) => () => {
  window.open(uri, '_blank')
}

export const navigateRoute = (navigate: NavigateFunction, route: string) => (): void => {
  navigate(route)
}
