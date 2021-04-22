import { PagedResultTopicModel_, PagedResultWebhookModel_, WebhookLogModel } from '@/services/webhooks'

export const subscriptions: PagedResultWebhookModel_ = {
  _embedded: [
    {
      id: '08d7e2b8-bc76-0139-54a3-e0310fc130a8',
      created: '2020-04-17T10:18:56',
      modified: '2020-04-22T08:43:52',
      applicationId: '313f831d-f589-415e-b778-b1a28b6778b8',
      url: 'https://en7u51gyc2mf7.x.pipedream.net',
      topicIds: ['contacts.created', 'contacts.modified'],
      customerIds: ['KNS'],
      active: true,
    },
  ],
  pageNumber: 1,
  pageSize: 25,
  pageCount: 1,
  totalCount: 1,
}

export const topics: PagedResultTopicModel_ = {
  _embedded: [
    {
      id: 'properties.created',
      created: '2020-04-17T09:48:24',
      modified: '2020-04-17T09:48:24',
      name: 'Property created',
      description: 'An event which occurs when a new property is created',
      url: 'https://www.hooksinfo.me',
      active: true,
      associatedScope: 'agencyCloud/properties.read',
      example: '',
    },
    {
      id: 'properties.modified',
      created: '2020-04-17T09:48:15',
      modified: '2020-04-17T09:48:15',
      name: 'Property modified',
      description: 'An event which occurs when an existing property is modified',
      url: 'https://www.hooksinfo.me',
      active: true,
      associatedScope: 'agencyCloud/properties.read',
      example: '',
    },
  ],
  pageNumber: 1,
  pageSize: 25,
  pageCount: 4,
  totalCount: 4,
}

export const mockWebhookLogs: WebhookLogModel[] = [
  {
    timeStamp: '2021-04-13T12:17:04.177+00:00',
    applicationId: 'dab46391-b07d-4869-8614-139aa798cc1f',
    url: 'https://3391b00a1f9c1fcae3e09d28dd99b7c9.m.pipedream.net',
    payload:
      '{"eventId":"130a134e-c1d2-4090-88d5-7e5d34567566","entityId":null,"customerId":"RES","eventTime":"2021-04-13T12:17:01.6684226Z","topicId":"application.install","new":{"customerId":"RES","organisationId":"cb00cca4-0e1e-49c8-9f8d-1ddacbd393eb","customerName":"Reapit Sales","applicationName":"Online Check List","applicationId":"7gvr744qtpqn2batr1hc8hie0c","customerAddress":{"hseName":"Radcliffe House","hseNo":"5","address1":"Blenheim Court","address2":"Solihull","address3":"","address4":"","postcode":"B91 2AA","country":"GB"},"customerEmail":"sales@reapit.com"},"old":null,"diff":null}',
    topicId: 'application.install',
    statusCode: 200,
  },
]
