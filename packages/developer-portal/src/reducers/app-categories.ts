import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { categoriesReceiveData } from '../actions/app-categories'
import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'
import { APPS_PER_PAGE } from '@/constants/paginator'

export type AppCategoriesState = PagedResultCategoryModel_

export const defaultState: AppCategoriesState = {
  data: [],
  pageNumber: 1,
  pageSize: APPS_PER_PAGE,
  pageCount: 1,
  totalCount: 0,
}

const appCategoriesReducer = (state: AppCategoriesState = defaultState, action: Action<any>): AppCategoriesState => {
  if (isType(action, categoriesReceiveData)) {
    return {
      ...state,
      ...action.data,
    }
  }

  return state
}

export default appCategoriesReducer
