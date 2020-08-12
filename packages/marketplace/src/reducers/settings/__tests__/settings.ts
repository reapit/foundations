import settingReducer, { defaultState } from '../settings'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('settings reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = settingReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set formState to test when SETTING_LOADING_VISIBILITY action is called with test', () => {
    const newState = settingReducer(undefined, {
      type: ActionTypes.SETTING_LOADING_VISIBILITY as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: true,
    }
    expect(newState).toEqual(expected)
  })
})
