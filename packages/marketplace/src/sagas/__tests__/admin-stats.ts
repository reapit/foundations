import adminStatsSagas, { adminStatsDataListen, adminStatsDataFetch, getUrlByArea } from '../admin-stats'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { adminStatsReceiveData, adminStatsRequestFailure, AdminStatsRequestParams } from '@/actions/admin-stats'
import { getDateRange } from '@/utils/admin-stats'
import { fetchAppsList } from '@/services/apps'
import { URLS } from '@/services/constants'

jest.mock('@reapit/elements')
jest.mock('@/services/apps')

describe('adminStatsFetch', () => {
  const params: AdminStatsRequestParams = { area: 'APPS', range: 'WEEK' }
  const gen = cloneableGenerator(adminStatsDataFetch)({ data: params })
  let queryParams = {} as any
  if (params.range !== 'ALL') {
    const dateRange = getDateRange(params.range)
    queryParams.RegisteredFrom = dateRange.from.toISOString()
    queryParams.RegisteredTo = dateRange.to.toISOString()
  }

  expect(gen.next().value).toEqual(call(fetchAppsList, { pageSize: APPS_PER_PAGE, ...queryParams }))

  test('api call success', () => {
    const clone = gen.clone()
    const response = { data: [], totalCount: 0 }
    expect(clone.next(response).value).toEqual(put(adminStatsReceiveData(response)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(new Error('')).value).toEqual(put(adminStatsRequestFailure()))
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

describe('adminStatsSagas thunks', () => {
  describe('adminStatsDataListen', () => {
    it('should request data when called', () => {
      const gen = adminStatsDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AdminStatsRequestParams>>(ActionTypes.ADMIN_STATS_REQUEST_DATA, adminStatsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('adminStatsSagas', () => {
    it('should listen data request', () => {
      const gen = adminStatsSagas()

      expect(gen.next().value).toEqual(all([fork(adminStatsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('getUrlByArea', () => {
    it('should run correctly', () => {
      expect(getUrlByArea('APPS')).toEqual(URLS.apps)
      expect(getUrlByArea('DEVELOPERS')).toEqual(URLS.developers)
      expect(getUrlByArea('INSTALLATIONS')).toEqual(URLS.installations)
    })
  })
})
