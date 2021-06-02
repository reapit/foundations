import * as React from 'react'
import Router from './router'
import './__styles__'
import { AppStateProvider } from './app-state'
import { PwaNavigateProvider } from '../utils/pwa-navigate'

const App = () => (
  <AppStateProvider>
    <PwaNavigateProvider>
      <Router />
    </PwaNavigateProvider>
  </AppStateProvider>
)

export default App
