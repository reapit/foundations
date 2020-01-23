import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'

export const categoriesReceiveData = actionCreator<PagedResultCategoryModel_ | undefined>(
  ActionTypes.CATEGORIES_RECEIVE_DATA
)
