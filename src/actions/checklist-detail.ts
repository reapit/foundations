import { IdentificationFormValues } from '@/components/ui/forms/identification'
import { ContactModel, ContactIdentityCheckModel } from '@/types/contact-api-schema'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export type CheckListDetailReceiveDataParams = {
  contact: ContactModel
  idCheck: ContactIdentityCheckModel | null
}

export const checklistDetailRequestData = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
export const checkListDetailUpdateData = actionCreator<ContactModel>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA)
export const checkListDetailAddressUpdateData = actionCreator<ContactModel>(
  ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA
)
export const checkListDetailUpdateDataLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_MODAL_LOADING)

export const checklistDetailLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_LOADING)
export const contactReceiveData = actionCreator<ContactModel>(ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT_DATA)
export const identityCheckReceiveData = actionCreator<ContactIdentityCheckModel | null>(
  ActionTypes.CHECKLIST_DETAIL_RECEIVE_ID_CHECK_DATA
)
export const checkListDetailSubmitForm = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)

export const checkListDetailPrimaryIdUpdateData = actionCreator<IdentificationFormValues>(
  ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA
)
export const checkListDetailSecondaryIdUpdateData = actionCreator<IdentificationFormValues>(
  ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA
)

export const checkListDetailAgentCheckUpdateData = actionCreator<any>(
  ActionTypes.CHECKLIST_DETAIL_AGENT_CHECK_UPDATE_DATA
)
