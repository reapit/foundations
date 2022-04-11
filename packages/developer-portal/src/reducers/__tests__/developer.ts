import developerReducer, { defaultState } from '../developer'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'

describe('developer reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = developerReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
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

  it('should set developerSetWebhookPingStatus when call DEVELOPER_SET_PING_WEBHOOK_STATUS is called', () => {
    const newState = developerReducer(undefined, {
      type: ActionTypes.DEVELOPER_SET_PING_WEBHOOK_STATUS as ActionType,
      data: 'SUCCESS',
    })
    const expected = {
      ...defaultState,
      webhookPingTestStatus: 'SUCCESS',
    }
    expect(newState).toEqual(expected)
  })
})
