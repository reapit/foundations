import React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow, PortalProvider } from '@reapit/elements-legacy'
import { MessageProvider } from '../context/message-context'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <PortalProvider>
        <MessageProvider>
          <Router />
        </MessageProvider>
      </PortalProvider>
    </ErrorBoundary>
  )
}

export default App
