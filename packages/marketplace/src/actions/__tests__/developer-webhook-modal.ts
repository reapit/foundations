import {
  requestDeveloperWebhookData,
  requestDeveloperWebhookReceiveData,
  createDeveloperWebhook,
  CreateDeveloperWebhookParams,
  developerWebhookLoading,
} from '../developer-webhook-modal'
import ActionTypes from '../../constants/action-types'
import { webhookDataStub } from '@/sagas/__stubs__/developer-webhook'

describe('developer webhook actions', () => {
  it('should create a developerWebhookLoading action', () => {
    expect(developerWebhookLoading.type).toEqual(ActionTypes.DEVELOPER_WEBHOOK_LOADING)
    expect(developerWebhookLoading(true).data).toEqual(true)
  })

  it('should create a requestDeveloperWebhookData action', () => {
    expect(requestDeveloperWebhookData.type).toEqual(ActionTypes.DEVELOPER_WEBHOOK_REQUEST_DATA)
  })

  it('should create a developerReceiveData action', () => {
    expect(requestDeveloperWebhookReceiveData.type).toEqual(ActionTypes.DEVELOPER_WEBHOOK_RECEIVE_DATA)
    expect(requestDeveloperWebhookReceiveData(webhookDataStub).data).toEqual(webhookDataStub)
  })

  it('should create a developerCreate action', () => {
    const newWebhook: CreateDeveloperWebhookParams = {
      ApplicationId: '1161242a-f650-4d1d-aed7-909853fe7ee1',
      url: 'https://github.com/',
      description: '',
      topicIds: ['0a795809-8a41-449f-9865-ae0a536db6b7'],
      customerIds: ['0a795809-8a41-449f-9865-ae0a536db6b7'],
      active: true,
    }
    expect(createDeveloperWebhook.type).toEqual(ActionTypes.DEVELOPER_WEBHOOK_CREATE)
    expect(createDeveloperWebhook(newWebhook).data).toEqual(newWebhook)
  })
})
