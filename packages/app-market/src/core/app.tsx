import React, { FC } from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import ErrorBoundary from './error-boundary'

const App: FC = () => (
  <ErrorBoundary>
    <NavStateProvider>
      <MediaStateProvider>
        <Router />
      </MediaStateProvider>
    </NavStateProvider>
  </ErrorBoundary>
)

export default App
