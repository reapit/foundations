import React from 'react'
import Router from './router'
import ErrorBoundary from '../components/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

injectSwitchModeToWindow()

const App = () => {
  return (
    <ErrorBoundary>
      <NavStateProvider>
        <MediaStateProvider>
          <SnackProvider>
            <Router />
          </SnackProvider>
        </MediaStateProvider>
      </NavStateProvider>
    </ErrorBoundary>
  )
}

export default App
