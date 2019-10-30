import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectAppointments = (state: ReduxState) => {
  return oc(state).appointments.appointments.data([])
}

export const selectAppointmentTypes = (state: ReduxState) => {
  return oc(state).appointments.appointmentTypes([])
}

export const selectTodayAppointments = (state: ReduxState) => {
  return oc(state).appointments.today(null)
}

export const selectTomorrowAppointments = (state: ReduxState) => {
  return oc(state).appointments.tomorrow(null)
}

export const selectWeekAppointments = (state: ReduxState) => {
  return oc(state).appointments.weekView(null)
}
