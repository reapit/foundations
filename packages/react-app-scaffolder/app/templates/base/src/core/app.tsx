<% if (isFoundation) { %>
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()
<% } %>
import * as React from 'react'
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
  <% if (!isFoundation) { %>
import '@reapit/elements/dist/index.css'
  <% } %>

<% } else { %>
import { createGlobalStyle } from 'styled-components'
  <% if (isFoundation) { %>
import '@reapit/elements/styles/index.scss'
  <% } else { %>
import '@reapit/elements/dist/index.css'
<% } %>

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: unset;
  }
`
    <% } %>

const App = () => {
  <% if (!redux && !graphql) { %>
    const { loginSession, refreshParams, getLoginSession, isFetchSession, ...rest } = useAuth()
    if (!loginSession && refreshParams && !isFetchSession) {
      getLoginSession(refreshParams)
    }
  <% } %>
  <% if (graphql) { %>
    const { loginSession, refreshParams, getLoginSession, isFetchSession, ...rest } = useAuth()
    if (!loginSession && refreshParams && !isFetchSession) {
      getLoginSession(refreshParams)
    }
    const accessToken = loginSession?.accessToken || ''
  <% } %>
  return (
    <% if (!redux) { %>
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, isFetchSession, ...rest }}>
    <% } %>
    <% if (graphql) { %>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
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

export default App
