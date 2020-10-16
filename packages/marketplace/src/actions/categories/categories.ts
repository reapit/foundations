import { CategoryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FetchCategoriesParams } from '@/services/categories'

export const fetchCategories = actionCreator<FetchCategoriesParams>(ActionTypes.FETCH_CATEGORIES)

export const fetchCategoriesSuccess = actionCreator<CategoryModelPagedResult | undefined>(
  ActionTypes.FETCH_CATEGORIES_SUCCESS,
)

export const fetchCategoriesFailed = actionCreator<string>(ActionTypes.FETCH_CATEGORIES_FAILED)
