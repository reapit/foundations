import ActionTypes from '../../constants/action-types'
import notificationMessageReducer, { NotificationMessageState, defaultState } from '../notification-message'
import { ActionType } from '../../types/core'

describe('notification message reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = notificationMessageReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should display notification message', () => {
    const notificationData: Partial<NotificationMessageState> = {
      variant: 'info',
      message: 'Create successfully'
    }
    const newState = notificationMessageReducer(undefined, {
      type: ActionTypes.SHOW_NOTIFICATION_MESSAGE as ActionType,
      data: notificationData
    })
    const expected = {
      ...defaultState,
      visible: true,
      ...notificationData
    }
    expect(newState).toEqual(expected)
  })

  it('should clear a notification message', () => {
    const newState = notificationMessageReducer(
      { ...defaultState },
      {
        type: ActionTypes.HIDE_NOTIFICATION_MESSAGE as ActionType,
        data: null
      }
    )
    const expected = {
      ...defaultState
    }
    expect(newState).toEqual(expected)
  })
})
