import {
  requestSubcriptionData,
  createWebhookListen,
  editWebhook,
  editWebhookListen,
  requestWebhookData,
  requestWebhookSupcriptionDataListen,
  requestWebhookDataListen,
  deleteWebhookListen,
  deleteWebhook,
  createNewWebhook,
  webhooksEditSubscription,
} from '../webhooks-edit-modal'
import { call, put, all, fork, takeLatest } from '@redux-saga/core/effects'
import {
  requestWebhookSubcriptionReceiveData,
  requestWebhookReceiveData,
  requestWebhookSubcriptionReceiveFailure,
  DeleteWebhookParams,
  EditWebhookParams,
  CreateWebhookParams,
  requestWebhookSubcriptionData,
  requestWebhookReceiveDataFailure,
  webhookSetOpenModal,
} from '@/actions/webhooks-subscriptions'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { webhookDataStub, webhookItemDataStub } from '@/sagas/__stubs__/webhook-edit'
import { setApplicationId, fetchWebhooksSubscriptionsSuccess } from '@/actions/webhooks-subscriptions'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { subscriptions } from '@/sagas/__stubs__/webhooks'
import {
  fetchWebhooksTopicsListApi,
  createWebhooksSubscription,
  updateWebhooksSubscriptionById,
  deleteWebhooksSubscriptionById,
  fetchWebhooksSubscriptionsListApi,
  fetchWebhooksSubscriptionById,
} from '@/services/webhooks'
import { fetchInstallationsList } from '@/services/installations'

jest.mock('@/services/webhooks')
jest.mock('@/services/installations')
jest.mock('@reapit/elements')
const applicationId = '1161242a-f650-4d1d-aed7-909853fe7ee1'
const params = { data: applicationId }

describe('developer fetch subscription data', () => {
  const gen = cloneableGenerator(requestSubcriptionData as any)(params)
  expect(gen.next().value).toEqual(put(setApplicationId(applicationId)))

  expect(gen.next().value).toEqual(
    all([
      call(fetchWebhooksTopicsListApi, { applicationId }),
      call(fetchInstallationsList, { appId: [applicationId] }),
    ]),
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([webhookDataStub.subcriptionTopics, webhookDataStub.subcriptionCustomers] as any).value).toEqual(
      put(requestWebhookSubcriptionReceiveData(webhookDataStub)),
    )
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, undefined]).value).toEqual(put(requestWebhookSubcriptionReceiveFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.throw && clone.throw('Call API Failed').done).toBe(true)
  })
})

describe('developer fetch webhook data', () => {
  const webhookId = ''
  const applicationId = ''
  const gen = cloneableGenerator(requestWebhookData as any)({ data: webhookId })
  expect(gen.next().value).toEqual(call(fetchWebhooksSubscriptionById, { id: webhookId }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(webhookItemDataStub as any).value).toEqual(put(requestWebhookReceiveData(webhookItemDataStub)))
    expect(clone.next(applicationId).value).toEqual(put(requestWebhookSubcriptionData(applicationId)))
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.throw && clone.throw('Call API Failed').value).toEqual(put(requestWebhookReceiveDataFailure()))
    expect(clone.next().done).toBe(true)
  })
})
describe('webhooksEditSubscription', () => {
  it('should listen request data', () => {
    const gen = webhooksEditSubscription()

    expect(gen.next().value).toEqual(
      all([
        fork(requestWebhookSupcriptionDataListen),
        fork(createWebhookListen),
        fork(editWebhookListen),
        fork(requestWebhookDataListen),
        fork(deleteWebhookListen),
      ]),
    )
    expect(gen.next().done).toBe(true)
  })
})
describe('webhook edit thunks', () => {
  describe('deleteWebhookListen', () => {
    it('should deleteWebhook when called', () => {
      const gen = deleteWebhookListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<DeleteWebhookParams>>(ActionTypes.WEBHOOK_DELETE, deleteWebhook),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('requestWebhookDataListen', () => {
    it('should requestWebhookData when called', () => {
      const gen = requestWebhookDataListen()
      expect(gen.next().value).toEqual(takeLatest<Action<string>>(ActionTypes.WEBHOOK_REQUEST_DATA, requestWebhookData))
      expect(gen.next().done).toBe(true)
    })
  })
  describe('editWebhookListen', () => {
    it('should editWebhook when called', () => {
      const gen = editWebhookListen()
      expect(gen.next().value).toEqual(takeLatest<Action<EditWebhookParams>>(ActionTypes.WEBHOOK_EDIT, editWebhook))
      expect(gen.next().done).toBe(true)
    })
  })
  describe('createWebhookListen', () => {
    it('should createNewWebhook when called', () => {
      const gen = createWebhookListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<CreateWebhookParams>>(ActionTypes.WEBHOOK_CREATE, createNewWebhook),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('requestWebhookSupcriptionDataListen', () => {
    it('should createNewWebhook when called', () => {
      const gen = requestWebhookSupcriptionDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA, requestSubcriptionData),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})

describe('deleteWebhook', () => {
  const webhookId = 'webhookId'
  const applicationId = 'applicationId'
  const gen = cloneableGenerator(deleteWebhook as any)({ data: { applicationId, webhookId } })
  expect(gen.next().value).toEqual(call(deleteWebhooksSubscriptionById, { id: webhookId }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchWebhooksSubscriptionsListApi, { applicationId: [applicationId] }))
    expect(clone.next(subscriptions).value).toEqual(put(fetchWebhooksSubscriptionsSuccess(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    expect(clone.throw && clone.throw('Call API Failed').done).toBe(true)
  })
})

describe('editWebhook', () => {
  const data = {
    applicationId: 'applicationId',
    webhookId: 'webhookId',
    url: 'url',
    topicIds: [],
    customerIds: [],
    active: true,
  }
  const gen = cloneableGenerator(editWebhook as any)({ data })
  expect(gen.next().value).toEqual(call(updateWebhooksSubscriptionById, { id: data.webhookId, ...data }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchWebhooksSubscriptionsListApi, { applicationId: [data.applicationId] }))
    expect(clone.next(subscriptions).value).toEqual(put(fetchWebhooksSubscriptionsSuccess(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    expect(clone.throw && clone.throw('Call API Failed').done).toBe(true)
  })
})

describe('createNewWebhook', () => {
  const data = {
    applicationId: 'applicationId',
    webhookId: 'webhookId',
    url: 'url',
    topicIds: [],
    customerIds: [],
    active: true,
  }
  const gen = cloneableGenerator(createNewWebhook as any)({ data })
  expect(gen.next().value).toEqual(call(createWebhooksSubscription, data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchWebhooksSubscriptionsListApi, { applicationId: [data.applicationId] }))
    expect(clone.next(subscriptions).value).toEqual(put(fetchWebhooksSubscriptionsSuccess(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw && clone.throw('Call API Failed').done).toBe(true)
  })
})
