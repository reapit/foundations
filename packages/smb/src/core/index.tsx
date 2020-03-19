import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth, AuthHook } from '@/hooks/use-auth'
import Router from './router'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'
import getClient from '@/graphql/client'
const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
  td.hidden-cell {
    display: none;
  }
`

const rootElement = document.querySelector('#root') as Element

export const AuthContext = React.createContext<AuthHook>({} as AuthHook)
AuthContext.displayName = 'AuthContext'

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
