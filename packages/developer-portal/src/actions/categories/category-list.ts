import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'

export const fetchCategoryList = actionCreator<void>(ActionTypes.FETCH_CATEGORY_LIST)
export const fetchCategoryListSuccess = actionCreator<PagedResultCategoryModel_>(
  ActionTypes.FETCH_CATEGORY_LIST_SUCCESS,
)
export const fetchCategoryListFailed = actionCreator<string>(ActionTypes.FETCH_CATEGORY_LIST_FAILED)
