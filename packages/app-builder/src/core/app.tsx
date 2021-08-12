import * as React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import { injectSwitchModeToWindow } from '@reapit/elements-legacy'
// Global styles import
import { elGlobals, MediaStateProvider, NavStateProvider } from '@reapit/elements' // eslint-disable-line

const client = new ApolloClient({
  uri: 'https://zbtuirnf0g.execute-api.eu-west-2.amazonaws.com/prod/',
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
