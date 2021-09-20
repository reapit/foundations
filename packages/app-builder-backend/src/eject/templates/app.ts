import { js } from './js'
import { lint } from './format'

export const generateApp = () => {
  return lint(js`
    import * as React from 'react'
    import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
    import { setContext } from '@apollo/client/link/context'
    import Router from './router'
    // Global styles import
    import { elGlobals, MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements' // eslint-disable-line
    import session from './session'
    import '@reapit/elements/dist/index.css'

    const httpLink = createHttpLink({
      uri: 'http://localhost:4000/graphql/',
    })

    const authLink = setContext(async (_, { headers }) => {
      const token = await session.connectSession()
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? ['Bearer', token.idToken].join(' ') : '',
          'reapit-connect-token': token ? token.accessToken : '',
        },
      }
    })

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })

    const App = () => (
        <ApolloProvider client={client}>
          <NavStateProvider>
            <MediaStateProvider>
              <SnackProvider>
                <Router />
              </SnackProvider>
            </MediaStateProvider>
          </NavStateProvider>
        </ApolloProvider>
    )

    export default App
`)
}
