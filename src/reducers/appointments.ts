import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appointmentsRequestData,
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsClearData,
  appointmentsRequestDataFailure,
  setSelectedAppointment
} from '../actions/appointments'
import { PagedResultAppointmentModel_, AppointmentModel } from '@/types/appointments'
import { ListItemModel } from '../types/configuration'

export type AppointmentsTime = 'Today' | 'Tomorrow' | 'Week View'

export interface AppointmentsData {
  appointments: PagedResultAppointmentModel_ | null
  appointmentTypes: ListItemModel[] | null
}

export interface AppointmentsState {
  loading: boolean
  appointments: PagedResultAppointmentModel_ | null
  time: AppointmentsTime
  selectedAppointment: AppointmentModel | null
  appointmentTypes: ListItemModel[] | null
}

export const defaultState: AppointmentsState = {
  loading: false,
  appointments: null,
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

  if (isType(action, appointmentsReceiveData)) {
    return {
      ...state,
      loading: false,
      appointments: action.data.appointments,
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
