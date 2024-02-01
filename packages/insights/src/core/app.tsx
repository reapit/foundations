import '@reapit/elements/dist/index.css'
import * as React from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import ErrorBoundary from '../components/error-boundary'

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
