import * as React from 'react'
import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'
import getClient from '@/graphql/client'
import Router from './router'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'

const GlobalStyle = createGlobalStyle`
  ${globalCss};
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
  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, ...rest }}>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
        <Router />
        <GlobalStyle />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
