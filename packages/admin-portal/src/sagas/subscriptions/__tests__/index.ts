import devsManagementSagas, {
  fetchSubscriptionListHandler,
  fetchSubscriptionListListen,
  cancelSubscriptionHandler,
  cancelSubscriptionListen,
  createSubscriptionListen,
  fetchSubscriptionsByDevAndTypeListen,
  fetchSubscriptionsByDevAndTypeHandler,
  createSubscriptionHandler,
} from '../'
import { put, call, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  CancelSubscriptionActionParams,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailed,
  FetchSubscriptionsByTypeAndDevQuery,
  fetchSubscriptionsByTypeAndDevSuccess,
  createSubscriptionFailed,
  createSubscriptionSuccess,
} from '@/actions/subscriptions'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { SubscriptionModelPagedResult, CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { fetchSubscriptionListApi, cancelSubscriptionApi } from '@/services/subscriptions'
import { notification } from '@reapit/elements'
import { errorMessages } from '@reapit/utils'
import { Action, ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'
import { createSubscriptionApi } from '../../../services/subscriptions'

jest.mock('@/services/developers')

const fakeResponse = {} as SubscriptionModelPagedResult
const params = {
  data: {
    page: 1,
    queryString: '?type=developerEdition&developerId=17e6c3d3-b66d-4eb4-a0fc-f3d76e5809a1',
  },
}

describe('fetchSubscriptionListHandler ', () => {
  const gen = cloneableGenerator(fetchSubscriptionListHandler)(params)

  expect(gen.next().value).toEqual(
    call(fetchSubscriptionListApi, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: 1,
      subscriptionType: 'developerEdition',
      developerId: '17e6c3d3-b66d-4eb4-a0fc-f3d76e5809a1',
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(fetchSubscriptionListSuccess(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().value).toEqual(put(fetchSubscriptionListFailed(errorMessages.DEFAULT_SERVER_ERROR)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('fetchSubscriptionsByDevAndTypeHandler ', () => {
  const fetchParams = {
    data: {
      subscriptionType: 'developerRegistration',
      developerId: 'SOME_ID',
      appId: 'SOME_ID',
    },
    type: ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV,
  } as Action<FetchSubscriptionsByTypeAndDevQuery>
  const gen = cloneableGenerator(fetchSubscriptionsByDevAndTypeHandler)(fetchParams)

  expect(gen.next().value).toEqual(
    call(fetchSubscriptionListApi, {
      subscriptionType: 'developerRegistration',
      developerId: 'SOME_ID',
      applicationId: 'SOME_ID',
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(fetchSubscriptionsByTypeAndDevSuccess(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('cancelSubscriptionHandler', () => {
  const params: Action<CancelSubscriptionActionParams> = {
    data: {
      id: '123',
    },
    type: ActionTypes.DISABLE_MEMBER as ActionType,
  }
  const gen = cloneableGenerator(cancelSubscriptionHandler)(params)
  expect(gen.next().value).toEqual(call(cancelSubscriptionApi, { id: params.data.id }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(cancelSubscriptionSuccess()))
    expect(clone.next().done).toEqual(true)
  })

  it('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
        put(cancelSubscriptionFailed()),
      )
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('createSubscriptionHandler', () => {
  const params: Action<CreateSubscriptionModel> = {
    data: {
      type: 'developerRegistration',
    },
    type: ActionTypes.DISABLE_MEMBER as ActionType,
  }
  const gen = cloneableGenerator(createSubscriptionHandler)(params)
  expect(gen.next().value).toEqual(call(createSubscriptionApi, { type: params.data.type } as CreateSubscriptionModel))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(createSubscriptionSuccess()))
    expect(clone.next().done).toEqual(true)
  })

  it('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
        put(createSubscriptionFailed()),
      )
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('subscriptionsListSagas', () => {
  it('should listen', () => {
    const gen = devsManagementSagas()
    expect(gen.next().value).toEqual(
      all([
        fork(fetchSubscriptionListListen),
        fork(cancelSubscriptionListen),
        fork(createSubscriptionListen),
        fork(fetchSubscriptionsByDevAndTypeListen),
      ]),
    )
    expect(gen.next().done).toBe(true)
  })
})
