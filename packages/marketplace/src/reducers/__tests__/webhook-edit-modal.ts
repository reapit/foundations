import DeveloperWebhookReducer, { defaultState } from '../webhook-edit-modal'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { webhookDataStub } from '@/sagas/__stubs__/developer-webhook'

describe('developer webhook reducer', () => {
  it('should return default state', () => {
    const newState = DeveloperWebhookReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return new state when reveice data', () => {
    const newState = DeveloperWebhookReducer(undefined, {
      type: ActionTypes.DEVELOPER_WEBHOOK_RECEIVE_DATA as ActionType,
      data: webhookDataStub,
    })
    const expected = {
      ...defaultState,
      ...webhookDataStub,
    }
    expect(newState).toEqual(expected)
  })
})
