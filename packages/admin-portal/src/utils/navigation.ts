import { History } from 'history'
import { MouseEvent } from 'react'

export enum ExternalPages {
  platformAPIDocs = 'https://foundations-documentation.reapit.cloud/api/api-documentation',
}

export const openNewPage = (uri: ExternalPages | string) => (event?: MouseEvent) => {
  event?.preventDefault()
  event?.stopPropagation()
  window.open(uri, '_blank', 'noopener, noreferrer')
}

export const navigate =
  (history: History, route: string) =>
  (event?: MouseEvent): void => {
    event?.stopPropagation()
    history.push(route)
  }
