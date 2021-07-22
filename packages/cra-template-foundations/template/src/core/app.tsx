import * as React from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider } from '@reapit/elements' // eslint-disable-line

const App = () => {
  return (
    <ErrorBoundary>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
    </ErrorBoundary>
  )
}

export default App
