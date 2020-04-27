import { DeveloperWebhookState } from '@/reducers/webhook-edit-modal'

export const webhookDataStub: DeveloperWebhookState = {
  subcriptionCustomers: {
    data: [{ id: '0a795809-8a41-449f-9865-ae0a536db6b7', appId: '1161242a-f650-4d1d-aed7-909853fe7ee1' }],
    pageCount: 1,
    pageNumber: 1,
    pageSize: 15,
    totalCount: 1,
  },
  subcriptionTopics: {
    pageCount: 0,
    pageNumber: 1,
    pageSize: 25,
    totalCount: 0,
    _embedded: [],
  },
}
