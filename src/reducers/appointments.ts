import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appointmentsRequestData,
  appointmentsLoading,
  appointmentsReceiveData,
  appointmentsClearData,
  appointmentsRequestDataFailure
} from '../actions/appointments'
import { PagedResultAppointmentModel_ } from '@/types/appointments'

export type AppointmentsTime = 'Today' | 'Tomorrow' | 'Next week'

export interface AppointmentsData {
  data: PagedResultAppointmentModel_
}

export interface AppointmentsState {
  loading: boolean
  appointments: AppointmentsData | null
  time: AppointmentsTime
}

export const defaultState: AppointmentsState = {
  loading: false,
  appointments: null,
  time: 'Today'
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
      appointments: action.data || null
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

  return state
}

export default appointmentsReducer
