import ActionTypes from '@/constants/action-types'
import { fetchNegotiators, fetchNegotiatorsSuccess, fetchNegotiatorsFailed } from '../negotiators'

describe('negotiators', () => {
  describe('fetchNegotiators', () => {
    it('should create a fetchNegotiators action', () => {
      expect(fetchNegotiators.type).toEqual(ActionTypes.FETCH_NEGOTIATORS)
    })
  })

  describe('fetchNegotiatorsSuccess', () => {
    it('should create a fetchNegotiatorsSuccess action', () => {
      expect(fetchNegotiatorsSuccess.type).toEqual(ActionTypes.FETCH_NEGOTIATORS_SUCCESS)
    })
  })

  describe('fetchNegotiatorsFailed', () => {
    it('should create a fetchNegotiatorsFailed action', () => {
      expect(fetchNegotiatorsFailed.type).toEqual(ActionTypes.FETCH_NEGOTIATORS_FAILED)
    })
  })
})
