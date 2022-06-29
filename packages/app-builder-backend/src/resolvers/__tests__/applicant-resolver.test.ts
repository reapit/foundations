import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import { mockApplicants } from '../__mocks__/mock-applicants'
import { mockApplicant } from '../__mocks__/mock-applicant'
import config from '../../config.json'
import { MetadataSchemaType } from '@/utils/extract-metadata'

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

const setupApplicantsMocks = () => {
  mockQuery('GetApplicants', undefined, {
    GetApplicants: mockApplicants,
  })
  // mockQuery('SearchApplicants', undefined, {
  //   SearchContacts: mockApplicants,
  // })
  mockQuery(
    'GetApplicantById',
    { id: 'MKT220017' },
    {
      GetApplicantById: mockApplicant,
    },
  )
  mockQuery(
    'CreateApplicant',
    {
      id: 'MKT220017',
      marketingMode: 'buying',
      currency: 'GBP',
      active: true,
      notes: 'Looking to move his mother back into the area',
      type: ['house', 'maisonette', 'cottage'],
      style: ['detached', 'semiDetached'],
      situation: ['garden', 'patio'],
      parking: ['garage'],
      description: '',
      receptionsMin: 1,
      receptionsMax: 2,
      negotiatorIds: [],
      officeIds: [],
      buying: {
        priceFrom: 250000,
        priceTo: 275000,
      },
      externalArea: {
        type: 'acres',
        amountFrom: 2,
        amountTo: 3,
      },
      internalArea: {
        type: 'squareFeet',
        amount: 1500,
      },
      contactId: '',
    },
    {
      CreateApplicant: mockApplicant,
    },
  )
  mockQuery(
    'UpdateApplicant',
    {
      id: 'MKT220017',
      marketingMode: 'buying',
      currency: 'GBP',
      description: '',
      active: true,
      notes: 'Looking to move his mother back into the area',
      lastCall: '2019-11-12',
      nextCall: '2022-12-29',
      type: ['house', 'maisonette', 'cottage'],
      style: ['detached', 'semiDetached'],
      situation: ['garden', 'patio'],
      parking: ['garage'],
      bedroomsMin: 23,
      bedroomsMax: 25,
      receptionsMin: 1,
      receptionsMax: 2,
      bathroomsMin: 1,
      bathroomsMax: 0,
      buying: {
        priceFrom: 250000,
        priceTo: 275000,
      },
      negotiatorIds: [],
      officeIds: [],
      externalArea: {
        type: 'acres',
        amountFrom: 2,
        amountTo: 3,
      },
      internalArea: {
        type: 'squareFeet',
        amount: 1500,
      },
      contactId: '',
    },
    {
      UpdateApplicant: mockApplicant,
    },
  )
}

