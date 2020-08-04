import ActionTypes from '@/constants/action-types'
import { topics } from '@/sagas/__stubs__/webhooks'
import { ActionType } from '@/types/core'
import { defaultWebhooksTopicsState, webhooksTopicsReducer } from '../list'

describe('webhooks-topics', () => {
  describe('webhooksTopicsReducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhooksTopicsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultWebhooksTopicsState)
    })

    it('should set state to test when FETCH_WEBHOOK_TOPICS action is called with test', () => {
      const newState = webhooksTopicsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_TOPICS as ActionType,
        data: { applicatiionId: '1' },
      })
      const expected = {
        ...defaultWebhooksTopicsState,
        isLoading: true,
        errorMessage: '',
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_WEBHOOK_TOPICS_SUCCESS action is called with test', () => {
      const newState = webhooksTopicsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_TOPICS_SUCCESS as ActionType,
        data: topics,
      })
      const expected = {
        isLoading: false,
        errorMessage: '',
        ...topics,
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_WEBHOOK_TOPICS_FAILED action is called with test', () => {
      const newState = webhooksTopicsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_TOPICS_FAILED as ActionType,
        data: 'mockError',
      })
      const expected = {
        ...defaultWebhooksTopicsState,
        isLoading: false,
        errorMessage: 'mockError',
      }
      expect(newState).toEqual(expected)
    })
  })
})
