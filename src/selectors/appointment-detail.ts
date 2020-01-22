import { ReduxState, ExtendedAppointmentModel } from '@/types/core'

export const selectAppointmentDetail = (state: ReduxState): ExtendedAppointmentModel | {} => {
  return state?.appointmentDetail?.appointmentDetail || {}
}
