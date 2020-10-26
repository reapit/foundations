import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements'
import { ErrorProvider } from '../context/error-context'

injectSwitchModeToWindow()

import '@/styles/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorProvider>
        <Router />
      </ErrorProvider>
    </ErrorBoundary>
  )
}

export default App
