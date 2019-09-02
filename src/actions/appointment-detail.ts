import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppointmentModel } from '@/types/appointments'

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
