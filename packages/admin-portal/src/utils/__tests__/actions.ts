import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { fetchApprovalList, fetchApprovalListSuccess } from '@/actions/approvals'
import { Action } from '../../types/core'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const action = { data: 1, type: 'FETCH_APPROVAL_LIST' }
      expect(actionCreator<number>(ActionTypes.FETCH_APPROVAL_LIST)(1)).toEqual(action)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const action: Action<any> = { data: 1, type: 'FETCH_APPROVAL_LIST' }
      expect(isType(action, fetchApprovalList)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: 1, type: 'FETCH_APPROVAL_LIST' }
      expect(isType(anotherAction, fetchApprovalListSuccess)).toBe(false)
    })
  })
})
