import { STEPS } from '@/components/ui/modal/modal'
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
  status: {
    profile: boolean
    primary_identification: boolean
    secondary_identification: boolean
    declaration_risk_management: boolean
    report: boolean
    address_information: boolean
  }
}

export const defaultState: ChecklistDetailState = {
  loading: false,
  isModalVisible: false,
  checklistDetailData: null,
  modalContentType: STEPS.PROFILE,
  isSubmitting: false,
  status: {
    profile: false,
    primary_identification: false,
    secondary_identification: false,
    declaration_risk_management: false,
    report: false,
    address_information: false
  }
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
      checklistDetailData: action.data,
      status: updateCheckListDetailFormStatus()
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

/**
 * help to calculate the isComplete status of the forms following the rule
 * TODO: will be implemented when have enough information
 * @param contactModel
 */
export const updateCheckListDetailFormStatus = () => ({
  profile: true,
  primary_identification: true,
  secondary_identification: true,
  declaration_risk_management: false,
  report: false,
  address_information: false
})

export default checklistReducer
