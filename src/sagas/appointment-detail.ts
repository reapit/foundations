import {
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailRequestDataFailure,
  appointmentDetailShowModal,
  appointmentDetailHideModal,
  showConfirmModalSubmitting,
  showHideConfirmModal
} from '../actions/appointment-detail'
import { appointmentsRequestData } from '@/actions/appointments'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { AppointmentDetailRequestParams } from '@/actions/appointment-detail'
import { selectAppointmentDetail } from '@/selectors/appointment-detail'
import { selectAppointmentsFilterTime } from '@/selectors/appointments'
import { AppointmentModel } from '@/types/appointments'
import { fetchAppointment, updateAppointment } from './api'

export const appointmentDetailDataFetch = function*({ data: { id } }: Action<AppointmentDetailRequestParams>) {
  yield put(appointmentDetailShowModal())
  yield put(appointmentDetailLoading(true))
  try {
    const response = yield call(fetchAppointment, { id })
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

export const cancelAppointmentRequest = function*() {
  try {
    yield put(showConfirmModalSubmitting(true))
    const currentAppointment = yield select(selectAppointmentDetail) as AppointmentModel
    const newAppointment: AppointmentModel = {
      ...currentAppointment,
      cancelled: true
    }
    const updateResponse = yield call(updateAppointment, newAppointment)
    if (updateResponse) {
      const fetchResponse = yield call(fetchAppointment, { id: currentAppointment.id })
      yield put(appointmentDetailReceiveData(fetchResponse))
      yield put(showHideConfirmModal(false))
      yield put(appointmentDetailHideModal())
      // refresh appoiments list
      const filterTime = yield select(selectAppointmentsFilterTime)
      yield put(appointmentsRequestData({ time: filterTime }))
    }
  } catch (error) {
    console.error(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(showConfirmModalSubmitting(false))
  }
}

export const appointmentDetailDataListen = function*() {
  yield takeLatest<Action<AppointmentDetailRequestParams>>(
    ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA,
    appointmentDetailDataFetch
  )
}

export const cancelAppointmentListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.CANCEL_APPOINTMENT, cancelAppointmentRequest)
}

const appointmentDetailSagas = function*() {
  yield all([fork(appointmentDetailDataListen), fork(cancelAppointmentListen)])
}

export default appointmentDetailSagas
