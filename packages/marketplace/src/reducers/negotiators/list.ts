import { PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'
import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchNegotiators, fetchNegotiatorsFailure, fetchNegotiatorsSuccess } from '@/actions/negotiators'
import { APPS_PER_PAGE } from '@/constants/paginator'

export type NegotiatorsState = PagedResultCategoryModel_ & {
  isLoading: boolean
  errorMessage: string
}

export const defaultNegotiatorsState: NegotiatorsState = {
  data: [],
  pageNumber: 1,
  pageSize: APPS_PER_PAGE,
  pageCount: 0,
  totalCount: 0,
  isLoading: false,
  errorMessage: '',
}

export const negotiatorsReducer = (
  state: NegotiatorsState = defaultNegotiatorsState,
  action: Action<any>,
): NegotiatorsState => {
  if (isType(action, fetchNegotiators)) {
    return {
      ...state,
      isLoading: true,
      errorMessage: '',
    }
  }

  if (isType(action, fetchNegotiatorsSuccess)) {
    return {
      ...state,
      ...action.data,
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchNegotiatorsFailure)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}
