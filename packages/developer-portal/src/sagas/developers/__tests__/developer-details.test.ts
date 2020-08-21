import { fetchDeveloperDetails, fetchDeveloperDetailsListen, developerDetailsListSagas } from '../developer-details'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { FetchDeveloperByIdParams, fetchDeveloperById } from '@/services/developers'
import { Action } from '@/types/core'
import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { fetchDeveloperDetailsSuccess, fetchDeveloperDetailsFailed } from '@/actions/developers'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { notification } from '@reapit/elements'

describe('fetchDeveloperDetails', () => {
  const params: Action<FetchDeveloperByIdParams> = {
    data: { id: 'developerId' },
    type: 'ORGANISATION_FETCH_MEMBERS',
  }
  const gen = cloneableGenerator(fetchDeveloperDetails)(params)
  expect(gen.next().value).toEqual(call(fetchDeveloperById, { id: params.data.id }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(fetchDeveloperDetailsSuccess({} as DeveloperModel)))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw({ description: errorMessages.DEFAULT_SERVER_ERROR }).value).toEqual(
      put(fetchDeveloperDetailsFailed()),
    )
    expect(clone.next().value).toEqual(
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      ),
    )
  })
})

describe('fetchDeveloperDetailsListen', () => {
  it('should trigger saga function when called', () => {
    const gen = fetchDeveloperDetailsListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchDeveloperByIdParams>>(ActionTypes.FETCH_DEVELOPER_DETAILS, fetchDeveloperDetails),
    )

    expect(gen.next().done).toBe(true)
  })
})

describe('developerDetailsListSagas', () => {
  it('should listen', () => {
    const gen = developerDetailsListSagas()
    expect(gen.next().value).toEqual(all([fork(fetchDeveloperDetailsListen)]))
    expect(gen.next().done).toBe(true)
  })
})
