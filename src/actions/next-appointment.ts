import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { NextAppointment } from '@/reducers/next-appointment'

export const nextAppointmentValidate = actionCreator<void>(ActionTypes.NEXT_APPOINTMENT_VALIDATE)

export const nextAppointmentValidateSuccess = actionCreator<NextAppointment>(
  ActionTypes.NEXT_APPOINTMENT_VALIDATE_SUCCESS
)

export const nextAppointmentClear = actionCreator<void>(ActionTypes.NEXT_APPOINTMENT_CLEAR)
