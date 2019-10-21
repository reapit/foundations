import ActionTypes from '@/constants/action-types'
// import { contact } from '@/sagas/__stubs__/contact'
import {
  checklistDetailRequestData,
  // checklistDetailReceiveContact,
  checklistDetailShowModal,
  checklistDetailHideModal,
  checklistDetailSubmitForm,
  pepSearchResult,
  checklistDetailPrimaryIdUpdateData,
  checklistDetailSecondaryIdUpdateData
} from '../checklist-detail'

describe('checklist-detail actions', () => {
  it('should create a checklistDetailRequestData action', () => {
    expect(checklistDetailRequestData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
    expect(checklistDetailRequestData('test').data).toEqual('test')
  })

  // it('should create a checklistDetailReceiveContact action', () => {
  //   expect(checklistDetailReceiveContact.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_DATA)
  //   expect(checklistDetailReceiveContact({ contact, idCheck: null }).data).toEqual({ contact, idCheck: null })
  // })

  it('should create a checklistDetailShowModal action', () => {
    expect(checklistDetailShowModal.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL)
    expect(checklistDetailShowModal('STRING').data).toEqual('STRING')
  })

  it('should create a checklistDetailHideModal action', () => {
    expect(checklistDetailHideModal.type).toEqual(ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL)
    expect(checklistDetailHideModal().data).toEqual(undefined)
  })

  it('should create a checklistDetailSubmitForm action', () => {
    expect(checklistDetailSubmitForm.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM)
    expect(checklistDetailSubmitForm(true).data).toEqual(true)
  })

  it('should create a pepSearchResult action', () => {
    expect(pepSearchResult.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP_RESULT)
    expect(pepSearchResult(true).data).toEqual(true)
  })

  it('should create a checklistDetailPrimaryIdUpdateData action', () => {
    expect(checklistDetailPrimaryIdUpdateData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_PRIMARY_ID_UPDATE_DATA)
    expect(checklistDetailPrimaryIdUpdateData({} as any).data).toEqual({})
  })

  it('should create a checklistDetailSecondaryIdUpdateData action', () => {
    expect(checklistDetailSecondaryIdUpdateData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_SECONDARY_ID_UPDATE_DATA)
    expect(checklistDetailSecondaryIdUpdateData({} as any).data).toEqual({})
  })
})
