import * as React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider } from '@reapit/elements' // eslint-disable-line
import { reapitConnectBrowserSession } from './connect-session'

const httpLink = createHttpLink({
  uri: window.location.hostname.includes('localhost')
    ? 'http://localhost:4000'
    : 'https://zbtuirnf0g.execute-api.eu-west-2.amazonaws.com/prod/',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await reapitConnectBrowserSession.connectSession()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.accessToken}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

injectSwitchModeToWindow()

const App = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <NavStateProvider>
          <MediaStateProvider>
            <Router />
          </MediaStateProvider>
        </NavStateProvider>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
