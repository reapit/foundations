import * as React from 'react'
import Router from './router'
import './__styles__'
import { AppStateProvider } from './app-state'
import { NavStateProvider, MediaStateProvider } from '@reapit/elements'

const App = () => (
  <AppStateProvider>
    <NavStateProvider>
      <MediaStateProvider>
        <Router />
      </MediaStateProvider>
    </NavStateProvider>
  </AppStateProvider>
)

export default App
