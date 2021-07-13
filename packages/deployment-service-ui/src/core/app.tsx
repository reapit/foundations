import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
import { SnackProvider } from '@reapit/elements'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <SnackProvider>
        <Router />
      </SnackProvider>
    </ErrorBoundary>
  )
}

export default App
