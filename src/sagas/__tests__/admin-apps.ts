import adminAppsSagas, { adminAppsFeatured, adminAppsFetch, adminAppsListen } from '../admin-apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import {
  adminAppsReceiveData,
  adminAppsRequestFailure,
  AdminAppsParams,
  AdminAppsFeaturedParams,
  adminAppsSetFormState
} from '@/actions/admin-apps'
import { selectAdminAppsData } from '@/selector/admin'

jest.mock('@reapit/elements')
const params = {
  data: {
    pageNumber: 1,
    appName: '1',
    companyName: 'a',
    developerName: '1'
  }
}

describe('adminAppsFetch', () => {
  const gen = cloneableGenerator(adminAppsFetch)(params)
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}?${setQueryParams({
        ...params.data,
        pageSize: APPS_PER_PAGE
      })}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(adminAppsReceiveData(appsDataStub.data)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(new Error('')).value).toEqual(put(adminAppsRequestFailure()))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

const featuredParams = {
  data: {
    id: '1',
    isFeatured: true
  } as AdminAppsFeaturedParams
}

describe('adminAppsFeatured', () => {
  const gen = cloneableGenerator(adminAppsFeatured as any)(featuredParams)
  expect(gen.next().value).toEqual(put(adminAppsSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(select(selectAdminAppsData))
  expect(gen.next(appsDataStub.data).value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/1/feature`,
      api: REAPIT_API_BASE_URL,
      body: featuredParams.data.isFeatured ? { isFeatured: featuredParams.data.isFeatured } : undefined,
      method: featuredParams.data.isFeatured ? 'PUT' : 'DELETE',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(adminAppsSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(new Error('')).value).toEqual(put(adminAppsSetFormState('ERROR')))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('adminAppsSagas thunks', () => {
  describe('adminAppsListen', () => {
    it('should request data when called', () => {
      const gen = adminAppsListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<AdminAppsParams>>(ActionTypes.ADMIN_APPS_REQUEST_DATA, adminAppsFetch)
      )
      expect(gen.next().value).toEqual(
        takeLatest<Action<AdminAppsFeaturedParams>>(ActionTypes.ADMIN_APPS_REQUEST_FEATURED, adminAppsFeatured)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('adminAppsSagas', () => {
    it('should listen data request', () => {
      const gen = adminAppsSagas()

      expect(gen.next().value).toEqual(all([fork(adminAppsListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
