import { MouseEvent } from 'react'
import { NavigateFunction } from 'react-router'

export enum ExternalPages {
  platformAPIDocs = 'https://foundations-documentation.reapit.cloud/api/api-documentation',
}

export const openNewPage = (uri: ExternalPages | string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank', 'noopener, noreferrer')
}

export const navigateRoute =
  (navigate: NavigateFunction, route: string) =>
  (event?: MouseEvent): void => {
    event?.stopPropagation()
    navigate(route)
    // GQL playground unsets the page title - need to reset this to the correct value
    if (document.title !== 'Developers') {
      document.title = 'Developers'
    }
  }
