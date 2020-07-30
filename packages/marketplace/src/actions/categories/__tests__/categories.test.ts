import ActionTypes from '@/constants/action-types'
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailed } from '../categories'

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

  describe('fetchCategoriesFailed', () => {
    it('should create a fetchCategoriesFailed action', () => {
      expect(fetchCategoriesFailed.type).toEqual(ActionTypes.FETCH_CATEGORIES_FAILED)
    })
  })
})
