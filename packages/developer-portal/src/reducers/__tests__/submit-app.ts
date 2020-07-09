import submitReducer, { defaultState } from '../submit-app'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('submitApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = submitReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when DEVELOPER_SUBMIT_APP_SET_FORM_STATE action is called with test', () => {
    const newState = submitReducer(undefined, {
      type: ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE as ActionType,
      data: 'test',
    })
    const expected = {
      ...defaultState,
      formState: 'test',
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to test when DEVELOPER_SUBMIT_APP_LOADING action is called with true', () => {
    const newState = submitReducer(undefined, {
      type: ActionTypes.DEVELOPER_SUBMIT_APP_LOADING as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })

  it('should set submitAppData to test when DEVELOPER_SUBMIT_APP_RECEIVE_DATA action is called with scopes', () => {
    const newState = submitReducer(undefined, {
      type: ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA as ActionType,
      data: [{ name: 'mockName', description: 'mockDescription' }],
    })
    const expected = {
      ...defaultState,
      submitAppData: {
        scopes: [{ name: 'mockName', description: 'mockDescription' }],
      },
    }
    expect(newState).toEqual(expected)
  })
})
