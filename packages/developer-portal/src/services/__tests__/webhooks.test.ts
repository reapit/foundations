import { fetcher } from '@reapit/utils-common'
import { WebhookLogsQuery } from '../../components/pages/webhooks/webhooks-logs'
import { mockWebhookLogs } from '../../tests/__stubs__/webhooks'
import { createWebhooksTopic, fetchWebhooksTopicById, updateWebhooksTopicById } from '../webhooks'
import {
  createWebhooksSubscription,
  fetchWebhookLogsApi,
  fetchWebhooksSubscriptionsListApi,
  fetchWebhooksSubscriptionById,
  deleteWebhooksSubscriptionById,
  pingWebhooksById,
  fetchWebhooksTopicsListApi,
} from '../webhooks'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock

describe('webhook services', () => {
  describe('fetchWebhookLogsApi', () => {
    const params: WebhookLogsQuery = { applicationId: 'SOME_ID', from: 'SOME_DATE_STRING', to: 'SOME_DATE_STRING' }

    it('should return a response from the webhooks service', async () => {
      mockedFetch.mockReturnValueOnce(mockWebhookLogs)
      expect(await fetchWebhookLogsApi(params)).toEqual(mockWebhookLogs)
    })
  })

  describe('fetchWebhooksSubscriptionsListApi', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchWebhooksSubscriptionsListApi({})).toEqual(stub)
    })
  })

  describe('createWebhooksSubscription', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createWebhooksSubscription({})).toEqual(stub)
    })
  })

  describe('fetchWebhooksSubscriptionById', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchWebhooksSubscriptionById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('deleteWebhooksSubscriptionById', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await deleteWebhooksSubscriptionById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('pingWebhooksById', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await pingWebhooksById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('fetchWebhooksTopicsListApi', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchWebhooksTopicsListApi({})).toEqual(stub)
    })
  })

  describe('createWebhooksTopic', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createWebhooksTopic({})).toEqual(stub)
    })
  })

  describe('fetchWebhooksTopicById', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchWebhooksTopicById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('updateWebhooksTopicById', () => {
    it('should return a response from the webhooks service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await updateWebhooksTopicById({ id: 'SOME_ID' })).toEqual(stub)
    })
  })
})
