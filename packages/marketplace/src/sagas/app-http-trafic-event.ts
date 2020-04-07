import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import {
  HttpTrafficPerDayParams,
  httpTrafficPerDayReceiveData,
  httpTrafficPerDayRequestDataFailure,
} from '@/actions/app-http-traffic-event'
import { logger } from 'logger'

const { HTTP_TRAFFIC_PER_DAY_REQUEST_DATA } = ActionTypes

export const fetchHttpTraficPerDay = async (data: HttpTrafficPerDayParams) => {
  const response = await fetcher({
    url: `${URLS.trafficEvents}/trafficStatistics?${setQueryParams({ ...data })}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: { ...generateHeader(window.reapit.config.marketplaceApiKey) },
  })
  return response
}

export const apphttpTrafficEventSaga = function*({ data }: Action<HttpTrafficPerDayParams>) {
  try {
    const response = yield call(fetchHttpTraficPerDay, { ...data })
    yield put(httpTrafficPerDayReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(httpTrafficPerDayRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appHttpTrafficEventListen = function*() {
  yield takeLatest<Action<HttpTrafficPerDayParams>>(HTTP_TRAFFIC_PER_DAY_REQUEST_DATA, apphttpTrafficEventSaga)
}

export const appHttpTrafficEventSagas = function*() {
  yield all([fork(appHttpTrafficEventListen)])
}

export default appHttpTrafficEventSagas
