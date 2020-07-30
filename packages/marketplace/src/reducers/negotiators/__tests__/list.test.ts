import { negotiatorsReducer, defaultNegotiatorsState } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { negotiatorsStub } from '@/sagas/__stubs__/negotiators'

describe('negotiators', () => {
  describe('negotiatorsListReducer', () => {
    it('should return default state if action not matched', () => {
      const newState = negotiatorsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultNegotiatorsState)
    })

    it('should set state to test when FETCH_NEGOTIATORS action is called with test', () => {
      const newState = negotiatorsReducer(undefined, {
        type: ActionTypes.FETCH_NEGOTIATORS as ActionType,
        data: undefined,
      })
      const expected = {
        ...defaultNegotiatorsState,
        isLoading: true,
        errorMessage: '',
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_NEGOTIATORS_SUCCESS action is called with test', () => {
      const newState = negotiatorsReducer(undefined, {
        type: ActionTypes.FETCH_NEGOTIATORS_SUCCESS as ActionType,
        data: negotiatorsStub,
      })
      const expected = {
        ...defaultNegotiatorsState,
        ...negotiatorsStub,
        isLoading: false,
        errorMessage: '',
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_NEGOTIATORS_FAILED action is called with test', () => {
      const newState = negotiatorsReducer(undefined, {
        type: ActionTypes.FETCH_NEGOTIATORS_FAILED as ActionType,
        data: 'mockError',
      })
      const expected = {
        ...defaultNegotiatorsState,
        isLoading: false,
        errorMessage: 'mockError',
      }
      expect(newState).toEqual(expected)
    })
  })
})
