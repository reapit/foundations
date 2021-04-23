import * as React from 'react'
import Router from './router'
import './__styles__'
import { AppStateProvider } from './app-state'

const App = () => {
  return (
    <AppStateProvider>
      <Router />
    </AppStateProvider>
  )
}

export default App
