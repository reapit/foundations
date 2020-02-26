import { adminStatsReceiveData, adminStatsRequestFailure, AdminStatsRequestParams } from '../actions/admin-stats'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import dayjs from 'dayjs'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { fetcher, setQueryParams } from '@reapit/elements'
import { Action } from '@/types/core'
import { Area } from '@/components/pages/admin-stats'
import { getDateRange } from '@/utils/admin-stats'
import { logger } from 'logger'

export const MARKETPLACE_GOLIVE_DATE = '2020-02-14'

export const adminStatsDataFetch = function*({ data }) {
  try {
    const { area, range } = data
    const url = getUrlByArea(area)
    let queryParams = {} as any
    if (range !== 'ALL') {
      const dateRange = getDateRange(range)
      queryParams.RegisteredFrom = dateRange.from.toISOString()
      queryParams.RegisteredTo = dateRange.to.toISOString()
    } else {
      queryParams.RegisteredFrom = dayjs(MARKETPLACE_GOLIVE_DATE)
        .toDate()
        .toISOString()
    }
    const response = yield call(fetcher, {
      url: `${url}?${setQueryParams({
        pageSize: GET_ALL_PAGE_SIZE,
        ...queryParams,
      })}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS,
    })
    if (response) {
      yield put(adminStatsReceiveData({ data: response.data, totalCount: response.totalCount }))
    } else {
      yield put(adminStatsRequestFailure())
    }
  } catch (err) {
    logger(err)
    yield put(adminStatsRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const getUrlByArea = (area: Area) => {
  switch (area) {
    case 'APPS':
      return URLS.apps
    case 'DEVELOPERS':
      return URLS.developers
    case 'INSTALLATIONS':
      return URLS.installations
  }
}

export const adminStatsDataListen = function*() {
  yield takeLatest<Action<AdminStatsRequestParams>>(ActionTypes.ADMIN_STATS_REQUEST_DATA, adminStatsDataFetch)
}

const adminStatsSagas = function*() {
  yield all([fork(adminStatsDataListen)])
}

export default adminStatsSagas
