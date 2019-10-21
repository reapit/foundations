import { STEPS } from '@/components/ui/modal/modal'
import { Action } from '../types/core'
import { isType } from '../utils/actions'
import {
  checklistDetailLoading,
  checklistDetailReceiveContact,
  checklistDetailReceiveIdentityCheck,
  checklistDetailShowModal,
  pepSearchResult,
  checklistDetailHideModal,
  checklistDetailSubmitForm
} from '../actions/checklist-detail'
import { ContactModel } from '@/types/contact-api-schema'
import { IdentityCheckModel } from '../types/contact-api-schema'
import {
  isCompletedProfile,
  isCompletedPrimaryID,
  isCompletedSecondaryID,
  isCompletedDeclarationRisk,
  isCompletedAddress
} from '@reapit/elements'
import { isCompletedPepSearch } from '@/utils/pep-search'

export interface SectionsStatus {
  profile: boolean
  primaryId: boolean
  secondaryId: boolean
  declarationRisk: boolean
  addresses: boolean
  pepSearch: boolean
  experian: boolean
  report: boolean
}

export interface ChecklistDetailState {
  loading: boolean
  isModalVisible: boolean
  modalContentType: string
  checklistDetailData: {
    contact: ContactModel | null
    idCheck: IdentityCheckModel | null
  } | null
  pepSearchParam: string
  // TODO will replace any when integrate API with pepSearchData
  pepSearchResultData: any[] | null
  isSubmitting: boolean
  status: SectionsStatus
}

export const defaultStatus = {
  profile: false,
  primaryId: false,
  secondaryId: false,
  declarationRisk: false,
  addresses: false,
  pepSearch: false,
  experian: true,
  report: false
}

export const defaultState: ChecklistDetailState = {
  loading: true,
  isModalVisible: false,
  checklistDetailData: null,
  modalContentType: STEPS.PROFILE,
  isSubmitting: false,
  pepSearchParam: '',
  pepSearchResultData: null,
  status: defaultStatus
}

const checklistReducer = (state: ChecklistDetailState = defaultState, action: Action<any>): ChecklistDetailState => {
  if (isType(action, checklistDetailLoading)) {
    return {
      ...state,
      loading: action.data
    }
  }

  if (isType(action, checklistDetailReceiveContact)) {
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

  if (isType(action, checklistDetailReceiveIdentityCheck)) {
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

  if (isType(action, checklistDetailShowModal)) {
    return {
      ...state,
      modalContentType: action.data,
      isModalVisible: true
    }
  }

  if (isType(action, checklistDetailHideModal)) {
    return {
      ...state,
      isModalVisible: false
    }
  }

  if (isType(action, checklistDetailSubmitForm)) {
    return {
      ...state,
      isSubmitting: action.data
    }
  }

  if (isType(action, pepSearchResult)) {
    return {
      ...state,
      pepSearchParam: action.data.searchParam,
      pepSearchResultData: action.data.searchResults
    }
  }

  return state
}

export type UpdateCheckListDetailFormStatusParams = {
  contact: ContactModel | null
  idCheck: IdentityCheckModel | null
}

/**
 * help to calculate the isComplete status of the forms following the rule
 * TODO: will be implemented when have enough information
 * @param { idCheck, contact }
 */
export const updateCheckListDetailFormStatus = ({ contact, idCheck }: UpdateCheckListDetailFormStatusParams) => {
  const metadata = contact && contact.metadata
  return {
    profile: metadata ? isCompletedProfile(contact) : false,
    primaryId: isCompletedPrimaryID(idCheck),
    secondaryId: isCompletedSecondaryID(idCheck),
    declarationRisk: metadata ? isCompletedDeclarationRisk(contact) : false,
    addresses: metadata ? isCompletedAddress(contact) : false,
    pepSearch: isCompletedPepSearch(contact as ContactModel),
    experian: true,
    report: false
  }
}

export default checklistReducer
