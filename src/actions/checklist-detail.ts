import { ContactModel } from '@/types/contact-api-schema'
import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'

export type CheckListDetailReceiveDataParams = {
  contact: ContactModel
}
export const checklistDetailRequestData = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
export const checklistDetailLoading = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_LOADING)
export const checklistDetailReceiveData = actionCreator<CheckListDetailReceiveDataParams>(
  ActionTypes.CHECKLIST_DETAIL_RECEIVE_DATA
)
export const checkListDetailShowModal = actionCreator<string>(ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL)
export const checkListDetailHideModal = actionCreator<void>(ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL)
export const checkListDetailSubmitForm = actionCreator<boolean>(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
