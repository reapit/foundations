import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow, PortalProvider } from '@reapit/elements'
import { ErrorProvider } from '../context/error-context'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <PortalProvider>
        <ErrorProvider>
          <Router />
        </ErrorProvider>
      </PortalProvider>
    </ErrorBoundary>
  )
}

export default App
