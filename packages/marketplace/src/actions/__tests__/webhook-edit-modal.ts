import {
  requestWebhookSubcriptionData,
  requestWebhookSubcriptionReceiveData,
  webhookEditLoading,
  createWebhook,
  CreateWebhookParams,
} from '../webhook-edit-modal'
import ActionTypes from '../../constants/action-types'
import { webhookDataStub } from '@/sagas/__stubs__/developer-webhook'

describe('developer webhook actions', () => {
  it('should create a developerWebhookLoading action', () => {
    expect(webhookEditLoading.type).toEqual(ActionTypes.WEBHOOK_EDIT_LOADING)
    expect(webhookEditLoading(true).data).toEqual(true)
  })

  it('should create a requestDeveloperWebhookData action', () => {
    expect(requestWebhookSubcriptionData.type).toEqual(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA)
  })

  it('should create a developerReceiveData action', () => {
    expect(requestWebhookSubcriptionReceiveData.type).toEqual(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA)
    expect(requestWebhookSubcriptionReceiveData(webhookDataStub).data).toEqual(webhookDataStub)
  })

  it('should create a developerCreate action', () => {
    const newWebhook: CreateWebhookParams = {
      ApplicationId: '1161242a-f650-4d1d-aed7-909853fe7ee1',
      url: 'https://github.com/',
      description: '',
      topicIds: ['0a795809-8a41-449f-9865-ae0a536db6b7'],
      customerIds: ['0a795809-8a41-449f-9865-ae0a536db6b7'],
      active: true,
    }
    expect(createWebhook.type).toEqual(ActionTypes.WEBHOOK_CREATE)
    expect(createWebhook(newWebhook).data).toEqual(newWebhook)
  })
})
