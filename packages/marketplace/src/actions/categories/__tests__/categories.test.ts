import ActionTypes from '@/constants/action-types'
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } from '../categories'

describe('categories', () => {
  describe('fetchCategories', () => {
    it('should create a fetchCategoriesSuccess action', () => {
      expect(fetchCategories.type).toEqual(ActionTypes.FETCH_CATEGORIES)
    })
  })

  describe('fetchCategoriesSuccess', () => {
    it('should create a fetchCategoriesSuccess action', () => {
      expect(fetchCategoriesSuccess.type).toEqual(ActionTypes.FETCH_CATEGORIES_SUCCESS)
    })
  })

  describe('fetchCategoriesFailure', () => {
    it('should create a fetchCategoriesFailure action', () => {
      expect(fetchCategoriesFailure.type).toEqual(ActionTypes.FETCH_CATEGORIES_FAILURE)
    })
  })
})
