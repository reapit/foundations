import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth } from '@/hooks/use-auth'
import getClient from '@/graphql/client'
import { AuthContext } from '@/context'
import Router from './router'

import '@/styles/index.scss'

const App = () => {
  const { loginSession, refreshParams, getLoginSession, isFetchSession, ...rest } = useAuth()
  if (!loginSession && refreshParams && !isFetchSession) {
    getLoginSession(refreshParams)
  }
  const accessToken = loginSession?.accessToken || ''

  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, isFetchSession, ...rest }}>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
        <Router />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
