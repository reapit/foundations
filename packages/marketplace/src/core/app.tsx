import React, { FC } from 'react'
import Router from './router'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'
import ErrorBoundary from './error-boundary'
import { injectSwitchModeToWindow } from '@reapit/utils-react'

injectSwitchModeToWindow()

const App: FC = () => (
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

export default App
