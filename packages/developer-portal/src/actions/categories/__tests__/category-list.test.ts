import { fetchCategoryList, fetchCategoryListFailed, fetchCategoryListSuccess } from '../category-list'
import ActionTypes from '@/constants/action-types'

describe('scope list actions', () => {
  it('should create a fetchCategoryList action', () => {
    expect(fetchCategoryList.type).toEqual(ActionTypes.FETCH_CATEGORY_LIST)
  })

  it('should create a fetchCategoryListSuccess action', () => {
    expect(fetchCategoryListSuccess.type).toEqual(ActionTypes.FETCH_CATEGORY_LIST_SUCCESS)
  })

  it('should create a fetchCategoryListFailed action', () => {
    expect(fetchCategoryListFailed.type).toEqual(ActionTypes.FETCH_CATEGORY_LIST_FAILED)
  })
})
