import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchCategories, fetchCategoriesFailure, fetchCategoriesSuccess } from '@/actions/categories'
import { APPS_PER_PAGE } from '@/constants/paginator'

export type CategoriesState = PagedResultCategoryModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultCategoriesState: CategoriesState = {
  data: [],
  pageNumber: 1,
  pageSize: APPS_PER_PAGE,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const categoriesReducer = (
  state: CategoriesState = defaultCategoriesState,
  action: Action<any>,
): CategoriesState => {
  if (isType(action, fetchCategories)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchCategoriesSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchCategoriesFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
