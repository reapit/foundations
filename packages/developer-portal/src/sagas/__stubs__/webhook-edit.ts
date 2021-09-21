import {
  WebhookSubscription,
  WebhookModal,
  WebhookEditState,
  WebhookCreateEditState,
} from '@/reducers/webhooks-subscriptions/webhook-edit-modal'
import { CreateWebhookParams } from '@/actions/webhooks-subscriptions'

export const webhookDataStub: WebhookSubscription = {
  subcriptionCustomers: {
    data: [],
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
    _embedded: [
      {
        id: 'SOME_ID',
        name: 'SOME_NAME',
        description: 'SOME_DESCRIPTION',
        url: 'https://example.com',
        active: true,
      },
    ],
  },
}

export const webhookItemDataStub: WebhookModal = {
  id: 'SOME_ID',
  applicationId: 'SOME_APP_ID',
  url: 'https://example.com',
  description: 'SOME_DESCRIPTION',
  topicIds: ['SOME_ID'],
  customerIds: ['SOME_ID'],
  ignoreEtagOnlyChanges: true,
  active: false,
}
export const webhookEditDataStub: WebhookEditState = {
  ...webhookDataStub,
  webhookData: webhookItemDataStub,
  loading: false,
  modalType: '',
  webhookCreateEditState: WebhookCreateEditState.INITIAL,
}

export const createWebhookItem: CreateWebhookParams = {
  applicationId: '',
  url: '',
  description: '',
  topicIds: [],
  customerIds: [],
  ignoreEtagOnlyChanges: true,
  active: true,
}
