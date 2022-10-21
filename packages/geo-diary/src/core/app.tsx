import * as React from 'react'
import Router from './router'
import './__styles__'
import { AppStateProvider } from './app-state'
import { NavStateProvider, MediaStateProvider, SnackProvider } from '@reapit/elements'

const App = () => (
  <AppStateProvider>
    <NavStateProvider>
      <MediaStateProvider>
        <SnackProvider>
          <Router />
        </SnackProvider>
      </MediaStateProvider>
    </NavStateProvider>
  </AppStateProvider>
)

export default App
