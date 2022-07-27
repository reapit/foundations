import React, { FC } from 'react'
import Router from './router'
import { injectSwitchModeToWindow } from '@reapit/utils-react'
import { ErrorBoundary } from './error-boundary'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

injectSwitchModeToWindow()

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
