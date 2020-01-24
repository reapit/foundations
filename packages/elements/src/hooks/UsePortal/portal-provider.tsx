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
      setPortals(prevPortals => ({
        ...prevPortals,
        [key]: modal,
      }))
    },
    [portals],
  )

  const hidePortal = React.useCallback(
    (key: string) => {
      setPortals(prevPortals => {
        const newPortals = { ...prevPortals }
        delete newPortals[key]
        return newPortals
      })
    },
    [portals],
  )

  return (
    <PortalContext.Provider value={{ showPortal, hidePortal }}>
      <>{children}</>
      <PortalContainer portals={portals} />
    </PortalContext.Provider>
  )
}
