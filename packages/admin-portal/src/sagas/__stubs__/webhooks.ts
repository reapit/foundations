import { PagedResultWebhookModel_, PagedResultTopicModel_ } from '@/reducers/webhook-subscriptions'

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
      deleted: true,
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
