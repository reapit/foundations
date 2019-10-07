import checklistReducer, { defaultState, updateCheckListDetailFormStatus } from '../checklist-detail'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { contact } from '@/sagas/__stubs__/contact'

describe('home reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = checklistReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when CHECKLIST_DETAIL_LOADING action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_LOADING as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when CHECKLIST_DETAIL_RECEIVE_DATA action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_RECEIVE_DATA as ActionType,
      data: { contact: contact }
    })
    const expected = {
      ...defaultState,
      loading: false,
      checklistDetailData: {
        contact: contact
      },
      status: updateCheckListDetailFormStatus()
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when CHECKLIST_DETAIL_SHOW_MODAL action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_SHOW_MODAL as ActionType,
      data: 'PROFILE'
    })
    const expected = {
      ...defaultState,
      modalContentType: 'PROFILE',
      isModalVisible: true
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when CHECKLIST_DETAIL_HIDE_MODAL action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_HIDE_MODAL as ActionType,
      data: undefined
    })
    const expected = {
      ...defaultState,
      isModalVisible: false
    }
    expect(newState).toEqual(expected)
  })

  it('should clear approvals list data when CHECKLIST_DETAIL_SUBMIT_FORM action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_SUBMIT_FORM as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      isSubmitting: true
    }
    expect(newState).toEqual(expected)
  })
})
