import ActionTypes from '@/constants/action-types'
import { contact } from '@/sagas/__stubs__/contact'
import {
  checklistDetailRequestData,
  checklistDetailReceiveData,
  checkListDetailSubmitForm,
  checkListDetailPrimaryIdUpdateData,
  checkListDetailSecondaryIdUpdateData
} from '../checklist-detail'

describe('checklist-detail actions', () => {
  it('should create a checklistDetailRequestData action', () => {
    expect(checklistDetailRequestData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
    expect(checklistDetailRequestData('test').data).toEqual('test')
  })
  it('should create a checklistDetailReceiveData action', () => {
    expect(checklistDetailReceiveData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_DATA)
    expect(checklistDetailReceiveData({ contact, idCheck: null }).data).toEqual({ contact, idCheck: null })
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
