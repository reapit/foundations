import React, { FC } from 'react'
import Router from './router'
import ErrorBoundary from '../components/error-boundary'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

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
