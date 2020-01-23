import settingReducer, { defaultState } from '../settings'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('submitApp reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = settingReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when SETTING_SHOW_HIDE_LOADING action is called with test', () => {
    const newState = settingReducer(undefined, {
      type: ActionTypes.SETTING_SHOW_HIDE_LOADING as ActionType,
      data: true
    })
    const expected = {
      ...defaultState,
      loading: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to test when SETTING_FETCH_DEVELOPER_INFO_SUCCESS action is called with true', () => {
    const newState = settingReducer(undefined, {
      type: ActionTypes.SETTING_FETCH_DEVELOPER_INFO_SUCCESS as ActionType,
      data: developerStub
    })
    const expected = {
      ...defaultState,
      developerInfomation: developerStub
    }
    expect(newState).toEqual(expected)
  })
})
