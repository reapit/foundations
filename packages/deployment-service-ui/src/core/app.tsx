import React, { useEffect, useState } from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { FlexContainerBasic, injectSwitchModeToWindow } from '@reapit/elements-legacy'
import { Loader } from '@reapit/elements'
import { PusherProvider } from '@harelpls/use-pusher'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import { BASE_HEADERS, URLS } from '../constants/api'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [authenticating, setAuthenticating] = useState<boolean>(true)

  useEffect(() => {
    if (connectSession) setAuthenticating(false)
  }, [connectSession])

  return (
    <ErrorBoundary>
      <NavStateProvider>
        <MediaStateProvider>
          {authenticating ? (
            <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
              <Loader label="authorizing" />
            </FlexContainerBasic>
          ) : (
            <PusherProvider
              cluster="eu"
              clientKey={window.reapit.config.PUSHER_KEY}
              authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}/pusher/auth`}
              auth={{
                headers: {
                  ...BASE_HEADERS,
                  Authorization: connectSession?.idToken,
                },
              }}
            >
              <Router />
            </PusherProvider>
          )}
        </MediaStateProvider>
      </NavStateProvider>
    </ErrorBoundary>
  )
}

export default App
