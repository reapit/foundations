import { TrafficEventsModel } from '@/reducers/app-http-traffic-event'

export const httpTrafficPerDayStub: TrafficEventsModel = {
  from: '2020-02-17',
  to: '2020-04-05',
  totalRequestCount: 178,
  totalEndpointCount: 2,
  requestsByEndpoint: [
    {
      endpoint: 'properties',
      requestCount: 90,
    },
    {
      endpoint: 'propertyImages',
      requestCount: 88,
    },
  ],
  requestsByDate: [
    {
      date: '2020-04-04',
      requestCount: 4,
    },
    {
      date: '2020-04-05',
      requestCount: 65,
    },
  ],
  requestsByCustomer: [
    {
      customerId: 'DXX',
      requestCount: 178,
    },
  ],
}
