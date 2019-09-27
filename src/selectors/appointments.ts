import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectAppointments = (state: ReduxState) => {
  return oc(state).appointments.appointments.data([])
}
