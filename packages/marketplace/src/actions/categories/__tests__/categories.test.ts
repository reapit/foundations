import ActionTypes from '@/constants/action-types'
import { categoriesReceiveData } from '../categories'

describe('categories', () => {
  describe('categoriesReceiveData', () => {
    it('should create a categoriesReceiveData action', () => {
      expect(categoriesReceiveData.type).toEqual(ActionTypes.CATEGORIES_RECEIVE_DATA)
    })
  })
})
