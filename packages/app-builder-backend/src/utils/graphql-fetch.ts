import { DocumentNode } from 'graphql'
import fetch from 'node-fetch'
import { graphqlUri } from '../config.json'

type AuthTokens = {
  accessToken: string
  idToken: string
}

const getGqlString = (doc: DocumentNode) => doc.loc && doc.loc.source.body

export const query = async <T>(
  query: DocumentNode,
  variables: Record<string, any>,
  dataKey: string,
  { idToken, accessToken }: AuthTokens,
) => {
  const res = await fetch(graphqlUri || 'http://localhost:3000/local/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: idToken,
      'reapit-connect-token': accessToken,
    },
    body: JSON.stringify({
      query: getGqlString(query),
      variables,
    }),
  })
  const json = (await res.json()) as any
  if (json.errors) {
    console.log(json.errors)
    throw new Error(json.errors[0].message)
  }
  if (json.message) {
    throw new Error(json.message)
  }
  if (json.data) {
    return json.data[dataKey] as T
  }
  throw new Error('Invalid response')
}
