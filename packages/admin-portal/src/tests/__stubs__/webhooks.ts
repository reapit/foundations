import { Platform } from '@reapit/foundations-ts-definitions'

export const mockWebhookModelPagedResult: Platform.WebhookModelPagedResult = {
  _embedded: [
    {
      id: '08da9fb4-b5d2-4871-8381-b57039a0edc5',
      created: '2022-09-26T11:46:12',
      modified: '',
      url: 'https://blah.com',
      description: '',
      topicIds: ['application.install', 'applicants.modified'],
      active: true,
      ignoreEtagOnlyChanges: false,
    },
  ],
  pageNumber: 1,
  pageSize: 100,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}
