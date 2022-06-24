import gql from 'graphql-tag'
import { FieldNode, GraphQLSchema, OperationDefinitionNode } from 'graphql'
import deepEqual from 'fast-deep-equal'
import 'reflect-metadata'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'

import { Context } from '../../types'
import { mockAppointments } from '../__mocks__/mock-appointments'
import { mockAppointment } from '../__mocks__/mock-appointment'
import config from '../../config.json'
import { MetadataSchemaType } from '../../utils/extract-metadata'

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

const setupAppointmentsMocks = () => {
  mockQuery('GetAppointments', undefined, {
    GetAppointments: mockAppointments,
  })
  // mockQuery('SearchAppointments', undefined, {
  //   SearchContacts: mockAppointments,
  // })
  mockQuery(
    'GetAppointmentById',
    { id: 'MKT2200002' },
    {
      GetAppointmentById: mockAppointment,
    },
  )
  mockQuery(
    'CreateAppointment',
    {
      id: 'MKT2200002',
      typeId: 'VW',
      created: '2022-01-13T13:39:01Z',
      modified: '2022-01-13T13:39:01Z',
      start: '2022-01-13T14:00:00Z',
      end: '2022-01-13T14:30:00Z',
      description: '',
      cancelled: false,
      recurring: false,
      property: {
        id: 'MKT210001',
        type: [],
      },
      followUp: {
        due: '2022-01-14',
        notes: '',
        responseId: '',
      },
      propertyConfirmed: false,
      negotiatorConfirmed: false,
      attendeeConfirmed: false,
      attendee: null,
      negotiators: [
        {
          id: 'ADV',
          name: 'App Developer',
        },
      ],
      offices: [
        {
          id: 'MKT',
          name: 'Marketplace 1',
        },
      ],
    },
    {
      CreateAppointment: mockAppointment,
    },
  )
  mockQuery(
    'UpdateAppointment',
    {
      id: 'MKT2200002',
      typeId: 'VW',
      created: '2022-01-13T13:39:01Z',
      modified: '2022-01-13T13:39:01Z',
      start: '2022-01-13T14:00:00Z',
      end: '2022-01-13T14:30:00Z',
      description: '',
      cancelled: false,
      recurring: false,
      property: {
        id: 'MKT210001',
        type: [],
      },
      followUp: {
        due: '2022-01-14',
        notes: '',
        responseId: '',
      },
      propertyConfirmed: false,
      negotiatorConfirmed: false,
      attendeeConfirmed: false,
      attendee: null,
      negotiators: [
        {
          id: 'ADV',
          name: 'App Developer',
        },
      ],
      offices: [
        {
          id: 'MKT',
          name: 'Marketplace 1',
        },
      ],
    },
    {
      UpdateAppointment: mockAppointment,
    },
  )
}

