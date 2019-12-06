import {
  appointmentsReceiveTodayData,
  appointmentsReceiveTomorrowData,
  appointmentsReceiveWeekData,
  appointmentsRequestData,
  appointmentsLoading,
  appointmentsClearData,
  appointmentsRequestDataFailure,
  setSelectedAppointment
} from './../actions/appointments'
import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { PagedResultAppointmentModel_, AppointmentModel, ListItemModel } from '@/types/platform'

export type AppointmentsTime = 'Today' | 'Tomorrow' | 'Week View'

export interface AppointmentsData {
  appointments: PagedResultAppointmentModel_ | null
  appointmentTypes: ListItemModel[] | null
}

export interface AppointmentsState {
  loading: boolean
  appointments: PagedResultAppointmentModel_ | null
  today: PagedResultAppointmentModel_ | null
  tomorrow: PagedResultAppointmentModel_ | null
  weekView: PagedResultAppointmentModel_ | null
  time: AppointmentsTime
  selectedAppointment: AppointmentModel | null
  appointmentTypes: ListItemModel[] | null
}

export const defaultState: AppointmentsState = {
  loading: false,
  appointments: null,
  today: null,
  tomorrow: null,
  weekView: null,
  time: 'Today',
  selectedAppointment: null,
  appointmentTypes: null
}

const appointmentsReducer = (state: AppointmentsState = defaultState, action: Action<any>): AppointmentsState => {
  if (isType(action, appointmentsRequestData)) {
    return {
      ...state,
      time: action.data.time
    }
  }

  if (isType(action, appointmentsLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, appointmentsReceiveTodayData)) {
    return {
      ...state,
      loading: false,
      appointments: action.data.appointments,
      today: action.data.appointments,
      appointmentTypes: action.data.appointmentTypes
    }
  }

  if (isType(action, appointmentsReceiveTomorrowData)) {
    return {
      ...state,
      loading: false,
      appointments: action.data.appointments,
      tomorrow: action.data.appointments,
      appointmentTypes: action.data.appointmentTypes
    }
  }

  if (isType(action, appointmentsReceiveWeekData)) {
    return {
      ...state,
      loading: false,
      appointments: action.data.appointments,
      weekView: action.data.appointments,
      appointmentTypes: action.data.appointmentTypes
    }
  }

  if (isType(action, appointmentsClearData)) {
    return {
      ...state,
      loading: false,
      appointments: null
    }
  }

  if (isType(action, appointmentsRequestDataFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  if (isType(action, setSelectedAppointment)) {
    return {
      ...state,
      selectedAppointment: action.data
    }
  }

  return state
}

export default appointmentsReducer
