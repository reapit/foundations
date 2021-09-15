import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
import { PusherProvider } from '@harelpls/use-pusher'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import { URLS } from '../constants/api'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <NavStateProvider>
        <MediaStateProvider>
          <PusherProvider
            cluster="eu"
            clientKey={window.reapit.config.PUSHER_KEY}
            authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}/pusher/auth`}
            auth={{
              headers: { Authorization: 'Bearer' },
            }}
          >
            <Router />
          </PusherProvider>
        </MediaStateProvider>
      </NavStateProvider>
    </ErrorBoundary>
  )
}

export default App
