import { put, call, select } from 'redux-saga/effects'
import { errorThrownServer } from '@/actions/error'
import { Action } from '@/types/core'
import { selectDeveloperId } from '@/selector/auth'
import errorMessages from '@/constants/error-messages'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  developerFetchSubcriptionsList,
  developerDeleteSubcription,
  developerCreateSubscription,
} from '../developer-subscriptions'
import {
  FetchSubscriptionsListParams,
  fetchSubscriptionsList,
  PagedResultSubscriptionModel_,
  CreateSubscriptionModel,
  deleteSubscription,
  createDeveloperSubscription,
} from '@/services/developer-subscriptions'
import { subscriptionModelStub } from '@/sagas/__stubs__/developer-subscriptions'
import {
  developerFetchSubscriptionsSuccess,
  developerFetchSubscriptions,
  developerCreateSubscriptionSuccess,
} from '@/actions/developer-subscriptions'

jest.mock('@reapit/elements')
jest.mock('@/services/developer-subscriptions')

describe('developerSubscriptionsSagas', () => {
  describe('developerFetchSubcriptionsList fetch data', () => {
    const params: Action<FetchSubscriptionsListParams> = {
      data: { developerId: 'developerId' },
      type: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(developerFetchSubcriptionsList)(params)

    expect(gen.next().value).toEqual(call(fetchSubscriptionsList, { developerId: params.data.developerId }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(developerFetchSubscriptionsSuccess({} as PagedResultSubscriptionModel_)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })
  })

  describe('developerCreateSubcriptionListen', () => {
    const params: CreateSubscriptionModel = {
      developerId: '123',
      applicationId: '123',
      user: 'tester@reapit.com',
      type: 'developerEdition',
    }
    const gen = cloneableGenerator(developerCreateSubscription)({ data: params })

    expect(gen.next().value).toEqual(call(createDeveloperSubscription, params))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(subscriptionModelStub).value).toEqual(
        put(developerCreateSubscriptionSuccess(subscriptionModelStub)),
      )
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })
  })

  describe('developerDeleteSubcription', () => {
    const params: Action<string> = {
      data: 'ID',
      type: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(developerDeleteSubcription)(params)

    expect(gen.next().value).toEqual(call(deleteSubscription, { id: params.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(select(selectDeveloperId))
      expect(clone.next('ID').value).toEqual(put(developerFetchSubscriptions({ developerId: 'ID' })))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })
  })
})
