import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
<% if (redux) { %>
import store from './store'
import { Provider } from 'react-redux'
<% } %>
<% if (graphql) { %>
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'
<% } %>
<% if (!redux) { %>
import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'
<% } %>
<% if (stylesSolution == 'sass') { %>
import '@/styles/index.scss'
<% } else { %>
import { createGlobalStyle } from 'styled-components'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'
  const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
`
    <% } %>

const rootElement = document.querySelector('#root') as Element

const App = () => {
  <% if (!redux && !graphql) { %>
    const { loginSession, refreshParams, getLoginSession, ...rest } = useAuth()
  <% } %>
  <% if (graphql) { %>
    const { loginSession, refreshParams, getLoginSession, ...rest } = useAuth()
    if (!loginSession && refreshParams) {
      getLoginSession(refreshParams)
    }
    const accessToken = loginSession?.accessToken || ''
  <% } %>
  return (
    <% if (!redux) { %>
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, ...rest }}>
    <% } %>
    <% if (graphql) { %>
      <ApolloProvider client={getClient(accessToken)}>
    <% } %>
    <% if (redux) { %>
      <Provider store={store.reduxStore}>
    <% } %>
      <Router />
    <% if (stylesSolution === 'styledComponents') { %>
      <GlobalStyle />
    <% } %>
    <% if (redux) { %>
      </Provider>
    <% } %>
    <% if (graphql) { %>
      </ApolloProvider>
    <% } %>
    <% if (!redux) { %>
      </AuthContext.Provider>
    <% } %>
  )
}

if (rootElement) {
  render(<App />, rootElement)
}

export default App
