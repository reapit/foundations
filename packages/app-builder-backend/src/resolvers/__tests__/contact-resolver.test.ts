import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import { mockContacts } from '../__mocks__/mock-contacts'

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

const mockQuery = (name: string, variables: Record<string, any> | undefined, data: Record<string, any>) => {
  fetchMock.post(
    (url, options) => {
      if (url === 'http://localhost:4001/graphql') {
        const body = JSON.parse(options.body)
        if (variables && deepEqual(variables, body.variables)) {
          return true
        }
        const parsedQuery = gql`
          ${body.query}
        `
        const query = parsedQuery.definitions.find(
          (def) => def.kind === 'OperationDefinition',
        ) as OperationDefinitionNode
        const selection = query.selectionSet.selections[0] as FieldNode
        if (selection.name.value === name) {
          return true
        }
      }
      return false
    },
    { data },
  )
}

const setupContactsMocks = () => {
  mockQuery('GetContacts', undefined, {
    GetContacts: mockContacts,
  })
}

const listContactsQuery = gql`
  query ListContacts {
    listContacts {
      id
      forename
      surname
      title
      email
      marketingConsent
    }
  }
`

const getGraphqlClient = async () => {
  const schema: GraphQLSchema = await require('../../get-schema').getSchema()
  const context: Context = {
    accessToken: 'accessToken',
    idToken: 'idToken',
    apiUrl: '',
    metadataSchemas: [],
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
  })
}

describe('contact-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupContactsMocks()
    client = await getGraphqlClient()
  })

  describe('listContacts', () => {
    it('should return contacts', async () => {
      const result = await client.query({
        query: listContactsQuery,
      })
      expect(result.data.listContacts).toBeDefined()
      expect(result.data.listContacts[0]).toEqual({
        __typename: 'Contact',
        id: 'RPT20000017',
        title: 'Mr',
        forename: 'John',
        surname: 'Smith',
        email: 'example@email.com',
        marketingConsent: 'grant',
      })
    })
  })

  describe('searchContacts', () => {})
  describe('getContact', () => {})
  describe('createContact', () => {})
  describe('updateContact', () => {})
})
