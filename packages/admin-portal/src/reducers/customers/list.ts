import { Action } from '@/types/core'
import { isType } from '@/utils/actions'
import { fetchCustomersList, fetchCustomersListSuccess, fetchCustomersListFailed } from '@/actions/customers'
import { PagedResultCustomerModel } from '@/services/customers'

export type CustomersListState = PagedResultCustomerModel & {
  isLoading: boolean
  errorMessage: string
}

export const defaultState: CustomersListState = {
  isLoading: false,
  errorMessage: '',
  data: [],
  pageSize: 0,
  pageNumber: 0,
  pageCount: 0,
  totalCount: 0,
}

const customersListReducer = (state: CustomersListState = defaultState, action: Action<any>): CustomersListState => {
  if (isType(action, fetchCustomersList)) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if (isType(action, fetchCustomersListSuccess)) {
    return {
      ...state,
      ...(action.data ?? {}),
      isLoading: false,
      errorMessage: '',
    }
  }

  if (isType(action, fetchCustomersListFailed)) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.data,
    }
  }

  return state
}

export default customersListReducer
