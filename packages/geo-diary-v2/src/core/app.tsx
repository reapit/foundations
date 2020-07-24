import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ReapitConnectContext, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import getClient from '@/graphql/client'
import Router from './router'
import './__styles__'

const App = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)
  const accessToken = session.connectSession?.accessToken || ''
  if (!session.connectSession) {
    return null
  }

  return (
    <ReapitConnectContext.Provider value={{ ...session }}>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
        <Router />
      </ApolloProvider>
    </ReapitConnectContext.Provider>
  )
}

export default App
