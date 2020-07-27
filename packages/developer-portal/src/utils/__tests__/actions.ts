import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { Action } from '../../types/core'
import { FetchAppListParams } from '@/reducers/apps/app-list'
import { fetchAppList } from '@/actions/app-list'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const actionData: FetchAppListParams = {
        page: 1,
      }
      const action = { data: actionData, type: 'FETCH_APP_LIST' }
      expect(
        actionCreator<FetchAppListParams>(ActionTypes.FETCH_APP_LIST)({
          page: 1,
        }),
      ).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const actionData: FetchAppListParams = {
        page: 1,
      }
      const action: Action<any> = { data: actionData, type: 'FETCH_APP_LIST' }
      expect(isType(action, fetchAppList)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'FETCH_APP_LIST_SUCCESS' }
      expect(isType(anotherAction, fetchAppList)).toBe(false)
    })
  })
})
