import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'
import { mockPropertyImages } from '../__mocks__/mock-property-images'
import { mockPropertyImage } from '../__mocks__/mock-property-image'
import { PropertyImageFragment } from '../../entities/property-image'

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

const setupPropertyImagesMocks = () => {
  mockQuery('GetPropertyImages', undefined, {
    GetPropertyImages: mockPropertyImages,
  })
  mockQuery(
    'GetPropertyImageById',
    { id: 'MKT220015_01.png' },
    {
      GetPropertyImageById: mockPropertyImage,
    },
  )
  mockQuery(
    'CreatePropertyImage',
    {
      id: 'MKT220015_01.png',
      created: '2022-04-22T14:20:42.000Z',
      modified: '2022-04-22T14:20:42.000Z',
      type: 'photograph',
      caption: 'Living room',
      url: 'https://test.assets.reapit.net/sbox/live/pictures/MKT/22/MKT220015_01.png',
      order: null,
    },
    {
      CreatePropertyImage: mockPropertyImage,
    },
  )
  mockQuery(
    'UpdatePropertyImage',
    {
      id: 'MKT220015_01.png',
      created: '2022-04-22T14:20:42.000Z',
      modified: '2022-04-22T14:20:42.000Z',
      type: 'photograph',
      caption: 'Living room',
      url: 'https://test.assets.reapit.net/sbox/live/pictures/MKT/22/MKT220015_01.png',
      order: null,
    },
    {
      UpdatePropertyImage: mockPropertyImage,
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

const listPropertyImagesQuery = gql`
  query ListPropertyImages($propertyId: String!) {
    listPropertyImages(propertyId: $propertyId) {
      id
      created
      modified
      type
      url
      caption
      order
    }
  }
`

const getPropertyImageQuery = gql`
  query ($id: String!) {
    getPropertyImage(id: $id) {
      id
      created
      modified
      type
      url
      caption
      order
    }
  }
`

describe('property-image-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupPropertyImagesMocks()
    client = await getGraphqlClient()
  })

  describe('listPropertyImages', () => {
    it('should return property-images', async () => {
      const result = await client.query({
        query: listPropertyImagesQuery,
        variables: {
          propertyId: '12345',
        },
      })
      expect(result.data.listPropertyImages).toBeDefined()
      expect(result.data.listPropertyImages[0]).toEqual({
        __typename: 'PropertyImage',
        id: 'MKT220015_01.png',
        created: '2022-04-22T14:20:42.000Z',
        modified: '2022-04-22T14:20:42.000Z',
        type: 'photograph',
        caption: 'Living room',
        url: 'https://test.assets.reapit.net/sbox/live/pictures/MKT/22/MKT220015_01.png',
        order: null,
      })
    })
  })

  describe('getPropertyImage', () => {
    it('should return property-image', async () => {
      const result = await client.query({
        query: getPropertyImageQuery,
        variables: {
          id: 'MKT220015_01.png',
        },
      })
      expect(result.data.getPropertyImage).toBeDefined()
      expect(result.data.getPropertyImage).toEqual({
        __typename: 'PropertyImage',
        id: 'MKT220015_01.png',
        created: '2022-04-22T14:20:42.000Z',
        modified: '2022-04-22T14:20:42.000Z',
        type: 'photograph',
        caption: 'Living room',
        url: 'https://test.assets.reapit.net/sbox/live/pictures/MKT/22/MKT220015_01.png',
        order: null,
      })
    })
  })

  describe('createPropertyImage', () => {
    it('should create property-image', async () => {
      const result = await client.mutate({
        mutation: gql`
          ${PropertyImageFragment}
          mutation CreatePropertyImage($input: PropertyImageInput!) {
            createPropertyImage(propertyImage: $input) {
              id
              created
              modified
              type
              url
              caption
              order
            }
          }
        `,
        variables: {
          input: {
            data: 'dGVzdGluZ3Rlc3RpbmcxMjM=',
            type: 'photograph',
            caption: 'Living room',
            propertyId: '1234',
            order: null,
          },
        },
      })

      console.log('res', result)

      expect(result.data.createPropertyImage).toBeDefined()
    })
  })
  describe('updatePropertyImage', () => {
    it('should update property-image', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdatePropertyImage($id: String!, $input: PropertyImageInput!) {
            updatePropertyImage(id: $id, propertyImage: $input) {
              id
              created
              modified
              type
              url
              caption
              order
            }
          }
        `,
        variables: {
          id: 'MKT220015_01.png',
          input: {
            data: 'dGVzdGluZ3Rlc3RpbmcxMjM=',
            type: 'photograph',
            caption: 'Living room',
            propertyId: '1234',
            order: null,
          },
        },
      })

      expect(result.data.updatePropertyImage).toBeDefined()
    })
  })
})
