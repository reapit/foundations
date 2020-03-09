import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/react-hooks'
import useAuth from '@/hooks/use-auth'
import Router from './router'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'
import getClient from '@/graphql/client'
const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
`

const rootElement = document.querySelector('#root') as Element

const App = () => {
  const { loginSession, refreshParams, getLoginSession } = useAuth()
  if (!loginSession && refreshParams) {
    getLoginSession(refreshParams)
  }
  const accessToken = loginSession?.accessToken || ''
  return (
    <ApolloProvider client={getClient(accessToken)}>
      <Router />
      <GlobalStyle />
    </ApolloProvider>
  )
}

if (rootElement) {
  render(<App />, rootElement)
}

export default App
