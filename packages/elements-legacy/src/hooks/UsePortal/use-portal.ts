import * as React from 'react'
import { PortalContext } from './portal-context'

const generatePortalKey = (() => {
  let count = 0
  return () => `${++count}`
})()

export function usePortal(component: React.ComponentType<any>, deps: any[] = []) {
  const context = React.useContext(PortalContext)
  const key = React.useMemo(generatePortalKey, [])
  const [isShown, setShown] = React.useState(false)
  const portal = React.useMemo(() => component, deps)
  const showPortal = React.useCallback(() => setShown(true), [])
  const hidePortal = React.useCallback(() => setShown(false), [])

  React.useEffect(() => {
    if (isShown) {
      context.showPortal(key, portal)
    } else {
      context.hidePortal(key)
    }
  }, [portal, isShown])

  React.useEffect(() => {
    return () => {
      context.hidePortal(key)
    }
  }, [])
  return [showPortal, hidePortal]
}
