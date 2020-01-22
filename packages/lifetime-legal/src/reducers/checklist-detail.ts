import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  checklistDetailLoading,
  contactReceiveData,
  identityCheckReceiveData,
  checkListDetailSubmitForm
} from '../actions/checklist-detail'
import { ContactModel, ContactIdentityCheckModel } from '@reapit/foundations-ts-definitions'
import {
  isCompletedProfile,
  isCompletedPrimaryID,
  isCompletedSecondaryID,
  isCompletedAddress,
  isCompletedAgentCheck
} from '@reapit/elements'

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
    contact: ContactModel | null
    idCheck: ContactIdentityCheckModel | null
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

  if (isType(action, contactReceiveData)) {
    return {
      ...state,
      loading: false,
      checklistDetailData: {
        idCheck: state.checklistDetailData && state.checklistDetailData.idCheck,
        contact: action.data
      },
      status: updateCheckListDetailFormStatus({
        contact: action.data,
        idCheck: state.checklistDetailData && state.checklistDetailData.idCheck
      })
    }
  }

  if (isType(action, identityCheckReceiveData)) {
    return {
      ...state,
      loading: false,
      checklistDetailData: {
        contact: state.checklistDetailData && state.checklistDetailData.contact,
        idCheck: action.data
      },
      status: updateCheckListDetailFormStatus({
        contact: state.checklistDetailData && state.checklistDetailData.contact,
        idCheck: action.data
      })
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
  contact: ContactModel | null
  idCheck: ContactIdentityCheckModel | null
}

/**
 * help to calculate the isComplete status of the forms following the rule
 * TODO: will be implemented when have enough information
 * @param contactModel
 */
export const updateCheckListDetailFormStatus = ({ contact, idCheck }: UpdateCheckListDetailFormStatusParams) => {
  const metadata = contact?.metadata

  return {
    profile: metadata ? isCompletedProfile(contact) : false,
    primaryId: isCompletedPrimaryID(idCheck),
    secondaryId: isCompletedSecondaryID(idCheck),
    addresses: metadata ? isCompletedAddress(contact) : false,
    agentChecks: isCompletedAgentCheck(idCheck)
  }
}

export default checklistReducer
