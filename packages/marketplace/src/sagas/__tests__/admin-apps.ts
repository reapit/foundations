import adminAppsSagas, { adminAppsFeatured, adminAppsFetch, adminAppsListen } from '../admin-apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { appsDataStub, featuredAppsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import {
  adminAppsReceiveData,
  adminAppsRequestFailure,
  AdminAppsFeaturedParams,
  adminAppsSetFormState,
} from '@/actions/admin-apps'
import { selectAdminAppsData } from '@/selector/admin'
import api from '../api'

jest.mock('@reapit/elements')

const params = {
  data: {
    pageNumber: 1,
  },
}

describe('adminAppsFetch', () => {
  const gen = cloneableGenerator(adminAppsFetch)(params)
  expect(gen.next().value).toEqual(
    call(api.fetchAdminApps, {
      params: params.data,
    }),
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

const featuredParams = {
  data: {
    id: '1',
    isFeatured: true,
  } as AdminAppsFeaturedParams,
}

describe('adminAppsFeatured', () => {
  const gen = cloneableGenerator(adminAppsFeatured as any)(featuredParams)
  const data = featuredAppsDataStub.data
  expect(gen.next().value).toEqual(put(adminAppsSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(select(selectAdminAppsData))
  const newData = data.data?.map(d => ({
    ...d,
    isFeatured: d.id === featuredParams.data.id ? !d.isFeatured : d.isFeatured,
  }))
  // expect equal store
  expect(gen.next({ ...data, data: newData }).value).toEqual(put(adminAppsReceiveData({ ...data, data: newData })))

  expect(gen.next(appsDataStub.data).value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/1/feature`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      body: featuredParams.data.isFeatured ? { isFeatured: featuredParams.data.isFeatured } : undefined,
      method: featuredParams.data.isFeatured ? 'PUT' : 'DELETE',
      headers: MARKETPLACE_HEADERS,
    }),
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
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      // expect store to be reverted back
      expect(clone.next().value).toEqual(put(adminAppsReceiveData(featuredAppsDataStub.data)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('adminAppsSagas thunks', () => {
  describe('adminAppsListen', () => {
    it('should request data when called', () => {
      const gen = adminAppsListen()

      expect(gen.next().value).toEqual(takeLatest<Action<void>>(ActionTypes.ADMIN_APPS_REQUEST_DATA, adminAppsFetch))
      expect(gen.next().value).toEqual(
        takeLatest<Action<AdminAppsFeaturedParams>>(ActionTypes.ADMIN_APPS_REQUEST_FEATURED, adminAppsFeatured),
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
