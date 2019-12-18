import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  appointmentDetailRequestDataFailure,
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailShowModal,
  appointmentDetailHideModal,
  showHideConfirmModal,
  showConfirmModalSubmitting
} from '../actions/appointment-detail'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'

export interface AppointmentDetailState {
  loading: boolean
  appointmentDetail: AppointmentModel | null | undefined
  isModalVisible: boolean
  confirmModal: {
    isConfirmContentVisible: boolean
    isSubmitting: boolean
  }
}

export const defaultState: AppointmentDetailState = {
  loading: false,
  appointmentDetail: null,
  isModalVisible: false,
  confirmModal: {
    isConfirmContentVisible: false,
    isSubmitting: false
  }
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

  if (isType(action, showHideConfirmModal)) {
    return {
      ...state,
      confirmModal: {
        ...state.confirmModal,
        isConfirmContentVisible: action.data
      }
    }
  }

  if (isType(action, showConfirmModalSubmitting)) {
    return {
      ...state,
      confirmModal: {
        ...state.confirmModal,
        isSubmitting: action.data
      }
    }
  }

  return state
}

export default appointmentDetailReducer
