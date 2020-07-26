import React from 'react'
import { ReapitConnectHook, ReapitConnectSession } from '../types'
import { ReapitConnectBrowserSession } from '../browser'

export const useReapitConnect = (reapitConnectBrowserSession: ReapitConnectBrowserSession): ReapitConnectHook => {
  const [connectSession, setConnectSession] = React.useState<ReapitConnectSession | null>(null)

  React.useEffect(() => {
    const connectGetSession = async () => {
      const session = await reapitConnectBrowserSession.connectSession()
      console.log({ fetch: session })

      if (session) {
        setConnectSession(session)
      }
    }

    connectGetSession()
  }, [])

  const connectAuthorizeRedirect = React.useCallback(() => {
    reapitConnectBrowserSession.connectAuthorizeRedirect()
  }, [])

  const connectLoginRedirect = React.useCallback(() => {
    reapitConnectBrowserSession.connectLoginRedirect()
  }, [])

  const connectLogoutRedirect = React.useCallback(() => {
    reapitConnectBrowserSession.connectLogoutRedirect()
  }, [])

  const connectIsDesktop = reapitConnectBrowserSession.connectIsDesktop

  return {
    connectSession,
    connectAuthorizeRedirect,
    connectLoginRedirect,
    connectLogoutRedirect,
    connectIsDesktop,
  }
}

export const ReapitConnectContext = React.createContext<ReapitConnectHook>({} as ReapitConnectHook)
ReapitConnectContext.displayName = 'ReapitConnectContext'
