import appPermissionSagas, { appPermissionDataFetch, appPermissionDataListen } from '../app-permission'
import { appPermissionStub } from '../__stubs__/app-permission'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  appPermissionLoading,
  appPermissionRequestDataFailure,
  appPermissionReceiveData
} from '@/actions/app-permission'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { selectClientId } from '@/selector/client'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

jest.mock('@reapit/elements')
jest.mock('@/selector/client')

const params = { data: '1' }

describe('app-permission sagas', () => {
  describe('app-permission fetch data', () => {
    const gen = cloneableGenerator(appPermissionDataFetch)(params)
    expect(gen.next().value).toEqual(put(appPermissionLoading(true)))
    expect(gen.next().value).toEqual(select(selectClientId))
    expect(gen.next(1).value).toEqual(
      call(fetcher, {
        url: `${URLS.apps}/${1}/scopes?clientId=${1}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: MARKETPLACE_HEADERS
      })
    )

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(appPermissionStub).value).toEqual(put(appPermissionReceiveData(appPermissionStub)))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      expect(clone.next(undefined).value).toEqual(put(appPermissionRequestDataFailure()))
      expect(clone.next().done).toBe(true)
    })
    test('api call error', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(gen.next().value).toEqual(put(appPermissionRequestDataFailure()))
    })
  })

  describe('app-permission fetch data error', () => {
    const gen = cloneableGenerator(appPermissionDataFetch)(params)

    expect(gen.next().value).toEqual(put(appPermissionLoading(true)))
    expect(gen.next().value).toEqual(select(selectClientId))

    // @ts-ignore
    expect(gen.throw(new Error('Client id is not exists')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(gen.next().value).toEqual(put(appPermissionRequestDataFailure()))
  })

  describe('app-detail thunks', () => {
    describe('appPermissionDataListen', () => {
      it('should trigger request data when called', () => {
        const gen = appPermissionDataListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<String>>(ActionTypes.APP_PERMISION_REQUEST_DATA, appPermissionDataFetch)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('appPermissionSagas', () => {
      it('should listen data request', () => {
        const gen = appPermissionSagas()

        expect(gen.next().value).toEqual(all([fork(appPermissionDataListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
