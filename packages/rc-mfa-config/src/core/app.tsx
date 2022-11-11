import React, { FC } from 'react'
import Router from './router'
import ErrorBoundary from '../components/error-boundary'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

const App: FC = () => (
  <ErrorBoundary>
    <SnackProvider>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
    </SnackProvider>
  </ErrorBoundary>
)

export default App
