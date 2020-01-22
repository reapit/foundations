import ActionTypes from '@/constants/action-types'
import { contact, idCheck } from '@/sagas/__stubs__/contact'
import {
  checklistDetailRequestData,
  contactReceiveData,
  identityCheckReceiveData,
  checkListDetailSubmitForm,
  checkListDetailPrimaryIdUpdateData,
  checkListDetailSecondaryIdUpdateData,
} from '../checklist-detail'

describe('checklist-detail actions', () => {
  it('should create a checklistDetailRequestData action', () => {
    expect(checklistDetailRequestData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
    expect(checklistDetailRequestData('test').data).toEqual('test')
  })
  it('should create a contactReceiveData action', () => {
    expect(contactReceiveData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT_DATA)
    expect(contactReceiveData(contact).data).toEqual(contact)
  })
  it('should create a identityCheckReceiveData action', () => {
    expect(identityCheckReceiveData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_ID_CHECK_DATA)
    expect(identityCheckReceiveData(idCheck).data).toEqual(idCheck)
  })
  it('should create a checkListDetailSubmitForm action', () => {
    expect(checkListDetailSubmitForm.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
    expect(checkListDetailSubmitForm(true).data).toEqual(true)
  })
  it('should create a checkListDetailPrimaryIdUpdateData action', () => {
    expect(checkListDetailPrimaryIdUpdateData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA)
    expect(checkListDetailPrimaryIdUpdateData({} as any).data).toEqual({})
  })
  it('should create a checkListDetailSecondaryIdUpdateData action', () => {
    expect(checkListDetailSecondaryIdUpdateData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA)
    expect(checkListDetailSecondaryIdUpdateData({} as any).data).toEqual({})
  })
})
