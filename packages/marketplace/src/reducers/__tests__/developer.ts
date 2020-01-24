import developerReducer, { defaultState } from '../developer'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('developer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = developerReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set loading to true when DEVELOPER_LOADING action is called', () => {
    const newState = developerReducer(undefined, { type: ActionTypes.DEVELOPER_LOADING as ActionType, data: true })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set developer item data when DEVELOPER_RECEIVE_DATA action is called', () => {
    const newState = developerReducer(undefined, {
      type: ActionTypes.DEVELOPER_RECEIVE_DATA as ActionType,
      data: appsDataStub,
    })
    const expected = {
      ...defaultState,
      developerData: appsDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should clear developer item data when DEVELOPER_CLEAR_DATA action is called', () => {
    const newState = developerReducer(undefined, { type: ActionTypes.DEVELOPER_CLEAR_DATA as ActionType, data: null })
    const expected = {
      ...defaultState,
      developerData: null,
    }
    expect(newState).toEqual(expected)
  })

  it('should set formState when DEVELOPER_SET_FORM_STATE is called', () => {
    const newState = developerReducer(undefined, {
      type: ActionTypes.DEVELOPER_SET_FORM_STATE as ActionType,
      data: 'SUCCESS',
    })
    const expected = {
      ...defaultState,
      formState: 'SUCCESS',
    }
    expect(newState).toEqual(expected)
  })

  it('should set formState when DEVELOPER_SHOW_MODAL is called', () => {
    const newState = developerReducer(undefined, {
      type: ActionTypes.DEVELOPER_SHOW_MODAL as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      isVisible: true,
    }
    expect(newState).toEqual(expected)
  })
})
