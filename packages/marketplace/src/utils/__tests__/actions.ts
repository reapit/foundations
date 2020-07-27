import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { clientFetchAppSummary, clientFetchAppSummarySuccess } from '@/actions/apps'
import { Action } from '../../types/core'
import { ClientAppSummaryParams } from '@/reducers/client/app-summary'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: ClientAppSummaryParams = {
        page: 1,
      }
      const action = { data: actionData, type: 'CLIENT_FETCH_APP_SUMMARY' }
      expect(
        actionCreator<ClientAppSummaryParams>(ActionTypes.CLIENT_FETCH_APP_SUMMARY)({
          page: 1,
        }),
      ).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: ClientAppSummaryParams = {
        page: 1,
      }
      const action: Action<any> = { data: actionData, type: 'CLIENT_FETCH_APP_SUMMARY' }
      expect(isType(action, clientFetchAppSummary)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'CLIENT_FETCH_APP_SUMMARY' }
      expect(isType(anotherAction, clientFetchAppSummarySuccess)).toBe(false)
    })
  })
})
