import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'
import { mockProperties } from '../__mocks__/mock-properties'
import { mockProperty } from '../__mocks__/mock-property'
import { PropertyFragment } from '../../entities/property'

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

const setupPropertiesMocks = () => {
  mockQuery('GetProperties', undefined, {
    GetProperties: mockProperties,
  })
  mockQuery(
    'GetPropertyById',
    { id: 'MKT220020' },
    {
      GetPropertyById: mockProperty,
    },
  )
  mockQuery(
    'CreateProperty',
    {
      id: 'MKT220020',
      created: '2022-05-05T08:55:03.000Z',
      modified: '2022-05-05T08:55:03.000Z',
      type: ['house'],
      description:
        'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
      bedrooms: 4,
      receptions: 1,
      bathrooms: 2,
      address: {
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        buildingName: '',
        buildingNumber: '15',
        postcode: 'B91 2XX',
        geolocation: {
          latitude: 52.415859,
          longitude: 1.777338,
        },
      },
      letting: {
        rent: 750,
        rentFrequency: 'monthly',
      },
      selling: {
        price: 250000,
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
    },
    {
      CreateProperty: mockProperty,
    },
  )
  mockQuery(
    'UpdateProperty',
    {
      id: 'MKT220020',
      created: '2022-05-05T08:55:03Z',
      modified: '2022-05-05T08:55:03Z',
      type: ['house'],
      description:
        'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
      bedrooms: 4,
      receptions: 1,
      bathrooms: 2,
      address: {
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        buildingName: '',
        buildingNumber: '15',
        postcode: 'B91 2XX',
        geolocation: {
          latitude: 52.415859,
          longitude: 1.777338,
        },
      },
      letting: {
        rent: 750,
        rentFrequency: 'monthly',
      },
      selling: {
        price: 250000,
      },
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
    },
    {
      UpdateProperty: mockProperty,
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
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
  })
}

const listPropertiesQuery = gql`
  query ListProperties {
    listProperties {
      id
      created
      modified
      type
      description
      bedrooms
      receptions
      bathrooms
      address {
        line1
        line2
        line3
        line4
        buildingName
        buildingNumber
        postcode
        geolocation {
          latitude
          longitude
        }
      }
      letting {
        rent
        rentFrequency
      }
      selling {
        price
      }
      _embedded {
        images {
          id
          url
          order
        }
      }
      metadata
    }
  }
`

const getPropertyQuery = gql`
  query ($id: String!) {
    getProperty(id: $id) {
      id
      created
      modified
      type
      description
      bedrooms
      receptions
      bathrooms
      address {
        line1
        line2
        line3
        line4
        buildingName
        buildingNumber
        postcode
        geolocation {
          latitude
          longitude
        }
      }
      letting {
        rent
        rentFrequency
      }
      selling {
        price
      }
      _embedded {
        images {
          id
          url
          order
        }
      }
      metadata
    }
  }
`

describe('property-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupPropertiesMocks()
    client = await getGraphqlClient()
  })

  describe('listProperties', () => {
    it('should return properties', async () => {
      const result = await client.query({
        query: listPropertiesQuery,
      })
      expect(result.data.listProperties).toBeDefined()
      expect(result.data.listProperties[0]).toEqual({
        __typename: 'Property',
        id: 'RPT220016',
        created: '2022-05-16T11:31:18.000Z',
        modified: '2022-05-16T11:31:18.000Z',
        type: [],
        description: '',
        bedrooms: 0,
        receptions: 0,
        bathrooms: 0,
        address: {
          __typename: 'PropertyAddress',
          line1: 'New Street',
          line2: '',
          line3: '',
          line4: '',
          buildingName: '',
          buildingNumber: '123',
          postcode: '',
          geolocation: {
            __typename: 'GeoLocation',
            latitude: 52.479744,
            longitude: -1.894379,
          },
        },
        letting: null,
        selling: {
          __typename: 'PropertySelling',
          price: 0,
        },
      })
    })
  })

  describe('getProperty', () => {
    it('should return property', async () => {
      const result = await client.query({
        query: getPropertyQuery,
        variables: {
          id: 'MKT220020',
        },
      })
      expect(result.data.getProperty).toBeDefined()
      expect(result.data.getProperty).toEqual({
        __typename: 'Property',
        id: 'MKT220020',
        created: '2022-05-05T08:55:03.000Z',
        modified: '2022-05-05T08:55:03.000Z',
        type: ['house'],
        description:
          'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
        bedrooms: 4,
        receptions: 1,
        bathrooms: 2,
        address: {
          __typename: 'PropertyAddress',
          line1: 'Example street',
          line2: 'Solihull',
          line3: 'West Midlands',
          line4: '',
          buildingName: '',
          buildingNumber: '15',
          postcode: 'B91 2XX',
          geolocation: {
            __typename: 'GeoLocation',
            latitude: 52.415859,
            longitude: 1.777338,
          },
        },
        letting: {
          __typename: 'PropertyLetting',
          rent: 750,
          rentFrequency: 'monthly',
        },
        selling: {
          __typename: 'PropertySelling',
          price: 250000,
        },
      })
    })
  })

  describe('createProperty', () => {
    it('should create property', async () => {
      const result = await client.mutate({
        mutation: gql`
          ${PropertyFragment}
          mutation CreateProperty($input: PropertyInput!) {
            createProperty(property: $input) {
              id
              created
              modified
              type
              description
              bedrooms
              receptions
              bathrooms
              address {
                line1
                line2
                line3
                line4
                buildingName
                buildingNumber
                postcode
                geolocation {
                  latitude
                  longitude
                }
              }
              letting {
                rent
                rentFrequency
              }
              selling {
                price
              }
              _embedded {
                images {
                  id
                  url
                  order
                }
              }
              metadata
            }
          }
        `,
        variables: {
          input: {
            type: ['house'],
            description:
              'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
            bedrooms: 4,
            receptions: 1,
            bathrooms: 2,
            address: {
              line1: 'Example street',
              line2: 'Solihull',
              line3: 'West Midlands',
              line4: '',
              buildingName: '',
              buildingNumber: '15',
              postcode: 'B91 2XX',
              geolocation: {
                latitude: 52.415859,
                longitude: 1.777338,
              },
            },
            letting: {
              rent: 750,
              rentFrequency: 'monthly',
            },
            selling: {
              price: 250000,
            },
          },
        },
      })

      expect(result.data.createProperty).toBeDefined()
    })
  })
  describe('updateProperty', () => {
    it('should update property', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateProperty($id: String!, $input: PropertyInput!) {
            updateProperty(id: $id, property: $input) {
              id
              created
              modified
              type
              description
              bedrooms
              receptions
              bathrooms
              address {
                line1
                line2
                line3
                line4
                buildingName
                buildingNumber
                postcode
                geolocation {
                  latitude
                  longitude
                }
              }
              letting {
                rent
                rentFrequency
              }
              selling {
                price
              }
              _embedded {
                images {
                  id
                  url
                  order
                }
              }
              metadata
            }
          }
        `,
        variables: {
          id: 'MKT220020',
          input: {
            type: ['house'],
            description:
              'We are delighted to offer for sale this EXTENDED THREE BEDROOMED SEMI DETACHED PROPERTY situated in a much sought after residential location of Greasby, having the benefits of two separate entertaining rooms, morning room, extended kitchen. To the first floor there are three bedrooms, spacious family bathroom, gas central heating gardens front and rear and off road parking.',
            bedrooms: 4,
            receptions: 1,
            bathrooms: 2,
            address: {
              line1: 'Example street',
              line2: 'Solihull',
              line3: 'West Midlands',
              line4: '',
              buildingName: '',
              buildingNumber: '15',
              postcode: 'B91 2XX',
              geolocation: {
                latitude: 52.415859,
                longitude: 1.777338,
              },
            },
            letting: {
              rent: 750,
              rentFrequency: 'monthly',
            },
            selling: {
              price: 250000,
            },
          },
        },
      })

      expect(result.data.updateProperty).toBeDefined()
    })
  })
})
