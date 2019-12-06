import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@/types/platform'

export const selectAppointmentDetail = (state: ReduxState): AppointmentModel | {} => {
  return state?.appointmentDetail?.appointmentDetail || {}
}
