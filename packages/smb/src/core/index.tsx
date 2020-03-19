import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()
import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'
import getClient from '@/graphql/client'
import Router from './router'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: unset;
  }
  td.hidden-cell {
    display: none;
  }
`

const rootElement = document.querySelector('#root') as Element

const App = () => {
  const { loginSession, refreshParams, getLoginSession, ...rest } = useAuth()
  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }
  const accessToken = loginSession?.accessToken || ''
  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, ...rest }}>
      <ApolloProvider client={getClient(accessToken)}>
        <Router />
        <GlobalStyle />
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

if (rootElement) {
  render(<App />, rootElement)
}

export default App
