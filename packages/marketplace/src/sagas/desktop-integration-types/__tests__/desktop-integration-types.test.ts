import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import {
  desktopIntegrationTypesSagas,
  fetchDesktopIntegrationTypes,
  fetchDesktopIntegrationTypesListen,
} from '@/sagas/desktop-integration-types'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import {
  fetchDesktopIntegrationTypesApi,
  FetchDesktopIntegrationTypesParams,
} from '@/services/desktop-integration-types'
import {
  fetchDesktopIntegrationTypesFailed,
  fetchDesktopIntegrationTypesSuccess,
} from '@/actions/desktop-integration-types'
import { desktopIntegrationTypesStub } from '@/sagas/__stubs__/desktop-integration-types'

describe('desktop-integration-types', () => {
  const params = {
    data: {
      pageNumber: 1,
      pageSize: 10,
    },
    type: ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES as string,
  } as Action<FetchDesktopIntegrationTypesParams>

  describe('fetchDesktopIntegrationTypes', () => {
    const gen = cloneableGenerator(fetchDesktopIntegrationTypes)(params)
    expect(gen.next().value).toEqual(call(fetchDesktopIntegrationTypesApi, { ...params.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(desktopIntegrationTypesStub).value).toEqual(
        put(fetchDesktopIntegrationTypesSuccess(desktopIntegrationTypesStub)),
      )
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchDesktopIntegrationTypesFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchDesktopIntegrationTypesListen', () => {
    it('should trigger request data when called', () => {
      const gen = fetchDesktopIntegrationTypesListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchDesktopIntegrationTypesParams>>(
          ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES,
          fetchDesktopIntegrationTypes,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appDetailSagas', () => {
    it('should listen data request', () => {
      const gen = desktopIntegrationTypesSagas()
      expect(gen.next().value).toEqual(all([fork(fetchDesktopIntegrationTypesListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
