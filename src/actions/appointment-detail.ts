import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export interface AppointmentDetailRequestParams {
  id: string
}

export const appointmentDetailRequestData = actionCreator<AppointmentDetailRequestParams>(
  ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA
)
export const appointmentDetailRequestDataFailure = actionCreator<void>(ActionTypes.APPOINTMENT_DETAIL_REQUEST_FAILURE)
export const appointmentDetailLoading = actionCreator<boolean>(ActionTypes.APPOINTMENT_DETAIL_LOADING)
export const appointmentDetailReceiveData = actionCreator<AppointmentModel | undefined>(
  ActionTypes.APPOINTMENT_DETAIL_RECEIVE_DATA
)
export const appointmentDetailShowModal = actionCreator<void>(ActionTypes.APPOINTMENT_DETAIL_SHOW_MODAL)
export const appointmentDetailHideModal = actionCreator<void>(ActionTypes.APPOINTMENT_DETAIL_HIDE_MODAL)
export const showHideConfirmModal = actionCreator<boolean>(ActionTypes.SHOW_HIDE_CONFIRM_MODAL)
export const cancelAppointment = actionCreator<void>(ActionTypes.CANCEL_APPOINTMENT)
export const showConfirmModalSubmitting = actionCreator<boolean>(ActionTypes.SHOW_CONFIRM_MODAL_SUBMITTING)
