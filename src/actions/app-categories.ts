import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultCategoryModel_ } from '../types/marketplace-api-schema'

export const categoriesReceiveData = actionCreator<PagedResultCategoryModel_ | undefined>(
  ActionTypes.CATEGORIES_RECEIVE_DATA
)
