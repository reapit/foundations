import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { developerRequestData, developerReceiveData } from '../../actions/developer'
import { Action } from '../../types/core'
import { DeveloperRequestParams } from '@/reducers/developer'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: DeveloperRequestParams = {
        page: 1,
      }
      const action = { data: actionData, type: 'DEVELOPER_REQUEST_DATA' }
      expect(
        actionCreator<DeveloperRequestParams>(ActionTypes.CLIENT_FETCH_APP_SUMMARY)({
          page: 1,
        }),
      ).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: DeveloperRequestParams = {
        page: 1,
      }
      const action: Action<any> = { data: actionData, type: 'DEVELOPER_REQUEST_DATA' }
      expect(isType(action, developerRequestData)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'DEVELOPER_RECEIVE_DATA' }
      expect(isType(anotherAction, developerReceiveData)).toBe(false)
    })
  })
})
