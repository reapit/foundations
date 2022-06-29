import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'
import { mockOffices } from '../__mocks__/mock-offices'
import { mockOffice } from '../__mocks__/mock-office'
import { OfficeFragment } from '../../entities/office'

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

const setupOfficesMocks = () => {
  mockQuery('GetOffices', undefined, {
    GetOffices: mockOffices,
  })
  mockQuery(
    'GetOfficeById',
    { id: 'CNO' },
    {
      GetOfficeById: mockOffice,
    },
  )
  mockQuery(
    'CreateOffice',
    {
      id: 'CNO',
      name: 'create new office 5',
      created: '2020-03-16T08:54:08.000Z',
      modified: '2020-03-16T08:54:08.000Z',
      workPhone: '0987654321',
      email: 'tester@yahoo.com',
    },
    {
      CreateOffice: mockOffice,
    },
  )
  mockQuery(
    'UpdateOffice',
    {
      id: 'CNO',
      name: 'create new office 5',
      created: '2020-03-16T08:54:08.000Z',
      modified: '2020-03-16T08:54:08.000Z',
      workPhone: '0987654321',
      email: 'tester@yahoo.com',
    },
    {
      UpdateOffice: mockOffice,
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

const listOfficesQuery = gql`
  query ListOffices {
    listOffices {
      id
      modified
      created
      name
      manager
      address {
        buildingName
        buildingNumber
        line1
        line2
        line3
        line4
        postcode
        countryId
      }
      workPhone
      email
      metadata
    }
  }
`

const getOfficeQuery = gql`
  query ($id: String!) {
    getOffice(id: $id) {
      id
      modified
      created
      name
      manager
      address {
        buildingName
        buildingNumber
        line1
        line2
        line3
        line4
        postcode
        country
      }
      workPhone
      email
    }
  }
`

describe('office-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupOfficesMocks()
    client = await getGraphqlClient()
  })

  describe('listOffices', () => {
    it('should return offices', async () => {
      const result = await client.query({
        query: listOfficesQuery,
      })
      expect(result.data.listOffices).toBeDefined()
      expect(result.data.listOffices[0]).toEqual({
        __typename: 'Office',
        id: 'CNO',
        name: 'create new office 5',
        created: '2020-03-16T08:54:08.000Z',
        modified: '2020-03-16T08:54:08.000Z',
        workPhone: '0987654321',
        email: 'tester@yahoo.com',
        address: null,
        manager: null,
      })
    })
  })

  describe('getOffice', () => {
    it('should return office', async () => {
      const result = await client.query({
        query: getOfficeQuery,
        variables: {
          id: 'CNO',
        },
      })
      expect(result.data.getOffice).toBeDefined()
      expect(result.data.getOffice).toEqual({
        __typename: 'Office',
        id: 'CNO',
        name: 'create new office 5',
        created: '2020-03-16T08:54:08.000Z',
        modified: '2020-03-16T08:54:08.000Z',
        workPhone: '0987654321',
        email: 'tester@yahoo.com',
        address: null,
        manager: null,
      })
    })
  })

  describe('createOffice', () => {
    it('should create office', async () => {
      const result = await client.mutate({
        mutation: gql`
          ${OfficeFragment}
          mutation CreateOffice($input: OfficeInput!) {
            createOffice(office: $input) {
              id
              modified
              created
              name
              manager
              address {
                buildingName
                buildingNumber
                line1
                line2
                line3
                line4
                postcode
                countryId
              }
              workPhone
              email
              metadata
            }
          }
        `,
        variables: {
          input: {
            name: 'create new office 5',
            workPhone: '0987654321',
            email: 'tester@yahoo.com',
          },
        },
      })

      expect(result.data.createOffice).toBeDefined()
    })
  })
  describe('updateOffice', () => {
    it('should update office', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateOffice($id: String!, $input: OfficeInput!) {
            updateOffice(id: $id, office: $input) {
              id
              modified
              created
              name
              manager
              address {
                buildingName
                buildingNumber
                line1
                line2
                line3
                line4
                postcode
                countryId
              }
              workPhone
              email
              metadata
            }
          }
        `,
        variables: {
          id: 'CNO',
          input: {
            name: 'create new office 5',
            workPhone: '0987654321',
            email: 'tester@yahoo.com',
          },
        },
      })

      expect(result.data.updateOffice).toBeDefined()
    })
  })
})
