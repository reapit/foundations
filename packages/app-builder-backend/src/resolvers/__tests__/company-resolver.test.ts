import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import { mockCompanies } from '../__mocks__/mock-companies'
import { mockCompany } from '../__mocks__/mock-company'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'

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

const setupCompaniesMocks = () => {
  mockQuery('GetCompanies', undefined, {
    GetCompanies: mockCompanies,
  })
  // mockQuery('SearchCompanies', undefined, {
  //   SearchContacts: mockCompanies,
  // })
  mockQuery(
    'GetCompanyById',
    { id: 'MKT2200002' },
    {
      GetCompanyById: mockCompany,
    },
  )
  mockQuery(
    'CreateCompany',
    {
      id: 'MKT22000047',
      name: 'Reapit Company',
      active: false,
      workPhone: '4455667788',
      mobilePhone: null,
      email: 'example@email.com',
      address: {
        buildingNumber: '15',
        buildingName: '123',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        country: 'GB',
      },
    },
    {
      CreateCompany: mockCompany,
    },
  )
  mockQuery(
    'UpdateCompany',
    {
      id: 'MKT22000047',
      name: 'Reapit Company',
      active: false,
      workPhone: '4455667788',
      mobilePhone: null,
      email: 'example@email.com',
      address: {
        buildingNumber: '15',
        buildingName: '123',
        line1: 'Example street',
        line2: 'Solihull',
        line3: 'West Midlands',
        line4: '',
        postcode: 'B91 2XX',
        country: 'GB',
      },
    },
    {
      UpdateCompany: mockCompany,
    },
  )
}

const listCompaniesQuery = gql`
  query ListCompanies {
    listCompanies {
      id
      created
      modified
      name
      active
      workPhone
      mobilePhone
      email
      metadata
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
    }
  }
`

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

describe('company-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupCompaniesMocks()
    client = await getGraphqlClient()
  })

  describe('listCompanies', () => {
    it('should return companies', async () => {
      const result = await client.query({
        query: listCompaniesQuery,
      })
      expect(result.data.listCompanies).toBeDefined()
      expect(result.data.listCompanies[0]).toEqual({
        __typename: 'Company',
        id: 'MKT22000047',
        name: 'Reapit Company',
        created: '2022-04-01T09:12:38.000Z',
        modified: '2022-04-19T06:11:11.000Z',
        active: false,
        workPhone: '4455667788',
        mobilePhone: null,
        email: 'example@email.com',
        address: {
          __typename: 'CompanyAddress',
          buildingNumber: '15',
          buildingName: '123',
          line1: 'Example street',
          line2: 'Solihull',
          line3: 'West Midlands',
          line4: '',
          postcode: 'B91 2XX',
          country: 'GB',
        },
      })
    })
  })

  describe('getCompany', () => {
    it('should return company', async () => {
      const result = await client.query({
        query: gql`
          query ($id: String!) {
            getCompany(id: $id) {
              id
              created
              modified
              name
              active
              workPhone
              mobilePhone
              email
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
            }
          }
        `,
        variables: {
          id: 'MKT22000047',
        },
      })
      expect(result.data.getCompany).toBeDefined()
      expect(result.data.getCompany).toEqual({
        __typename: 'Company',
        id: 'MKT22000047',
        name: 'Reapit Company',
        created: '2022-04-01T09:12:38.000Z',
        modified: '2022-04-19T06:11:11.000Z',
        active: false,
        workPhone: '4455667788',
        mobilePhone: null,
        email: 'example@email.com',
        address: {
          __typename: 'CompanyAddress',
          buildingNumber: '15',
          buildingName: '123',
          line1: 'Example street',
          line2: 'Solihull',
          line3: 'West Midlands',
          line4: '',
          postcode: 'B91 2XX',
          country: 'GB',
        },
      })
    })
  })

  describe('createCompany', () => {
    it('should create company', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateCompany($input: CompanyInput!) {
            createCompany(company: $input) {
              id
              created
              modified
              name
              active
              workPhone
              mobilePhone
              email
              metadata
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
            }
          }
        `,
        variables: {
          input: {
            name: 'Reapit Company',
            active: false,
            workPhone: '4455667788',
            mobilePhone: null,
            email: 'example@email.com',
            address: {
              buildingNumber: '15',
              buildingName: '123',
              line1: 'Example street',
              line2: 'Solihull',
              line3: 'West Midlands',
              line4: '',
              postcode: 'B91 2XX',
              country: 'GB',
            },
          },
        },
      })

      expect(result.data.createCompany).toBeDefined()
    })
  })
  describe('updateCompany', () => {
    it('should update company', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateCompany($id: String!, $input: CompanyInput!) {
            updateCompany(id: $id, company: $input) {
              id
              created
              modified
              name
              active
              workPhone
              mobilePhone
              email
              metadata
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
            }
          }
        `,
        variables: {
          id: 'MKT22000047',
          input: {
            name: 'Reapit Company',
            active: false,
            workPhone: '4455667788',
            mobilePhone: null,
            email: 'example@email.com',
            address: {
              buildingNumber: '15',
              buildingName: '123',
              line1: 'Example street',
              line2: 'Solihull',
              line3: 'West Midlands',
              line4: '',
              postcode: 'B91 2XX',
              country: 'GB',
            },
          },
        },
      })

      expect(result.data.updateCompany).toBeDefined()
    })
  })
})
