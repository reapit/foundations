import * as React from 'react'

export interface PortalContextValues {
  showPortal(key: string, modal: React.ComponentType<any>): void
  hidePortal(key: string): void
}

const noop = () => {
  return void 0
}

export const PortalContext = React.createContext<PortalContextValues>({
  showPortal: noop,
  hidePortal: noop
})
