import { getAppId } from '@/components/hooks/use-page-id'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

import { graphqlUri } from './config'

export const createClient = (session?: ReapitConnectBrowserSession) => {
  const httpLink = createHttpLink({
    uri: graphqlUri,
  })

  const authLink = setContext(async (_, { headers }) => {
    const token = await session?.connectSession()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token.idToken}` : '',
        'reapit-connect-token': token ? token.accessToken : '',
        'app-id': getAppId(),
      },
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    connectToDevTools: true,
    cache: new InMemoryCache({
      typePolicies: {
        _App: {
          fields: {
            pages: {
              merge(_, incoming) {
                return incoming
              },
            },
          },
        },
      },
    }),
  })

  return client
}

export const unauthenticatedClient = createClient()
