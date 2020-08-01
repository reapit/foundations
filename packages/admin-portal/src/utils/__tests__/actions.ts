import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { fetchApprovalsData, fetchApprovalsDataSuccess } from '@/actions/approvals'
import { Action } from '../../types/core'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const action = { data: 1, type: 'FETCH_APPROVALS_DATA' }
      expect(actionCreator<number>(ActionTypes.FETCH_APPROVALS_DATA)(1)).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      //   const actionData: ClientAppSummaryParams = {
      //     page: 1,
      //   }
      const action: Action<any> = { data: 1, type: 'FETCH_APPROVALS_DATA' }
      expect(isType(action, fetchApprovalsData)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: 1, type: 'FETCH_APPROVALS_DATA' }
      expect(isType(anotherAction, fetchApprovalsDataSuccess)).toBe(false)
    })
  })
})
