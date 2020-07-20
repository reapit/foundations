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
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { appsReceiveData, appsRequestFailure, AppsFeaturedParams, appsSetFormState } from '@/actions/apps-management'
import { selectAppsData } from '@/selector/admin'
import { featureAppById, fetchAppsList } from '@/services/apps'
import { APPS_PER_PAGE } from '@/constants/paginator'

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
    expect(clone.next(appsDataStub.data).value).toEqual(put(appsReceiveData(appsDataStub.data)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(appsRequestFailure()))
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
  } as AppsFeaturedParams,
}

describe('appsManagementFeatured', () => {
  const gen = cloneableGenerator(appsManagementFeatured as any)(featuredParams)
  const data = featuredAppsDataStub.data
  expect(gen.next().value).toEqual(put(appsSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(select(selectAppsData))
  const newData = data.data?.map(d => ({
    ...d,
    isFeatured: d.id === featuredParams.data.id ? !d.isFeatured : d.isFeatured,
  }))
  // expect equal store
  expect(gen.next({ ...data, data: newData }).value).toEqual(put(appsReceiveData({ ...data, data: newData })))

  expect(gen.next(appsDataStub.data).value).toEqual(call(featureAppById, { id: '1' }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(appsSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(appsSetFormState('ERROR')))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      // expect store to be reverted back
      expect(clone.next().value).toEqual(put(appsReceiveData(featuredAppsDataStub.data)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('appsManagementSagas thunks', () => {
  describe('appsManagementListen', () => {
    it('should request data when called', () => {
      const gen = appsManagementListen()

      expect(gen.next().value).toEqual(takeLatest<Action<void>>(ActionTypes.APPS_REQUEST_DATA, appsManagementFetch))
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppsFeaturedParams>>(ActionTypes.APPS_REQUEST_FEATURED, appsManagementFeatured),
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
