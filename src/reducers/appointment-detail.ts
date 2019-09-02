import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appointmentDetailRequestDataFailure,
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailShowModal,
  appointmentDetailHideModal
} from '../actions/appointment-detail'
import { AppointmentModel } from '@/types/appointments'

export interface AppointmentDetailState {
  loading: boolean
  appointmentDetail: AppointmentModel | null | undefined
  isModalVisible: boolean
}

export const defaultState: AppointmentDetailState = {
  loading: false,
  appointmentDetail: null,
  isModalVisible: false
}

export const appointmentDetailReducer = (
  state: AppointmentDetailState = defaultState,
  action: Action<any>
): AppointmentDetailState => {
  if (isType(action, appointmentDetailLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }
  if (isType(action, appointmentDetailReceiveData)) {
    return {
      ...state,
      appointmentDetail: action.data
    }
  }

  if (isType(action, appointmentDetailRequestDataFailure)) {
    return {
      ...state,
      loading: false
    }
  }

  if (isType(action, appointmentDetailShowModal)) {
    return {
      ...state,
      isModalVisible: true
    }
  }

  if (isType(action, appointmentDetailHideModal)) {
    return {
      ...state,
      isModalVisible: false
    }
  }

  return state
}

export default appointmentDetailReducer
