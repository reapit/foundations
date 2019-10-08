import { ContactModel } from '@/types/contact-api-schema'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export type CheckListDetailReceiveDataParams = {
  contact: ContactModel
}

export const checklistDetailRequestData = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
export const checkListDetailUpdateData = actionCreator<ContactModel>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA)
export const checkListDetailAddressUpdateData = actionCreator<ContactModel>(
  ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA
)
export const checkListDetailDeclarationAndRiskUpdateData = actionCreator<ContactModel>(
  ActionTypes.CHECKLIST_DETAIL_DECLARATION_AND_RISK_UPDATE_DATA
)
export const checkListDetailUpdateDataLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_MODAL_LOADING)

export const checklistDetailLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_LOADING)
export const checklistDetailReceiveData = actionCreator<CheckListDetailReceiveDataParams>(
  ActionTypes.CHECKLIST_DETAIL_RECEIVE_DATA
)
export const checkListDetailShowModal = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL)
export const checkListDetailHideModal = actionCreator<void>(ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL)
export const checkListDetailSubmitForm = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
export const checkListDetailSearchPep = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP)
// TODO: will replace any
export const pepSearchResult = actionCreator<any>(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP_RESULT)
