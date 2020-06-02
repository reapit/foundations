import * as React from 'react'
import Router from './router'

import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'

import '@/styles/index.scss'

const App = () => {
  const { loginSession, refreshParams, getLoginSession, isFetchSession, ...rest } = useAuth()
  if (!loginSession && refreshParams && !isFetchSession) {
    getLoginSession(refreshParams)
  }

  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, isFetchSession, ...rest }}>
      <Router />
    </AuthContext.Provider>
  )
}

export default App
