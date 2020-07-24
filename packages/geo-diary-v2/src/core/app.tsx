import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useReapitConnect } from '@reapit/connect-session'
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
    <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
      <Router />
    </ApolloProvider>
  )
}

export default App
