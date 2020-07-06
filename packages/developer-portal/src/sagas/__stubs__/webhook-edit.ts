import { WebhookSubscription, WebhookModal, WebhookEditState } from '@/reducers/webhook-edit-modal'
import { CreateWebhookParams } from '@/actions/webhook-edit-modal'

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
    _embedded: [],
  },
}

export const webhookItemDataStub: WebhookModal = {
  id: '',
  applicationId: '',
  url: '',
  description: '',
  topicIds: [],
  customerIds: [],
  active: false,
}
export const webhookEditDataStub: WebhookEditState = {
  ...webhookDataStub,
  webhookData: webhookItemDataStub,
  loading: false,
  modalType: '',
}

export const createWebhookItem: CreateWebhookParams = {
  applicationId: '',
  url: '',
  description: '',
  topicIds: [],
  customerIds: [],
  active: true,
}
