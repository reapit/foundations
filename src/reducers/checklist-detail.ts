import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailShowModal,
  checkListDetailHideModal,
  checkListDetailSubmitForm
} from '../actions/checklist-detail'
import { ContactModel } from '@/types/contact-api-schema'

export interface ChecklistDetailState {
  loading: boolean
  isModalVisible: boolean
  modalContentType: string
  checklistDetailData: {
    contact: ContactModel
  } | null
  isSubmitting: boolean
}

export const defaultState: ChecklistDetailState = {
  loading: false,
  isModalVisible: false,
  checklistDetailData: null,
  modalContentType: 'PROFILE',
  isSubmitting: false
}

const checklistReducer = (state: ChecklistDetailState = defaultState, action: Action<any>): ChecklistDetailState => {
  if (isType(action, checklistDetailLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, checklistDetailReceiveData)) {
    return {
      ...state,
      loading: false,
      checklistDetailData: action.data || null
    }
  }

  if (isType(action, checkListDetailShowModal)) {
    return {
      ...state,
      modalContentType: action.data,
      isModalVisible: true
    }
  }

  if (isType(action, checkListDetailHideModal)) {
    return {
      ...state,
      isModalVisible: false
    }
  }

  if (isType(action, checkListDetailSubmitForm)) {
    return {
      ...state,
      isSubmitting: action.data
    }
  }

  return state
}

export default checklistReducer
