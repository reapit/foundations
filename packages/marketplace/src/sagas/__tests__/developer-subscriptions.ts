import {
  developerFetchSubcriptionsList,
  developerFetchSubcriptionsListListen,
  developerSubcriptionsListSagas,
  developerDeleteSubcriptionListen,
  developerDeleteSubcription,
} from '../developer-subscriptions'
import { takeLatest, put, call, all, fork, select } from 'redux-saga/effects'
import { Action } from '@/types/core'
import {
  FetchSubscriptionsListParams,
  fetchSubscriptionsList,
  SubscriptionsListResult,
  deleteSubscription,
} from '@/services/subscriptions'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { developerFetchSubscriptionsSuccess, developerFetchSubscriptions } from '@/actions/developer'
import { selectDeveloperId } from '@/selector/auth'
import errorMessages from '@/constants/error-messages'

jest.mock('@reapit/elements')

describe('developerWebhook thunks', () => {
  describe('webhookSubscriptionsListen', () => {
    it('should webhookSubscriptionsFetch when called', () => {
      const gen = developerFetchSubcriptionsListListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchSubscriptionsListParams>>(
          ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS,
          developerFetchSubcriptionsList,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('developerDeleteSubcriptionListen', () => {
    it('should developerDeleteSubcription when called', () => {
      const gen = developerDeleteSubcriptionListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION, developerDeleteSubcription),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})

describe('Subcriptions sagas', () => {
  describe('developerFetchSubcriptionsList fetch data', () => {
    const params: Action<FetchSubscriptionsListParams> = {
      data: { developerId: 'developerId' },
      type: 'DEVELOPER_FETCH_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(developerFetchSubcriptionsList)(params)

    expect(gen.next().value).toEqual(call(fetchSubscriptionsList, { developerId: params.data.developerId }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(developerFetchSubscriptionsSuccess({} as SubscriptionsListResult)))
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

describe('developerSubcriptionsListSagas', () => {
  it('should listen request data', () => {
    const gen = developerSubcriptionsListSagas()
    expect(gen.next().value).toEqual(
      all([fork(developerFetchSubcriptionsListListen), fork(developerDeleteSubcriptionListen)]),
    )
    expect(gen.next().done).toBe(true)
  })
})
