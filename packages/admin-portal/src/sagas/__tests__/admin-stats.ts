import adminStatsSagas, { adminStatsDataListen, adminStatsDataFetch } from '../admin-stats'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { adminStatsReceiveData, adminStatsRequestFailure, AdminStatsRequestParams } from '@/actions/admin-stats'
import { getDateRange } from '@/utils/admin-stats'
import { fetchAppsList } from '@/services/apps'

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

  expect(gen.next().value).toEqual(call(fetchAppsList, { pageSize: GET_ALL_PAGE_SIZE, ...queryParams }))

  test('api call success', () => {
    const clone = gen.clone()
    const response = { data: [], totalCount: 0 }
    expect(clone.next(response).value).toEqual(put(adminStatsReceiveData(response)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw('SOME ERROR').value).toEqual(put(adminStatsRequestFailure()))
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
})
