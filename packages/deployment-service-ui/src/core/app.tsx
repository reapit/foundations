import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
import { PusherProvider } from '@harelpls/use-pusher'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <PusherProvider cluster="eu" clientKey={window.reapit.config.PUSHER_KEY}>
        <Router />
      </PusherProvider>
    </ErrorBoundary>
  )
}

export default App
