/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import React from 'react'
import { ReapitConnectHook, ReapitConnectSession } from '../types'
import { ReapitConnectBrowserSession } from '../browser'

export const useReapitConnect = (reapitConnectBrowserSession: ReapitConnectBrowserSession): ReapitConnectHook => {
  const [connectSession, setConnectSession] = React.useState<ReapitConnectSession | null>(null)

  React.useEffect(() => {
    const connectGetSession = async () => {
      const session = await reapitConnectBrowserSession.connectSession()
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

  const connectHasSession = reapitConnectBrowserSession.connectHasSession

  const connectInternalRedirect = reapitConnectBrowserSession.connectInternalRedirect

  const connectClearSession = reapitConnectBrowserSession.connectClearSession

  return {
    connectSession,
    connectAuthorizeRedirect,
    connectLoginRedirect,
    connectLogoutRedirect,
    connectInternalRedirect,
    connectIsDesktop,
    connectHasSession,
    connectClearSession,
  }
}
