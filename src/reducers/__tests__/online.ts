import onlineReducer, { defaultState } from '../online'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('online reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = onlineReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should set online to true when ONLINE action is called', () => {
    const newState = onlineReducer(undefined, {
      type: ActionTypes.ONLINE as ActionType,
      data: undefined
    })
    const expected = {
      ...defaultState,
      online: true
    }
    expect(newState).toEqual(expected)
  })

  it('should set online to false when OFFLINE action is called', () => {
    const newState = onlineReducer(undefined, {
      type: ActionTypes.OFFLINE as ActionType,
      data: undefined
    })
    const expected = {
      ...defaultState,
      online: false
    }
    expect(newState).toEqual(expected)
  })
})
