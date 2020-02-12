import {
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailRequestDataFailure,
  appointmentDetailShowModal,
  appointmentDetailHideModal,
  showConfirmModalSubmitting,
  showHideConfirmModal,
} from '../actions/appointment-detail'
import { appointmentsRequestData } from '@/actions/appointments'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action, ExtendedAppointmentModel } from '@/types/core'
import { AppointmentDetailRequestParams } from '@/actions/appointment-detail'
import { selectAppointmentDetail } from '@/selectors/appointment-detail'
import { selectAppointmentsFilterTime, selectAppointmentWithId } from '@/selectors/appointments'
import { fetchAppointment, updateAppointment } from './api'
import { logger } from 'logger'

export const appointmentDetailDataFetch = function*({ data: { id } }: Action<AppointmentDetailRequestParams>) {
  yield put(appointmentDetailShowModal())
  yield put(appointmentDetailLoading(true))
  try {
    const response = yield call(fetchAppointment, { id })
    if (response) {
      /**
       * negotiators
       * properties
       * offices
       * have been fetched
       * when appointments are fetched
       *
       * Instead of use those fields from appointments
       * We will sync that data to the appointmentDetailResponse to make it consistent
       */
      const appointmentFromAppointments = yield select(selectAppointmentWithId, response.id)
      if (appointmentFromAppointments) {
        response.property = appointmentFromAppointments.property
        response.negotiators = appointmentFromAppointments.negotiators
        response.offices = appointmentFromAppointments.offices
      }

      yield put(appointmentDetailReceiveData(response))

      yield put(appointmentDetailLoading(false))
    } else {
      yield put(appointmentDetailRequestDataFailure())
    }
  } catch (err) {
    logger(err)
    yield put(appointmentDetailRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const cancelAppointmentRequest = function*() {
  try {
    yield put(showConfirmModalSubmitting(true))
    const currentAppointment = yield select(selectAppointmentDetail)
    const newAppointment: ExtendedAppointmentModel = {
      ...currentAppointment,
      cancelled: true,
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
    logger(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(showConfirmModalSubmitting(false))
  }
}

export const appointmentDetailDataListen = function*() {
  yield takeLatest<Action<AppointmentDetailRequestParams>>(
    ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA,
    appointmentDetailDataFetch,
  )
}

export const cancelAppointmentListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.CANCEL_APPOINTMENT, cancelAppointmentRequest)
}

const appointmentDetailSagas = function*() {
  yield all([fork(appointmentDetailDataListen), fork(cancelAppointmentListen)])
}

export default appointmentDetailSagas
