import { ReduxState } from '@/types/core'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export const selectAppointmentDetail = (state: ReduxState): AppointmentModel | {} => {
  return state?.appointmentDetail?.appointmentDetail || {}
}
