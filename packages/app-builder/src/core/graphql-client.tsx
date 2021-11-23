import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

import { graphqlUri } from './config'

export const createClient = (session: ReapitConnectBrowserSession) => {
  const httpLink = createHttpLink({
    uri: graphqlUri,
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await session.connectSession()
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

  return client
}
