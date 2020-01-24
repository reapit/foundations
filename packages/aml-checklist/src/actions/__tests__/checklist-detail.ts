import ActionTypes from '@/constants/action-types'
import { contact, idCheck } from '@/sagas/__stubs__/contact'
import {
  checklistDetailRequestData,
  checklistDetailShowModal,
  checklistDetailHideModal,
  checklistDetailSubmitForm,
  pepSearchResult,
  checklistDetailPrimaryIdUpdateData,
  checklistDetailSecondaryIdUpdateData,
  checklistDetailReceiveContact,
  checklistDetailReceiveIdentityCheck,
  checkListDetailIdentityCheckUpdateData,
} from '../checklist-detail'
import { EntityType } from '@reapit/elements'

describe('checklist-detail actions', () => {
  it('should create a checklistDetailRequestData action', () => {
    expect(checklistDetailRequestData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA)
    expect(checklistDetailRequestData('test').data).toEqual('test')
  })

  it('should create a checklistDetailReceiveContact action', () => {
    expect(checklistDetailReceiveContact.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT)
    expect(checklistDetailReceiveContact(contact).data).toEqual(contact)
  })

  it('should create a checklistDetailReceiveIdentityCheck action', () => {
    expect(checklistDetailReceiveIdentityCheck.type).toEqual(ActionTypes.CHECKLIST_DETAIL_RECEIVE_IDENTITY_CHECKS)
    expect(checklistDetailReceiveIdentityCheck(idCheck).data).toEqual(idCheck)
  })

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

  it('should create a checkListDetailIdentityCheckUpdateData action', () => {
    const dynamicLinkParams = { appMode: 'DESKTOP', entityType: EntityType.CONTACT }
    expect(checkListDetailIdentityCheckUpdateData.type).toEqual(ActionTypes.CHECKLIST_DETAIL_IDENTITY_CHECK_UPDATE_DATA)
    expect(
      checkListDetailIdentityCheckUpdateData({
        idCheck,
        dynamicLinkParams: { appMode: 'DESKTOP', entityType: EntityType.CONTACT },
      }).data,
    ).toEqual({ idCheck, dynamicLinkParams })
  })
})
