import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import {
  AppUsageStatsParams,
  appUsageStatsReceiveData,
  appUsageStatsRequestDataFailure,
} from '@/actions/app-usage-stats'
import { logger } from '@reapit/utils'
import { fetchStatisticsList, FetchStatisticsListParams } from '@/services/statistics'

const { APP_USAGE_STATS_REQUEST_DATA } = ActionTypes

export const appUsageStatsSaga = function*({ data }: Action<FetchStatisticsListParams>) {
  try {
    const response = yield call(fetchStatisticsList, data)
    yield put(appUsageStatsReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(appUsageStatsRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appUsageStatsListen = function*() {
  yield takeLatest<Action<AppUsageStatsParams>>(APP_USAGE_STATS_REQUEST_DATA, appUsageStatsSaga)
}

export const appUsageStatsSagas = function*() {
  yield all([fork(appUsageStatsListen)])
}

export default appUsageStatsSagas
