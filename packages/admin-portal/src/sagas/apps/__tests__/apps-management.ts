import appsManagementSagas, {
  appsManagementFeatured,
  appsManagementFetch,
  appsManagementListen,
} from '../apps-management'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { appsDataStub, featuredAppsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'

import errorMessages from '@/constants/error-messages'
import { fetchAppListSuccess, fetchAppListFailed, AppsFeaturedParams } from '@/actions/apps-management'
import { selectAppsData } from '@/selector/admin'
import { featureAppById, fetchAppsList } from '@/services/apps'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { notification } from '@reapit/elements'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

const data = { pageNumber: 1, page: 1 }

describe('appsManagementFetch', () => {
  const gen = cloneableGenerator(appsManagementFetch)({ data })
  expect(gen.next().value).toEqual(
    call(fetchAppsList, {
      ...data,
      pageSize: APPS_PER_PAGE,
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(fetchAppListSuccess(appsDataStub.data)))
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
      expect(clone.next().value).toEqual(put(fetchAppListFailed(errorMessages.DEFAULT_SERVER_ERROR)))
      expect(clone.next().done).toBe(true)
    }
  })
})

const featuredParams = {
  data: {
    id: '1',
    isFeatured: true,
  } as AppsFeaturedParams,
}

describe('appsManagementFeatured', () => {
  const gen = cloneableGenerator(appsManagementFeatured as any)(featuredParams)
  const data = featuredAppsDataStub.data
  expect(gen.next().value).toEqual(select(selectAppsData))
  const newData = data.data?.map((d) => ({
    ...d,
    isFeatured: d.id === featuredParams.data.id ? !d.isFeatured : d.isFeatured,
  }))
  // expect equal store
  expect(gen.next({ ...data, data: newData }).value).toEqual(put(fetchAppListSuccess({ ...data, data: newData })))

  expect(gen.next(appsDataStub.data).value).toEqual(call(featureAppById, { id: '1' }))

  test('api call success', () => {
    const clone = gen.clone()
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
      // expect store to be reverted back
      expect(clone.next().value).toEqual(put(fetchAppListSuccess(featuredAppsDataStub.data)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('appsManagementSagas thunks', () => {
  describe('appsManagementListen', () => {
    it('should request data when called', () => {
      const gen = appsManagementListen()

      expect(gen.next().value).toEqual(takeLatest<Action<void>>(ActionTypes.FETCH_APP_LIST, appsManagementFetch))
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppsFeaturedParams>>(ActionTypes.REQUEST_MARK_APP_AS_FEATURED, appsManagementFeatured),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appsManagementSagas', () => {
    it('should listen data request', () => {
      const gen = appsManagementSagas()

      expect(gen.next().value).toEqual(all([fork(appsManagementListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
