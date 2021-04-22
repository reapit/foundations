import ActionTypes from '../../../constants/action-types'
import { topics, mockWebhookLogs } from '../../../sagas/__stubs__/webhooks'
import { ActionType } from '../../../types/core'
import { defaultWebhooksLogsState, webhookLogsReducer } from '../list'

describe('webhook logs', () => {
  describe('webhookLogsReducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhookLogsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultWebhooksLogsState)
    })

    it('should set state when FETCH_WEBHOOK_LOGS action is called ', () => {
      const newState = webhookLogsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_LOGS as ActionType,
        data: { applicatiionId: '1' },
      })
      const expected = {
        ...defaultWebhooksLogsState,
        isLoading: true,
        errorMessage: '',
      }
      expect(newState).toEqual(expected)
    })

    it('should set state when FETCH_WEBHOOK_LOGS_SUCCESS action is called ', () => {
      const newState = webhookLogsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_LOGS_SUCCESS as ActionType,
        data: {
          topics,
          logs: mockWebhookLogs,
        },
      })
      const expected = {
        isLoading: false,
        errorMessage: '',
        topics,
        logs: mockWebhookLogs,
      }
      expect(newState).toEqual(expected)
    })

    it('should set state when FETCH_WEBHOOK_LOGS_ERROR action is called ', () => {
      const newState = webhookLogsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_LOGS_ERROR as ActionType,
        data: 'mockError',
      })
      const expected = {
        ...defaultWebhooksLogsState,
        isLoading: false,
        errorMessage: 'mockError',
      }
      expect(newState).toEqual(expected)
    })
  })
})
