import * as React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements' // eslint-disable-line
import { reapitConnectBrowserSession } from './connect-session'
import { graphqlUri } from './config'

const httpLink = createHttpLink({
  uri: graphqlUri,
})

const authLink = setContext(async (_, { headers }) => {
  const token = await reapitConnectBrowserSession.connectSession()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.idToken}` : '',
      'reapit-connect-token': token ? token.accessToken : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

injectSwitchModeToWindow()

const App = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <NavStateProvider>
        <MediaStateProvider>
          <SnackProvider>
            <Router />
          </SnackProvider>
        </MediaStateProvider>
      </NavStateProvider>
    </ApolloProvider>
  </ErrorBoundary>
)

export default App
