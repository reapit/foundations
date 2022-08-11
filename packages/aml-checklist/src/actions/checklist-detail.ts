import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { DynamicLinkParams } from '@reapit/elements-legacy'
import { IdentityDocumentForm } from '../components/ui/forms/identification'

export const checklistDetailRequestData = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)

export type UpdateContactParams = {
  contact: ContactModel
  nextSection?: string
}

export const updateContact = actionCreator<UpdateContactParams>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA)
export const updateAddressHistory = actionCreator<UpdateContactParams>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA)
export const updateDeclarationAndRisk = actionCreator<UpdateContactParams>(
  ActionTypes.CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA,
)

export const checkListDetailUpdateDataLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_MODAL_LOADING)
export const checklistDetailLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_LOADING)
export const checklistDetailReceiveContact = actionCreator<ContactModel>(ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT)
export const checklistDetailReceiveIdentityCheck = actionCreator<IdentityCheckModel | null>(
  ActionTypes.CHECKLIST_DETAIL_RECEIVE_IDENTITY_CHECKS,
)
export const checklistDetailShowModal = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL)
export const checklistDetailHideModal = actionCreator<void>(ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL)
export const checklistDetailSubmitForm = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
export const checklistDetailSearchPep = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP)
export const pepSearchResult = actionCreator<any>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP_RESULT)

export type UpdateIdentityCheckParams = {
  nextSection?: string
  identityChecks: IdentityDocumentForm
}

export const checklistDetailPrimaryIdUpdateData = actionCreator<UpdateIdentityCheckParams>(
  ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA,
)
export const checklistDetailSecondaryIdUpdateData = actionCreator<UpdateIdentityCheckParams>(
  ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA,
)

export const checkListDetailIdentityCheckUpdateData = actionCreator<{
  idCheck: IdentityCheckModel
  dynamicLinkParams: DynamicLinkParams
}>(ActionTypes.CHECKLIST_DETAIL_IDENTITY_CHECK_UPDATE_DATA)
