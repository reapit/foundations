import currentMemberReducer, { defaultState } from '../current-member'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import appState from '@/reducers/__stubs__/app-state'

const mockData = appState.currentMember

describe('currentMember reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = currentMemberReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading when fetch', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_FETCH as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading when update', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_UPDATE as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      update: {
        isLoading: true,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false & data when success', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_FETCH_SUCCESS as ActionType,
      data: mockData.data,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      data: mockData.data,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when success update', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_UPDATE_SUCCESS as ActionType,
      data: mockData.data,
    })
    const expected = {
      ...defaultState,
      update: {
        isLoading: false,
      },
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when failed fetch', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_FETCH_FAILED as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to false when failed update', () => {
    const newState = currentMemberReducer(undefined, {
      type: ActionTypes.CURRENT_MEMBER_FETCH_FAILED as ActionType,
      data: null,
    })
    const expected = {
      ...defaultState,
      isLoading: false,
      update: {
        isLoading: false,
      },
    }
    expect(newState).toEqual(expected)
  })
})
