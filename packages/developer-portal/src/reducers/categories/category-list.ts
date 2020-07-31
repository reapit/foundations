import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchCategoryList, fetchCategoryListSuccess, fetchCategoryListFailed } from '@/actions/categories'
import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'

export interface FetchCategoryListParams {
  page: number
  categoriesPerPage?: number
}

export type CategoryListState = PagedResultCategoryModel_ & {
  isLoading: boolean
  errorMessage?: string | null
}

export const defaultState: CategoryListState = {
  data: [],
  pageNumber: 0,
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
    return {
      ...state,
      ...action.data,
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