const listAppointmentsQuery = gql`
  query ListAppointments($start: String!, $end: String!) {
    listAppointments(start: $start, end: $end) {
      id
      start
      end
      description
      cancelled
      typeId
      property {
        type
        id
      }
      recurring
      propertyConfirmed
      negotiatorConfirmed
      propertyConfirmed
      negotiators {
        id
        name
      }
      offices {
        id
        name
      }
      attendeeConfirmed
      followUp {
        due
        notes
        responseId
      }
      attendee {
        id
      }
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

describe('appointment-resolver', () => {
  let client: ApolloClient<any>
  beforeEach(async () => {
    fetchMock.resetHistory()
    setupAppointmentsMocks()
    client = await getGraphqlClient()
  })

  describe('listAppointments', () => {
    it('should return appointments', async () => {
      const result = await client.query({
        query: listAppointmentsQuery,
        variables: {
          start: '2022-01-01',
          end: '2022-05-18',
        },
      })
      expect(result.data.listAppointments).toBeDefined()
      expect(result.data.listAppointments[0]).toEqual({
        __typename: 'Appointment',
        id: 'MKT2200002',
        typeId: 'VW',
        created: '2022-01-13T13:39:01.000Z',
        modified: '2022-01-13T13:39:01.000Z',
        start: '2022-01-13T14:00:00Z',
        end: '2022-01-13T14:30:00Z',
        description: '',
        cancelled: false,
        recurring: false,
        property: {
          __typename: 'Property',
          id: 'MKT210001',
          type: [],
        },
        followUp: {
          __typename: 'AppointmentFollowUp',
          due: '2022-01-14',
          notes: '',
          responseId: '',
        },
        propertyConfirmed: false,
        negotiatorConfirmed: false,
        attendeeConfirmed: false,
        negotiators: [
          {
            __typename: 'Negotiator',
            id: 'ADV',
            name: 'App Developer',
          },
        ],
        offices: [
          {
            __typename: 'Office',
            id: 'MKT',
            name: 'Marketplace 1',
          },
        ],
      })
    })
  })

  // describe('searchContacts', () => {
  //   it('should return contacts', async () => {
  //     const result = await client.query({
  //       query: gql`
  //         query SearchContacts($query: String!) {
  //           searchContacts(query: $query) {
  //             id
  //             forename
  //             surname
  //             title
  //             email
  //             marketingConsent
  //           }
  //         }
  //       `,
  //       variables: {
  //         query: 'Smith',
  //       },
  //     })
  //     expect(result.data.searchContacts).toBeDefined()
  //     expect(result.data.searchContacts[0]).toEqual({
  //       __typename: 'Contact',
  //       id: 'RPT20000017',
  //       title: 'Mr',
  //       forename: 'John',
  //       surname: 'Smith',
  //       email: 'example@email.com',
  //       marketingConsent: 'grant',
  //     })
  //   })
  // })

  describe('getAppointment', () => {
    it('should return appointment', async () => {
      const result = await client.query({
        query: gql`
          query ($id: String!) {
            getAppointment(id: $id) {
              id
              start
              end
              description
              cancelled
              typeId
              property {
                type
                id
              }
              recurring
              propertyConfirmed
              negotiatorConfirmed
              propertyConfirmed
              negotiators {
                id
                name
              }
              offices {
                id
                name
              }
              attendeeConfirmed
              followUp {
                due
                notes
                responseId
              }
              attendee {
                id
              }
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
          id: 'MKT2200002',
        },
      })
      expect(result.data.getAppointment).toBeDefined()
      expect(result.data.getAppointment).toEqual({
        __typename: 'Appointment',
        id: 'MKT2200002',
        typeId: 'VW',
        created: '2022-01-13T13:39:01.000Z',
        modified: '2022-01-13T13:39:01.000Z',
        start: '2022-01-13T14:00:00Z',
        end: '2022-01-13T14:30:00Z',
        description: '',
        cancelled: false,
        recurring: false,
        property: {
          __typename: 'Property',
          id: 'MKT210001',
          type: [],
        },
        followUp: {
          __typename: 'AppointmentFollowUp',
          due: '2022-01-14',
          notes: '',
          responseId: '',
        },
        propertyConfirmed: false,
        negotiatorConfirmed: false,
        attendeeConfirmed: false,
        negotiators: [
          {
            __typename: 'Negotiator',
            id: 'ADV',
            name: 'App Developer',
          },
        ],
        offices: [
          {
            __typename: 'Office',
            id: 'MKT',
            name: 'Marketplace 1',
          },
        ],
      })
    })
  })

  describe('createAppointment', () => {
    it('should create appointment', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation CreateAppointment($input: AppointmentInput!) {
            createAppointment(appointment: $input) {
              id
              created
              modified
              start
              end
              recurring
              cancelled
              followUp {
                due
                responseId
                notes
              }
              attendee {
                type
                id
                contacts {
                  id
                  name
                  workPhone
                  homePhone
                  mobilePhone
                  email
                }
              }
              organiserId
              accompanied
              negotiatorConfirmed
              attendeeConfirmed
              propertyConfirmed

              negotiatorIds
              officeIds
              propertyId
            }
          }
        `,
        variables: {
          input: {
            typeId: 'VW',
            start: '2022-01-13T14:00:00Z',
            end: '2022-01-13T14:30:00Z',
            description: '',
            cancelled: false,
            recurring: false,
            propertyId: '',
            followUp: {
              due: '2022-01-14',
              notes: '',
              responseId: '',
            },
            propertyConfirmed: false,
            negotiatorConfirmed: false,
            attendeeConfirmed: false,
            attendees: {
              type: '',
              contact: {
                name: 'test',
              },
            },
            recurrence: {
              interval: 12345,
              type: '',
              until: '2022-01-18',
            },
            organiserId: 'sdfgh',
            accompanied: false,
            negotiatorIds: ['negotiatorIds'],
            officeIds: ['officeIds'],
          },
        },
      })

      expect(result.data.createAppointment).toBeDefined()
    })
  })
  describe('updateAppointment', () => {
    it('should update appointment', async () => {
      const result = await client.mutate({
        mutation: gql`
          mutation UpdateAppointment($id: String!, $input: AppointmentInput!) {
            updateAppointment(id: $id, appointment: $input) {
              id
              created
              modified
              start
              end
              recurring
              cancelled
              followUp {
                due
                responseId
                notes
              }
              attendee {
                type
                id
                contacts {
                  id
                  name
                  workPhone
                  homePhone
                  mobilePhone
                  email
                }
              }
              organiserId
              accompanied
              negotiatorConfirmed
              attendeeConfirmed
              propertyConfirmed

              negotiatorIds
              officeIds
              propertyId
            }
          }
        `,
        variables: {
          id: 'MKT220017',
          input: {
            typeId: 'VW',
            start: '2022-01-13T14:00:00Z',
            end: '2022-01-13T14:30:00Z',
            description: '',
            cancelled: false,
            recurring: false,
            propertyId: '',
            followUp: {
              due: '2022-01-14',
              notes: '',
              responseId: '',
            },
            propertyConfirmed: false,
            negotiatorConfirmed: false,
            attendeeConfirmed: false,
            attendees: {
              type: '',
              contact: {
                name: 'test',
              },
            },
            recurrence: {
              interval: 12345,
              type: '',
              until: '2022-01-18',
            },
            organiserId: 'sdfgh',
            accompanied: false,
            negotiatorIds: ['negotiatorIds'],
            officeIds: ['officeIds'],
          },
        },
      })

      expect(result.data.updateAppointment).toBeDefined()
    })
  })
})
