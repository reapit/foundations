import * as React from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'

import { useAuth } from '../hooks/use-auth'
import { AuthContext } from '../context'
import { injectSwitchModeToWindow } from '@reapit/elements'
import '../styles/index.css'

injectSwitchModeToWindow()

const App = () => {
  const { loginSession, refreshParams, getLoginSession, isFetchSession, ...rest } = useAuth()
  if (!loginSession && refreshParams && !isFetchSession) {
    getLoginSession(refreshParams)
  }

  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, isFetchSession, ...rest }}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </AuthContext.Provider>
  )
}

export default App
