import { ReduxState } from '@/types/core'

export const selectAppointments = (state: ReduxState) => {
  return state?.appointments?.appointments?._embedded || []
}

export const selectAppointmentTypes = (state: ReduxState) => {
  return state?.appointments?.appointmentTypes || []
}

export const selectTodayAppointments = (state: ReduxState) => {
  return state?.appointments?.today || null
}

export const selectTomorrowAppointments = (state: ReduxState) => {
  return state?.appointments?.tomorrow || null
}

export const selectWeekAppointments = (state: ReduxState) => {
  return state?.appointments?.weekView || null
}

export const selectAppointmentsFilterTime = (state: ReduxState) => {
  return state?.appointments?.time || 'Today'
}
