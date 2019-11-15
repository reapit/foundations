import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/appointments'

export const selectAppointmentDetail = (state: ReduxState): AppointmentModel | {} => {
  return state?.appointmentDetail?.appointmentDetail || {}
}
