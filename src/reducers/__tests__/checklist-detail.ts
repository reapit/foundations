import checklistReducer, {
  defaultState,
  updateCheckListDetailFormStatus,
  ChecklistDetailState
} from '../checklist-detail'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { contact, idCheck } from '@/sagas/__stubs__/contact'

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

  it('should set approvals list data when CHECKLIST_DETAIL_RECEIVE_CONTACT action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT as ActionType,
      data: contact
    })

    const expected = {
      ...defaultState,
      loading: false,
      checklistDetailData: {
        contact: contact,
        idCheck: null
      },
      status: updateCheckListDetailFormStatus({ contact, idCheck: null })
    }
    expect(newState).toEqual(expected)
  })

  it('should set approvals list data when CHECKLIST_DETAIL_RECEIVE_IDENTITY_CHECKS action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_RECEIVE_IDENTITY_CHECKS as ActionType,
      data: idCheck
    })

    const expected = {
      ...defaultState,
      loading: false,
      checklistDetailData: {
        contact: null,
        idCheck: idCheck
      },
      status: updateCheckListDetailFormStatus({ contact: null, idCheck })
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

  it('should clear approvals list data when CHECKLIST_DETAIL_SUBMIT_FORM action is called', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_SEARCH_PEP_RESULT as ActionType,
      data: { searchParam: '', searchResults: [] }
    })
    const expected = {
      ...defaultState,
      pepSearchParam: '',
      pepSearchResultData: []
    }
    expect(newState).toEqual(expected)
  })

  it('should mark personal details not completed because missing date of birth', () => {
    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT as ActionType,
      data: contact
    })

    const expected: ChecklistDetailState = {
      ...defaultState,
      loading: false,
      checklistDetailData: {
        contact: contact,
        idCheck: null
      },
      status: {
        ...updateCheckListDetailFormStatus({ contact, idCheck: null }),
        profile: false
      }
    }

    expect(newState).toEqual(expected)
  })

  it('should mark personal details completed', () => {
    const contactWithDOB = { ...contact, dateOfBirth: new Date().toISOString() }

    const newState = checklistReducer(undefined, {
      type: ActionTypes.CHECKLIST_DETAIL_RECEIVE_CONTACT as ActionType,
      data: contactWithDOB
    })

    const expected: ChecklistDetailState = {
      ...defaultState,
      loading: false,
      checklistDetailData: {
        contact: contactWithDOB,
        idCheck: null
      },
      status: {
        ...updateCheckListDetailFormStatus({ contact, idCheck: null }),
        profile: true
      }
    }

    expect(newState).toEqual(expected)
  })
})
