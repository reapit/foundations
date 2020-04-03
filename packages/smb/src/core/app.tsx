import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { PortalProvider } from '@reapit/elements'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'
import getClient from '@/graphql/client'
import Router from './router'
import UploadProvider from '@/components/providers/upload-provider/upload-provider'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: unset;
  }
  td.hidden-cell {
    display: none;
  }
`

const App = () => {
  const { loginSession, refreshParams, getLoginSession, ...rest } = useAuth()
  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }
  const accessToken = loginSession?.accessToken || ''
  window.reapit.config.accessToken = accessToken

  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, ...rest }}>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
        <PortalProvider>
          <UploadProvider>
            <Router />
          </UploadProvider>
        </PortalProvider>
        <GlobalStyle />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
