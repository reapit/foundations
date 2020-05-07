import developerWebhookSagas, {
  requestSupcriptionData,
  requestWebhookData,
  fetchWebhookSubscriptionTopics,
  fetchWebhookSubscriptionCustomers,
  fetchWebhookData,
  createWebhookListen,
  editWebhookListen,
  requestWebhookSupcriptionDataListen,
  requestWebhookDataListen,
  deleteWebhookListen,
  deleteWebhook,
  editWebhook,
  createNewWebhook,
  deleteEditWebhook,
  putEditWebhook,
  postCreateWebhook,
} from '../webhook-edit-modal'
import { call, put, all, fork, takeLatest } from '@redux-saga/core/effects'
import {
  requestWebhookSubcriptionReceiveData,
  webhookEditLoading,
  requestWebhookReceiveData,
  requestWebhookSubcriptionReceiveFailure,
  DeleteWebhookParams,
  EditWebhookParams,
  CreateWebhookParams,
  requestWebhookSubcriptionData,
  requestWebhookReceiveDataFailure,
  webhookSetOpenModal,
} from '@/actions/webhook-edit-modal'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { webhookDataStub, webhookItemDataStub } from '../__stubs__/webhook-edit'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '../../../../elements/src/utils/validators/error-messages'
import { setApplicationId, webhookSubscriptionsReceiveData } from '@/actions/webhook-subscriptions'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { fetchSubscriptions } from '../webhook-subscriptions'
import { subscriptions } from '../__stubs__/webhooks'
import { initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')
const applicationId = '1161242a-f650-4d1d-aed7-909853fe7ee1'
const params = { data: applicationId }

describe('developer fetch subscription data', () => {
  const gen = cloneableGenerator(requestSupcriptionData as any)(params)
  expect(gen.next().value).toEqual(put(webhookEditLoading(true)))
  expect(gen.next().value).toEqual(put(setApplicationId(applicationId)))

  expect(gen.next().value).toEqual(
    all([
      call(fetchWebhookSubscriptionTopics, { applicationId }),
      call(fetchWebhookSubscriptionCustomers, { AppId: applicationId }),
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
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('developer fetch webhook data', () => {
  const webhookId = ''
  const applicationId = ''
  const gen = cloneableGenerator(requestWebhookData as any)({ data: webhookId })
  expect(gen.next().value).toEqual(put(webhookEditLoading(true)))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(call(fetchWebhookData, { webhookId }))
    expect(clone.next(webhookItemDataStub as any).value).toEqual(put(requestWebhookReceiveData(webhookItemDataStub)))
    expect(clone.next(applicationId).value).toEqual(put(requestWebhookSubcriptionData(applicationId)))
  })
  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(false).value).toEqual(call(fetchWebhookData, { webhookId }))
    expect(clone.next().value).toEqual(put(requestWebhookReceiveDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('developerWebhookSagas', () => {
  it('should listen request data', () => {
    const gen = developerWebhookSagas()

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
        takeLatest<Action<string>>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA, requestSupcriptionData),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})

describe('deleteWebhook', () => {
  const webhookId = 'webhookId'
  const applicationId = 'applicationId'
  const gen = cloneableGenerator(deleteWebhook as any)({ data: { applicationId, webhookId } })
  expect(gen.next().value).toEqual(call(deleteEditWebhook, { webhookId }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchSubscriptions, applicationId))
    expect(clone.next(subscriptions).value).toEqual(put(webhookSubscriptionsReceiveData(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
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
  expect(gen.next().value).toEqual(call(putEditWebhook, data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchSubscriptions, data.applicationId))
    expect(clone.next(subscriptions).value).toEqual(put(webhookSubscriptionsReceiveData(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
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
  expect(gen.next().value).toEqual(call(postCreateWebhook, data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(webhookSetOpenModal('')))
    expect(clone.next().value).toEqual(call(fetchSubscriptions, data.applicationId))
    expect(clone.next(subscriptions).value).toEqual(put(webhookSubscriptionsReceiveData(subscriptions)))
    expect(clone.next().done).toBe(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('deleteEditWebhook request', () => {
  it('should deleteEditWebhook run correctly', () => {
    deleteEditWebhook({ webhookId: '' })
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})

describe('putEditWebhook request', () => {
  it('should putEditWebhook run correctly', () => {
    const data = {
      applicationId: 'applicationId',
      webhookId: 'webhookId',
      url: 'url',
      topicIds: [],
      customerIds: [],
      active: true,
    }
    putEditWebhook(data)
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})

describe('postCreateWebhook request', () => {
  it('should postCreateWebhook run correctly', () => {
    const data = {
      applicationId: 'applicationId',
      webhookId: 'webhookId',
      url: 'url',
      topicIds: [],
      customerIds: [],
      active: true,
    }
    postCreateWebhook(data)
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})

describe('fetchWebhookData request', () => {
  it('should fetchWebhookData run correctly', () => {
    const data = {
      webhookId: 'webhookId',
    }
    fetchWebhookData(data)
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})

describe('fetchWebhookSubscriptionCustomers request', () => {
  it('should fetchWebhookSubscriptionCustomers run correctly', () => {
    const data = {
      AppId: 'AppId',
    }
    fetchWebhookSubscriptionCustomers(data)
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})

describe('fetchWebhookSubscriptionTopics request', () => {
  it('should fetchWebhookSubscriptionTopics run correctly', () => {
    const data = {
      applicationId: 'webhookId',
    }
    fetchWebhookSubscriptionTopics(data)
      .then(() => {
        expect(initAuthorizedRequestHeaders).toHaveBeenCalled()
      })
      .then(() => {
        expect(fetcher).toHaveBeenCalled()
      })
  })
})