const listApplicantsQuery = gql`
  query ListApplicants {
    listApplicants {
      id
      created
      modified
      marketingMode
      currency
      active
      notes
      lastCall
      nextCall
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
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    ssrMode: true,
    link: new SchemaLink({ schema, context }),
  })
}

describe('applicant-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupApplicantsMocks()
    client = await getGraphqlClient()
  })

  describe('listApplicants', () => {
    it('should return applicants', async () => {
      const result = await client.query({
        query: listApplicantsQuery,
      })
      expect(result.data.listApplicants).toBeDefined()
      expect(result.data.listApplicants[0]).toEqual({
        __typename: 'Applicant',
        id: 'MKT220017',
        created: '2022-03-08T09:12:20.000Z',
        modified: '2022-03-08T09:12:20.000Z',
        marketingMode: 'buying',
        currency: 'GBP',
        active: true,
        notes: 'Looking to move his mother back into the area',
        lastCall: '2019-11-12',
        nextCall: '2022-12-29',
      })
    })
  })

  describe('getApplicant', () => {
    it('should return applicant', async () => {
      const result = await client.query({
        query: gql`
          query GetApplicant($id: String!) {
            getApplicant(id: $id) {
              id
              created
              modified
              marketingMode
              currency
              active
              notes
              lastCall
              nextCall
            }
          }
        `,
        variables: {
          id: 'MKT220017',
        },
      })
      expect(result.data.getApplicant).toBeDefined()
      expect(result.data.getApplicant).toEqual({
        __typename: 'Applicant',
        id: 'MKT220017',
        created: '2022-03-08T09:12:20.000Z',
        modified: '2022-03-08T09:12:20.000Z',
        marketingMode: 'buying',
        currency: 'GBP',
        active: true,
        notes: 'Looking to move his mother back into the area',
        lastCall: '2019-11-12',
        nextCall: '2022-12-29',
      })
    })
  })

  describe('createApplicant', () => {
    it('should create applicant', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateApplicant($input: ApplicantInput!) {
            createApplicant(applicant: $input) {
              marketingMode
              currency
              active
              notes
              lastCall
              nextCall
              type
              style
              situation
              parking
              bedroomsMin
              bedroomsMax
              receptionsMin
              receptionsMax
              bathroomsMin
              bathroomsMax
              buying {
                priceFrom
                priceTo
              }
              externalArea {
                type
                amountFrom
                amountTo
              }
              internalArea {
                type
                amount
              }
              negotiatorIds
              officeIds
            }
          }
        `,
        variables: {
          input: {
            departmentId: 'MKT220017',
            marketingMode: 'buying',
            currency: 'GBP',
            active: true,
            notes: 'Looking to move his mother back into the area',
            lastCall: '2019-11-12',
            nextCall: '2022-12-29',
            type: ['house', 'maisonette', 'cottage'],
            style: ['detached', 'semiDetached'],
            situation: ['garden', 'patio'],
            parking: ['garage'],
            description: '',
            bedroomsMin: 23,
            bedroomsMax: 25,
            receptionsMin: 1,
            receptionsMax: 2,
            bathroomsMin: 1,
            bathroomsMax: 0,
            buying: {
              priceFrom: 250000,
              priceTo: 275000,
            },
            externalArea: {
              type: 'acres',
              amountFrom: 2,
              amountTo: 3,
            },
            internalArea: {
              type: 'squareFeet',
              amount: 1500,
            },
            negotiatorIds: ['negotiatorIds'],
            officeIds: ['officeIds'],
            contactId: '',
          },
        },
      })

      expect(result.data.createApplicant).toBeDefined()
    })
  })
  describe('updateApplicant', () => {
    it('should update applicant', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateApplicant($id: String!, $input: ApplicantInput!) {
            updateApplicant(id: $id, applicant: $input) {
              marketingMode
              currency
              active
              notes
              lastCall
              nextCall
              type
              style
              situation
              parking
              bedroomsMin
              bedroomsMax
              receptionsMin
              receptionsMax
              bathroomsMin
              bathroomsMax
              buying {
                priceFrom
                priceTo
              }
              externalArea {
                type
                amountFrom
                amountTo
              }
              internalArea {
                type
                amount
              }
              negotiatorIds
              officeIds
            }
          }
        `,
        variables: {
          id: 'MKT220017',
          input: {
            marketingMode: 'buying',
            departmentId: 'MKT220017',
            currency: 'GBP',
            active: true,
            notes: 'Looking to move his mother back into the area',
            lastCall: '2019-11-12',
            nextCall: '2022-12-29',
            type: ['house', 'maisonette', 'cottage'],
            style: ['detached', 'semiDetached'],
            situation: ['garden', 'patio'],
            parking: ['garage'],
            description: '',
            bedroomsMin: 23,
            bedroomsMax: 25,
            contactId: '',
            receptionsMin: 1,
            receptionsMax: 2,
            bathroomsMin: 1,
            bathroomsMax: 0,
            buying: {
              priceFrom: 250000,
              priceTo: 275000,
            },
            externalArea: {
              type: 'acres',
              amountFrom: 2,
              amountTo: 3,
            },
            internalArea: {
              type: 'squareFeet',
              amount: 1500,
            },
            negotiatorIds: ['negotiatorIds'],
            officeIds: ['officeIds'],
          },
        },
      })

      expect(result.data.updateApplicant).toBeDefined()
    })
  })
})
