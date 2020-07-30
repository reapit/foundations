import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { authenticatedLoading } from '../../actions/authenticated'
import { Action } from '../../types/core'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const loadingAction = { data: true, type: 'AUTHENTICATED_LOADING' }
      expect(actionCreator<boolean>(ActionTypes.AUTHENTICATED_LOADING)(true)).toEqual(loadingAction)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const loadingAction: Action<any> = { data: true, type: 'AUTHENTICATED_LOADING' }

      expect(isType(loadingAction, authenticatedLoading)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'AUTHENTICATED_RECEIVE_DATA' }

      expect(isType(anotherAction, authenticatedLoading)).toBe(false)
    })
  })
})
