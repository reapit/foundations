import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'
import { mockOffers } from '../__mocks__/mock-offers'
import { mockOffer } from '../__mocks__/mock-offer'

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

const setupOffersMocks = () => {
  mockQuery('GetOffers', undefined, {
    GetOffers: mockOffers,
  })
  mockQuery(
    'GetOfferById',
    { id: 'RPT210015' },
    {
      GetOfferById: mockOffer,
    },
  )
  mockQuery(
    'CreateOffer',
    {
      id: 'RPT210015',
      created: '2021-06-14T13:11:38.000Z',
      modified: '2021-06-14T13:11:38.000Z',
      currency: 'GBP',
      applicantId: 'RPT210010',
      propertyId: 'RPT210048',
      date: '2018-11-05',
      amount: '245000',
      status: 'pending',
      inclusions: 'White goods must be left',
      exclusions: 'Curtains must be removed',
      conditions: 'Must move in within 3 months.',
    },
    {
      CreateOffer: mockOffer,
    },
  )
  mockQuery(
    'UpdateOffer',
    {
      id: 'RPT210015',
      created: '2021-06-14T13:11:38.000Z',
      modified: '2021-06-14T13:11:38.000Z',
      currency: 'GBP',
      applicantId: 'RPT210010',
      propertyId: 'RPT210048',
      OfferId: null,
      date: '2018-11-05',
      amount: '245000',
      status: 'pending',
      inclusions: 'White goods must be left',
      exclusions: 'Curtains must be removed',
      conditions: 'Must move in within 3 months.',
    },
    {
      UpdateOffer: mockOffer,
    },
  )
}

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

const listOffersQuery = gql`
  query ListOffers {
    listOffers {
      id
      created
      modified
      currency
      applicantId
      propertyId
      OfferId
      date
      amount
      status
      inclusions
      exclusions
      conditions
    }
  }
`

const getOfferQuery = gql`
  query ($id: String!) {
    getOffer(id: $id) {
      id
      created
      modified
      currency
      applicantId
      propertyId
      OfferId
      date
      amount
      status
      inclusions
      exclusions
      conditions
    }
  }
`

describe('offer-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupOffersMocks()
    client = await getGraphqlClient()
  })

  describe('listOffers', () => {
    it('should return offers', async () => {
      const result = await client.query({
        query: listOffersQuery,
      })
      expect(result.data.listOffers).toBeDefined()
      expect(result.data.listOffers[0]).toEqual({
        __typename: 'Offer',
        id: 'RPT220003',
        created: '2022-03-04T13:23:53.000Z',
        modified: '2022-03-04T13:23:53.000Z',
        currency: 'GBP',
        applicantId: 'BDF151539',
        propertyId: 'RPT160003',
        date: '2022-03-04',
        amount: '369995',
        status: 'pending',
        inclusions: '',
        exclusions: '',
        conditions: '',
      })
    })
  })

  describe('getOffer', () => {
    it('should return offer', async () => {
      const result = await client.query({
        query: getOfferQuery,
        variables: {
          id: 'RPT210015',
        },
      })
      expect(result.data.getOffer).toBeDefined()
      expect(result.data.getOffer).toEqual({
        __typename: 'Offer',
        id: 'RPT210015',
        created: '2021-06-14T13:11:38.000Z',
        modified: '2021-06-14T13:11:38.000Z',
        currency: 'GBP',
        applicantId: 'RPT210010',
        propertyId: 'RPT210048',
        date: '2018-11-05',
        amount: '245000',
        status: 'pending',
        inclusions: 'White goods must be left',
        exclusions: 'Curtains must be removed',
        conditions: 'Must move in within 3 months.',
      })
    })
  })

  describe('createOffer', () => {
    it('should create offer', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateOffer($input: OfferInput!) {
            createOffer(offer: $input) {
              id
              created
              modified
              currency
              applicantId
              propertyId
              OfferId
              date
              amount
              status
              inclusions
              exclusions
              conditions
            }
          }
        `,
        variables: {
          input: {
            currency: 'GBP',
            applicantId: 'RPT210010',
            propertyId: 'RPT210048',
            OfferId: null,
            date: '2018-11-05',
            amount: '245000',
            status: 'pending',
            inclusions: 'White goods must be left',
            exclusions: 'Curtains must be removed',
            conditions: 'Must move in within 3 months.',
          },
        },
      })

      expect(result.data.createOffer).toBeDefined()
    })
  })
  describe('updateOffer', () => {
    it('should update offer', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateOffer($id: String!, $input: OfferInput!) {
            updateOffer(id: $id, offer: $input) {
              id
              created
              modified
              currency
              applicantId
              propertyId
              OfferId
              date
              amount
              status
              inclusions
              exclusions
              conditions
            }
          }
        `,
        variables: {
          id: 'RPT210015',
          input: {
            currency: 'GBP',
            applicantId: 'RPT210010',
            propertyId: 'RPT210048',
            OfferId: null,
            date: '2018-11-05',
            amount: '245000',
            status: 'pending',
            inclusions: 'White goods must be left',
            exclusions: 'Curtains must be removed',
            conditions: 'Must move in within 3 months.',
          },
        },
      })

      expect(result.data.updateOffer).toBeDefined()
    })
  })
})
