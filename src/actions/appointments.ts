import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { AppointmentsData, AppointmentsTime } from '../reducers/appointments'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export interface AppointmentRequestParams {
  time: AppointmentsTime
}

export const appointmentsRequestData = actionCreator<AppointmentRequestParams>(ActionTypes.APPOINTMENTS_REQUEST_DATA)
export const appointmentsRequestDataFailure = actionCreator<void>(ActionTypes.APPOINTMENTS_REQUEST_FAILURE)
export const appointmentsLoading = actionCreator<boolean>(ActionTypes.APPOINTMENTS_LOADING)
export const appointmentsReceiveData = actionCreator<AppointmentsData>(ActionTypes.APPOINTMENTS_RECEIVE_DATA)
export const appointmentsClearData = actionCreator<null>(ActionTypes.APPOINTMENTS_CLEAR_DATA)
export const setSelectedAppointment = actionCreator<AppointmentModel | null>(ActionTypes.SET_SELECTED_APPOINTMENT)

export const appointmentsReceiveTodayData = actionCreator<AppointmentsData>(ActionTypes.APPOINTMENTS_RECEIVE_TODAY_DATA)
export const appointmentsReceiveTomorrowData = actionCreator<AppointmentsData>(
  ActionTypes.APPOINTMENTS_RECEIVE_TOMORROW_DATA
)
export const appointmentsReceiveWeekData = actionCreator<AppointmentsData>(ActionTypes.APPOINTMENTS_RECEIVE_WEEK_DATA)
