import { actionCreator, isType } from '../actions'
import ActionTypes from '../../constants/action-types'
import { homeLoading } from '../../actions/home'
import { Action } from '../../types/core'

describe('actions utils', () => {
  describe('actionCreator', () => {
    it('should create an action of the correct type', () => {
      const loadingAction = { data: true, type: 'HOME_LOADING' }
      expect(actionCreator<boolean>(ActionTypes.HOME_LOADING)(true)).toEqual(loadingAction)
    })
  })

  describe('isType', () => {
    it('should return true if actions are equal', () => {
      const loadingAction: Action<any> = { data: true, type: 'HOME_LOADING' }

      expect(isType(loadingAction, homeLoading)).toBe(true)
    })

    it('should return false if actions are not equal', () => {
      const anotherAction: Action<any> = { data: true, type: 'HOME_RECEIVE_DATA' }

      expect(isType(anotherAction, homeLoading)).toBe(false)
    })
  })
})
