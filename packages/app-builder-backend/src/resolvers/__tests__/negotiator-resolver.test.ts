import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'
import { mockNegotiators } from '../__mocks__/mock-negotiators'
import { mockNegotiator } from '../__mocks__/mock-negotiator'

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox())
const fetchMock = require('node-fetch')
jest.spyOn(console, 'error').mockImplementation(() => {})

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

const setupNegotiatorMocks = () => {
  mockQuery('GetNegotiators', undefined, {
    GetNegotiators: mockNegotiators,
  })
  mockQuery('SearchNegotiators', undefined, {
    SearchNegotiator: mockNegotiators,
  })
  mockQuery(
    'GetNegotiatorById',
    { id: 'AAAD' },
    {
      GetNegotiatorById: mockNegotiator,
    },
  )
  mockQuery(
    'CreateNegotiator',
    {
      id: 'AAAD',
      name: 'aaaaa11',
      created: '2020-08-17T03:38:51Z',
      modified: '2020-09-14T03:59:41Z',
      jobTitle: null,
      active: true,
      officeId: 'ACR',
      workPhone: null,
      mobilePhone: '12343123213',
      email: 'adsadsd@gmail.com',
      metadata: {},
    },
    {
      CreateNegotiator: mockNegotiator,
    },
  )
  mockQuery(
    'UpdateNegotiator',
    {
      id: 'AAAD',
      name: 'aaaaa11',
      created: '2020-08-17T03:38:51Z',
      modified: '2020-09-14T03:59:41Z',
      jobTitle: null,
      active: true,
      officeId: 'ACR',
      workPhone: null,
      mobilePhone: '12343123213',
      email: 'adsadsd@gmail.com',
      metadata: {},
    },
    {
      UpdateNegotiator: mockNegotiator,
    },
  )
}

const getGraphqlClient = async () => {
  const schema: GraphQLSchema = await require('../../get-schema').getSchema()
  const context: Context = {
    accessToken: 'accessToken',
    idToken: 'idToken',
    apiUrl: '',
    webUrl: '',
    customEntities: [],
    operationMetadata: {} as Record<MetadataSchemaType, any>,
    storeCachedMetadata: function (): void {},
    getCachedMetadata: function () {},
    getMarketplaceApp: async () => {
      return {}
    },
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
  })
}

const listNegotiatorsQuery = gql`
  query ListNegotiators {
    listNegotiators {
      id
      name
      created
      modified
      jobTitle
      active
      officeId
      workPhone
      mobilePhone
      email
      metadata
    }
  }
`

const getNegotiatorQuery = gql`
  query ($id: String!) {
    getNegotiator(id: $id) {
      id
      name
      created
      modified
      jobTitle
      active
      officeId
      workPhone
      mobilePhone
      email
      metadata
    }
  }
`

describe('negotiator-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupNegotiatorMocks()
    client = await getGraphqlClient()
  })

  describe('listNegotiators', () => {
    it('should return negotiators', async () => {
      const result = await client.query({
        query: listNegotiatorsQuery,
      })
      expect(result.data.listNegotiators).toBeDefined()
      expect(result.data.listNegotiators[0]).toEqual({
        __typename: 'Negotiator',
        id: 'AAAD',
        name: 'aaaaa11',
        created: '2020-08-17T03:38:51.000Z',
        modified: '2020-09-14T03:59:41.000Z',
        jobTitle: null,
        active: true,
        officeId: 'ACR',
        workPhone: null,
        mobilePhone: '12343123213',
        email: 'adsadsd@gmail.com',
      })
    })
  })

  describe('getNegotiator', () => {
    it('should return negotiator', async () => {
      const result = await client.query({
        query: getNegotiatorQuery,
        variables: {
          id: 'AAAD',
        },
      })
      expect(result.data.getNegotiator).toBeDefined()
      expect(result.data.getNegotiator).toEqual({
        __typename: 'Negotiator',
        id: 'AAAD',
        name: 'aaaaa11',
        created: '2020-08-17T03:38:51.000Z',
        modified: '2020-09-14T03:59:41.000Z',
        jobTitle: null,
        active: true,
        officeId: 'ACR',
        workPhone: null,
        mobilePhone: '12343123213',
        email: 'adsadsd@gmail.com',
      })
    })
  })

  describe('searchNegotiators', () => {
    it('should return negotiators', async () => {
      const result = await client.query({
        query: gql`
          query SearchNegotiators($query: String!) {
            searchNegotiators(query: $query) {
              id
              name
              created
              modified
              jobTitle
              active
              officeId
              workPhone
              mobilePhone
              email
              metadata
            }
          }
        `,
        variables: {
          query: 'adsadsd',
        },
      })
      expect(result.data.searchNegotiators).toBeDefined()
      expect(result.data.searchNegotiators[0]).toEqual({
        __typename: 'Negotiator',
        id: 'AAAD',
        name: 'aaaaa11',
        created: '2020-08-17T03:38:51.000Z',
        modified: '2020-09-14T03:59:41.000Z',
        jobTitle: null,
        active: true,
        officeId: 'ACR',
        workPhone: null,
        mobilePhone: '12343123213',
        email: 'adsadsd@gmail.com',
      })
    })
  })
  describe('createNegotiator', () => {
    it('should create negotiator', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateNegotiator($input: NegotiatorInput!) {
            createNegotiator(negotiator: $input) {
              id
              name
              created
              modified
              jobTitle
              active
              officeId
              workPhone
              mobilePhone
              email
              metadata
            }
          }
        `,
        variables: {
          input: {
            name: 'aaaaa11',
            jobTitle: null,
            active: true,
            officeId: 'ACR',
            workPhone: null,
            mobilePhone: '12343123213',
            email: 'adsadsd@gmail.com',
          },
        },
      })

      expect(result.data.createNegotiator).toBeDefined()
    })
  })
  describe('updateNegotiator', () => {
    it('should update negotiator', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateNegotiator($id: String!, $input: NegotiatorInput!) {
            updateNegotiator(id: $id, negotiator: $input) {
              id
              name
              created
              modified
              jobTitle
              active
              officeId
              workPhone
              mobilePhone
              email
              metadata
            }
          }
        `,
        variables: {
          id: 'AAAD',
          input: {
            name: 'aaaaa11',
            jobTitle: null,
            active: true,
            officeId: 'ACR',
            workPhone: null,
            mobilePhone: '12343123213',
            email: 'adsadsd@gmail.com',
          },
        },
      })

      expect(result.data.updateNegotiator).toBeDefined()
    })
  })
})
