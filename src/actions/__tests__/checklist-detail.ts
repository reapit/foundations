import ActionTypes from '@/constants/action-types'
import { contact } from '@/sagas/__stubs__/contact'
import {
  checklistDetailRequestData,
  checklistDetailReceiveData,
  checkListDetailShowModal,
  checkListDetailHideModal,
  checkListDetailSubmitForm,
  pepSearchResult,
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

  it('should create a checkListDetailShowModal action', () => {
    expect(checkListDetailShowModal.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL)
    expect(checkListDetailShowModal('STRING').data).toEqual('STRING')
  })

  it('should create a checkListDetailHideModal action', () => {
    expect(checkListDetailHideModal.type).toEqual(ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL)
    expect(checkListDetailHideModal().data).toEqual(undefined)
  })

  it('should create a checkListDetailSubmitForm action', () => {
    expect(checkListDetailSubmitForm.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
    expect(checkListDetailSubmitForm(true).data).toEqual(true)
  })

  it('should create a pepSearchResult action', () => {
    expect(pepSearchResult.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP_RESULT)
    expect(pepSearchResult(true).data).toEqual(true)
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
