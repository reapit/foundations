import * as React from 'react'
import PortalContainer from './portal-container'
import { PortalContext } from './portal-context'

export interface PortalProviderProps {
  children: React.ReactNode
}

export const PortalProvider: React.FunctionComponent<PortalProviderProps> = ({ children }) => {
  const [portals, setPortals] = React.useState<{ [key: string]: React.ComponentType<any> }>({})

  const showPortal = React.useCallback(
    (key: string, modal: React.ComponentType<any>) => {
      setPortals({
        ...portals,
        [key]: modal
      })
    },
    [portals]
  )

  const hidePortal = React.useCallback(
    (key: string) => {
      const newPortals = { ...portals }
      delete newPortals[key]
      setPortals(newPortals)
    },
    [portals]
  )

  return (
    <PortalContext.Provider value={{ showPortal, hidePortal }}>
      <>{children}</>
      <PortalContainer portals={portals} />
    </PortalContext.Provider>
  )
}
