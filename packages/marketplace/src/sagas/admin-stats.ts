import { adminStatsReceiveData, adminStatsRequestFailure, AdminStatsRequestParams } from '../actions/admin-stats'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import dayjs from 'dayjs'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { getDateRange } from '@/utils/admin-stats'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { fetchDevelopersList } from '@/services/developers'
import { fetchInstallationsList } from '@/services/installations'

export const MARKETPLACE_GOLIVE_DATE = '2020-02-14'

export const adminStatsDataFetch = function*({ data }) {
  try {
    const { area, range } = data
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
    const servicesToCall = {
      DEVELOPERS: fetchDevelopersList,
      INSTALLATIONS: fetchInstallationsList,
      APPS: fetchAppsList,
    }

    if (!servicesToCall) {
      throw new Error('No service matched')
    }

    const response = yield call(servicesToCall[area], { pageSize: GET_ALL_PAGE_SIZE, ...queryParams })

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

export const adminStatsDataListen = function*() {
  yield takeLatest<Action<AdminStatsRequestParams>>(ActionTypes.ADMIN_STATS_REQUEST_DATA, adminStatsDataFetch)
}

const adminStatsSagas = function*() {
  yield all([fork(adminStatsDataListen)])
}

export default adminStatsSagas
