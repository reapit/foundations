import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements'
import errorMessages from '@/constants/error-messages'
import {
  HttpTrafficPerDayParams,
  fetchTrafficStatisticsSuccess,
  fetchTrafficStatisticsFailed,
} from '@/actions/traffic-statistics'
import { fetchTrafficStatistics, FetchTrafficStatisticsParams } from '@/services/traffic-statistics'

const { FETCH_TRAFFIC_STATISTICS } = ActionTypes

export const apphttpTrafficEventSaga = function* ({ data }: Action<FetchTrafficStatisticsParams>) {
  try {
    const response = yield call(fetchTrafficStatistics, data)
    yield put(fetchTrafficStatisticsSuccess(response))
  } catch (err) {
    yield put(fetchTrafficStatisticsFailed())
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const appHttpTrafficEventListen = function* () {
  yield takeLatest<Action<HttpTrafficPerDayParams>>(FETCH_TRAFFIC_STATISTICS, apphttpTrafficEventSaga)
}

export const trafficStatisticsSagas = function* () {
  yield all([fork(appHttpTrafficEventListen)])
}
