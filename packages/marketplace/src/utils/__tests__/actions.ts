import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { clientAppSummaryRequestData, clientAppSummaryReceiveData } from '../../actions/client'
import { Action } from '../../types/core'
import { ClientAppSummaryParams } from '@/reducers/client/app-summary'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: ClientAppSummaryParams = {
        page: 1,
      }
      const action = { data: actionData, type: 'CLIENT_APP_SUMMARY_REQUEST_DATA' }
      expect(actionCreator<boolean>(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_DATA)(true)).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: ClientAppSummaryParams = {
        page: 1,
      }
      const action: Action<any> = { data: actionData, type: 'CLIENT_APP_SUMMARY_REQUEST_DATA' }

      expect(isType(action, clientAppSummaryRequestData)).toBe(actionData)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'CLIENT_APP_SUMMARY_RECEIVE_DATA' }
      expect(isType(anotherAction, clientAppSummaryReceiveData)).toBe(false)
    })
  })
})
