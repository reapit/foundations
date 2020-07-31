import { notification } from '@reapit/elements'

import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { fork, all, call, takeLatest, put } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { appSubmitStubWithActions, appSubmitStub } from '@/sagas/__stubs__/apps-submit'
import { createAppAPI, fetchAppByIdByRawUrl, CreateAppParams } from '@/services/apps'
import { Saga } from 'redux-saga'
import createAppSagas, { submitApp, createAppListen } from '../create-app'
import { getDeveloperId } from '@/utils/session'
import { createAppFailed, createAppSuccess } from '@/actions/apps'

jest.mock('@/services/upload')
jest.mock('@/services/scopes')
jest.mock('@/services/apps')
jest.mock('@/services/categories')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

export const params: Action<CreateAppParams> = {
  data: appSubmitStubWithActions.data,
  type: 'CREATE_APP',
}

const castSagas = (submitApp as unknown) as Saga<any>
describe('submit-app post data', () => {
  const gen = cloneableGenerator(castSagas)(params)
  expect(gen.next().value).toEqual(call(getDeveloperId))
  expect(gen.next('id').value).toEqual(call(createAppAPI, { ...appSubmitStub.data, developerId: 'id' }))

  test('api call fail if cant select developer id', () => {
    const internalGen = cloneableGenerator(castSagas)(params)
    expect(internalGen.next().value).toEqual(call(getDeveloperId))
    expect(internalGen.next().value).toEqual(put(createAppFailed()))
    expect(internalGen.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
      }),
    )
    expect(internalGen.next().done).toBe(true)
  })

  test('api call success', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'location'
    const mockHeaders = { get: (param: string) => param }
    expect(clone.next(mockHeaders).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next().value).toEqual(put(createAppSuccess()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.next().value).toEqual(put(createAppFailed()))
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
      }),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail when create app response header not contain location field', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(createAppFailed()))
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
      }),
    )
  })
})

describe('submit-app thunks', () => {
  describe('createAppListen', () => {
    it('should submit data when called', () => {
      const gen = createAppListen()
      expect(gen.next().value).toEqual(takeLatest<Action<CreateAppParams>>(ActionTypes.CREATE_APP, submitApp))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('createAppSagas', () => {
    it('should listen saga', () => {
      const gen = createAppSagas()

      expect(gen.next().value).toEqual(all([fork(createAppListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
