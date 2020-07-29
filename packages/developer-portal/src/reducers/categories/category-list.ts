import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchCategoryList, fetchCategoryListSuccess, fetchCategoryListFailed } from '@/actions/categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

export interface FetchCategoryListParams {
  page: number
  categoriesPerPage?: number
}

export interface CategoryListState {
  data?: CategoryModel[]
  page?: number
  pageSize?: number
  totalCount?: number
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: CategoryListState = {
  data: [],
  page: 0,
  pageSize: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: null,
}

const categoryListReducer = (state: CategoryListState = defaultState, action: Action<any>): CategoryListState => {
  if (isType(action, fetchCategoryList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchCategoryListSuccess)) {
    const { data, pageNumber, pageSize, totalCount } = action.data
    return {
      ...state,
      data,
      totalCount,
      pageSize,
      page: pageNumber,
      isLoading: false,
    }
  }

  if (isType(action, fetchCategoryListFailed)) {
    return {
      ...state,
      errorMessage: action.data,
      isLoading: false,
    }
  }
  return state
}

export default categoryListReducer
