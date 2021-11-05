import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements' // eslint-disable-line
import { reapitConnectBrowserSession } from './connect-session'
import { createClient } from './graphql-client'

const App = () => {
  const session = reapitConnectBrowserSession

  return (
    <ErrorBoundary>
      <ApolloProvider client={createClient(session)}>
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
}

export default App
