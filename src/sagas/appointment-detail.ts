import {
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailRequestDataFailure,
  appointmentDetailShowModal
} from '../actions/appointment-detail'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { URLS, REAPIT_API_BASE_URL } from '@/constants/api'
import { fetcher } from '@reapit/elements'
import { Action } from '@/types/core'
import { AppointmentDetailRequestParams } from '@/actions/appointment-detail'
import { initAuthorizedRequestHeaders } from '@/utils/api'

export const appointmentDetailDataFetch = function*({ data: { id } }: Action<AppointmentDetailRequestParams>) {
  yield put(appointmentDetailShowModal())
  yield put(appointmentDetailLoading(true))
  try {
    const headers = yield call(initAuthorizedRequestHeaders)
    const response = yield call(fetcher, {
      url: `${URLS.appointments}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })
    if (response) {
      yield put(appointmentDetailReceiveData(response))
      yield put(appointmentDetailLoading(false))
    } else {
      yield put(appointmentDetailRequestDataFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(appointmentDetailRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appointmentDetailDataListen = function*() {
  yield takeLatest<Action<AppointmentDetailRequestParams>>(
    ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA,
    appointmentDetailDataFetch
  )
}

const appointmentDetailSagas = function*() {
  yield all([fork(appointmentDetailDataListen)])
}

export default appointmentDetailSagas
