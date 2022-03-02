import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { Action } from '../../types/core'
import { fetchDeveloperDetails } from '../../actions/developers'
import { FetchDeveloperByIdParams } from '../../services/developers'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: FetchDeveloperByIdParams = {
        id: 'SOME_ID',
      }
      const action = { data: actionData, type: 'FETCH_DEVELOPER_DETAILS' }
      expect(
        actionCreator<FetchDeveloperByIdParams>(ActionTypes.FETCH_DEVELOPER_DETAILS)({
          id: 'SOME_ID',
        }),
      ).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: FetchDeveloperByIdParams = {
        id: 'SOME_ID',
      }
      const action: Action<any> = { data: actionData, type: 'FETCH_DEVELOPER_DETAILS' }
      expect(isType(action, fetchDeveloperDetails)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'FETCH_DEVELOPER_DETAILS_SUCCESS' }
      expect(isType(anotherAction, fetchDeveloperDetails)).toBe(false)
    })
  })
})
