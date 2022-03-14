import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import { mockContacts } from '../__mocks__/mock-contacts'
import { mockContact } from '../__mocks__/mock-contact'
import config from '../../config.json'
import { MetadataSchemaType } from '@/utils/extract-metadata'

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')

const mockQuery = (name: string, variables: Record<string, any> | undefined, data: Record<string, any>) => {
  fetchMock.post(
    (url, options) => {
      if (url === config.graphqlUri || url === 'http://localhost:4001/') {
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
  mockQuery('SearchContacts', undefined, {
    SearchContacts: mockContacts,
  })
  mockQuery(
    'GetContactById',
    { id: 'RPT20000017' },
    {
      GetContactById: mockContact,
    },
  )
  mockQuery(
    'CreateContact',
    {
      title: 'Mr',
      forename: 'John',
      surname: 'Smith',
      email: 'someone@email.com',
      marketingConsent: 'grant',
      negotiatorIds: ['HPT'],
      officeIds: ['LDN'],
    },
    {
      CreateContact: mockContact,
    },
  )
  mockQuery(
    'UpdateContact',
    {
      id: 'RPT20000017',
      title: 'Mr',
      forename: 'John',
      surname: 'Smith',
      email: 'someone@email.com',
      marketingConsent: 'grant',
      negotiatorIds: ['HPT'],
      officeIds: ['LDN'],
    },
    {
      UpdateContact: mockContact,
    },
  )
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
    customEntities: [],
    operationMetadata: {} as Record<MetadataSchemaType, any>,
    storeCachedMetadata: function (): void {},
    getCachedMetadata: function () {},
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

  describe('searchContacts', () => {
    it('should return contacts', async () => {
      const result = await client.query({
        query: gql`
          query SearchContacts($query: String!) {
            searchContacts(query: $query) {
              id
              forename
              surname
              title
              email
              marketingConsent
            }
          }
        `,
        variables: {
          query: 'Smith',
        },
      })
      expect(result.data.searchContacts).toBeDefined()
      expect(result.data.searchContacts[0]).toEqual({
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

  describe('getContact', () => {
    it('should return contact', async () => {
      const result = await client.query({
        query: gql`
          query GetContact($id: String!) {
            getContact(id: $id) {
              id
              forename
              surname
              title
              email
              marketingConsent
            }
          }
        `,
        variables: {
          id: 'RPT20000017',
        },
      })
      expect(result.data.getContact).toBeDefined()
      expect(result.data.getContact).toEqual({
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

  describe('createContact', () => {
    it('should create contact', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateContact($input: ContactInput!) {
            createContact(contact: $input) {
              id
              forename
              surname
              title
              email
              marketingConsent
            }
          }
        `,
        variables: {
          input: {
            title: 'Mr',
            forename: 'John',
            surname: 'Smith',
            email: 'someone@email.com',
            marketingConsent: 'grant',
            negotiatorIds: ['HPT'],
            officeIds: ['LDN'],
          },
        },
      })

      expect(result.data.createContact).toBeDefined()
    })
  })
  describe('updateContact', () => {
    it('should update contact', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateContact($id: String!, $input: ContactInput!) {
            updateContact(id: $id, contact: $input) {
              id
              forename
              surname
              title
              email
              marketingConsent
            }
          }
        `,
        variables: {
          id: 'RPT20000017',
          input: {
            title: 'Mr',
            forename: 'John',
            surname: 'Smith',
            email: 'someone@email.com',
            marketingConsent: 'grant',
            negotiatorIds: ['HPT'],
            officeIds: ['LDN'],
          },
        },
      })

      expect(result.data.updateContact).toBeDefined()
    })
  })
})
