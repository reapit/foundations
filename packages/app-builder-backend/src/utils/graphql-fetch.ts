import { DocumentNode } from 'graphql'
import { graphqlUri } from '../config.json'
import { fetch } from './fetch'

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
  const res = await fetch(graphqlUri || 'http://localhost:4001/', {
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
    console.log(JSON.stringify(json.errors, null, 2))
    if (json.errors[0].extensions.code === 'BAD_USER_INPUT' && json.errors[0].extensions.validationErrors) {
      throw new Error(json.errors[0].extensions.validationErrors.errors.map(({ message }) => message).join(', '))
    }
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
