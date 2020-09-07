import * as React from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements'
import '../styles/index.css'

injectSwitchModeToWindow()

const App = () => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
}

export default App
