import { notification } from '@reapit/elements'

import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { appSubmitStubWithActions, appSubmitStub } from '@/sagas/__stubs__/apps-submit'
import { createAppAPI, fetchAppByIdByRawUrl, CreateAppParams } from '@/services/apps'
// import { getDeveloperId } from '@/utils/session'
import { Saga } from 'redux-saga'
import createAppSagas, { submitApp, createAppListen } from '../create-app'

jest.mock('@/services/upload')
jest.mock('@/services/apps')
jest.mock('@reapit/elements')

export const params: Action<CreateAppParams> = {
  data: appSubmitStubWithActions.data,
  type: 'CREATE_APP',
}

const castSagas = (submitApp as unknown) as Saga<any>
describe('submit-app post data', () => {
  const gen = cloneableGenerator(castSagas)(params)
  // expect(gen.next().value).toEqual(call(getDeveloperId))
  expect(gen.next('id').value).toEqual(call(createAppAPI, { ...appSubmitStub.data, developerId: 'id' }))

  test('api call fail if cant select developer id', () => {
    const internalGen = cloneableGenerator(castSagas)(params)
    // expect(internalGen.next().value).toEqual(call(getDeveloperId))
    expect(internalGen.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(internalGen.next().done).toBe(true)
  })

  test('api call success', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'location'
    const mockHeaders = { get: (param: string) => param }
    expect(clone.next(mockHeaders).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail when create app response header not contain location field', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
  })
  test('api call fail when fetch detail app response is empty', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'location'
    const mockHeaders = { get: (param: string) => param }

    expect(clone.next(mockHeaders).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    // expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-app thunks', () => {
  describe('createAppListen', () => {
    it('should submit data when called', () => {
      const gen = createAppListen()
      expect(gen.next().value).toEqual(takeLatest<Action<CreateAppParams>>(ActionTypes.CREATE_APP, createAppSagas))
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
