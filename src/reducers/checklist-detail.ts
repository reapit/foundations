import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm
} from '../actions/checklist-detail'
import { ContactModel } from '@/types/contact-api-schema'

export interface ChecklistDetailState {
  loading: boolean
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
  loading: true,
  checklistDetailData: null,
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
      checklistDetailData: action.data || null,
      status: updateCheckListDetailFormStatus()
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
