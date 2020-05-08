import DeveloperWebhookReducer, { defaultState } from '../webhook-edit-modal'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { webhookDataStub, webhookItemDataStub } from '@/sagas/__stubs__/webhook-edit'

describe('developer webhook reducer', () => {
  it('should return default state', () => {
    const newState = DeveloperWebhookReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return new state when reveice data', () => {
    const newState = DeveloperWebhookReducer(undefined, {
      type: ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_RECEIVE_DATA as ActionType,
      data: webhookDataStub,
    })
    const expected = {
      ...defaultState,
      ...webhookDataStub,
    }
    expect(newState).toEqual(expected)
  })

  it('should set loading to test when WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE action is called with true', () => {
    const newState = DeveloperWebhookReducer(undefined, {
      type: ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA_FAILURE as ActionType,
      data: true,
    })
    const expected = {
      ...defaultState,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
  it('should return new state when reveice webhook item data', () => {
    const newState = DeveloperWebhookReducer(undefined, {
      type: ActionTypes.WEBHOOK_RECEIVE_DATA as ActionType,
      data: webhookItemDataStub,
    })
    const expected = {
      ...defaultState,
      webhookData: webhookItemDataStub,
      loading: false,
    }
    expect(newState).toEqual(expected)
  })
})
