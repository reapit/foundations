import { TrafficEventsModel } from '@reapit/foundations-ts-definitions'

export const mockTrafficEventsModel: TrafficEventsModel = {
  from: '2022-03-22',
  to: '2022-03-29',
  totalRequestCount: 436,
  totalEndpointCount: 10,
  requestsByEndpoint: [
    {
      endpoint: 'appointments',
      requestCount: 5,
    },
    {
      endpoint: 'configuration',
      requestCount: 81,
    },
    {
      endpoint: 'contacts',
      requestCount: 188,
    },
    {
      endpoint: 'documents',
      requestCount: 15,
    },
    {
      endpoint: 'identityChecks',
      requestCount: 101,
    },
    {
      endpoint: 'negotiators',
      requestCount: 6,
    },
    {
      endpoint: 'offices',
      requestCount: 6,
    },
    {
      endpoint: 'properties',
      requestCount: 7,
    },
    {
      endpoint: 'vendors',
      requestCount: 1,
    },
    {
      endpoint: 'webhook',
      requestCount: 26,
    },
  ],
  requestsByDate: [
    {
      date: '2022-03-22',
      requestCount: 107,
    },
    {
      date: '2022-03-23',
      requestCount: 110,
    },
    {
      date: '2022-03-24',
      requestCount: 73,
    },
    {
      date: '2022-03-25',
      requestCount: 39,
    },
    {
      date: '2022-03-26',
      requestCount: 0,
    },
    {
      date: '2022-03-27',
      requestCount: 4,
    },
    {
      date: '2022-03-28',
      requestCount: 47,
    },
    {
      date: '2022-03-29',
      requestCount: 56,
    },
  ],
  requestsByCustomer: [
    {
      customerId: 'RES',
      requestCount: 9,
    },
    {
      customerId: 'SBOX',
      requestCount: 427,
    },
  ],
}
