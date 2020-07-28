import ActionTypes from '@/constants/action-types'
import { put, call } from '@redux-saga/core/effects'
import { fetchtAppAuthenticationSuccess } from '@/actions/apps'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppSecretByIdAPI } from '@/services/apps'
import { requestAuthCode } from '../app-authentication'

jest.mock('@reapit/elements')
jest.mock('@/services/apps')

describe('app-detail request auth code', () => {
  const params = {
    data: '45001c67-fd1d-467b-865f-360d5a189e6f',
    type: ActionTypes.FETCH_APP_AUTHENTICATION,
  } as Action<string>
  const response = {
    clientSecret: '45001c67-fd1d-467b-865f-360d5a189e6f',
  }
  const gen = cloneableGenerator(requestAuthCode)(params)

  expect(gen.next().value).toEqual(call(fetchAppSecretByIdAPI, { id: params.data }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(response).value).toEqual(put(fetchtAppAuthenticationSuccess(response)))
    expect(clone.next().done).toBe(true)
  })
})
