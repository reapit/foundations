import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm
} from '../actions/checklist-detail'
import { ContactModel, IdentityCheckModel } from '@/types/contact-api-schema'
import { isCompletedProfile, isCompletedPrimaryID, isCompletedSecondaryID, isCompletedAddress } from '@reapit/elements'

export interface ChecklistStatus {
  profile: boolean
  primaryId: boolean
  secondaryId: boolean
  addresses: boolean
  agentChecks: boolean
}

export const defaultStatus = {
  profile: false,
  primaryId: false,
  secondaryId: false,
  addresses: false,
  agentChecks: false
}

export interface ChecklistDetailState {
  loading: boolean
  checklistDetailData: {
    contact: ContactModel
    idCheck: IdentityCheckModel | null
  } | null
  isSubmitting: boolean
  status: ChecklistStatus
}

export const defaultState: ChecklistDetailState = {
  loading: true,
  checklistDetailData: null,
  isSubmitting: false,
  status: defaultStatus
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
      status: updateCheckListDetailFormStatus(action.data)
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

export type UpdateCheckListDetailFormStatusParams = {
  contact: ContactModel
  idCheck: IdentityCheckModel | null
}

/**
 * help to calculate the isComplete status of the forms following the rule
 * TODO: will be implemented when have enough information
 * @param contactModel
 */
export const updateCheckListDetailFormStatus = ({ contact, idCheck }: UpdateCheckListDetailFormStatusParams) => {
  const { metadata } = contact

  return {
    profile: metadata ? isCompletedProfile(contact) : false,
    primaryId: isCompletedPrimaryID(idCheck),
    secondaryId: isCompletedSecondaryID(idCheck),
    addresses: metadata ? isCompletedAddress(contact) : false,
    agentChecks: false
  }
}

export default checklistReducer
