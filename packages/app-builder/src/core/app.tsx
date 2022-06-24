import * as React from 'react'
import { ApolloProvider } from '@apollo/client'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements' // eslint-disable-line
import { createClient } from './graphql-client'

const App = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={createClient()}>
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
