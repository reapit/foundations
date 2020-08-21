import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { PagedResultCustomerModel_ } from '@/services/customers'

export interface FetchCustomersListQueryParams {
  queryString: string
}

export const fetchCustomersList = actionCreator<FetchCustomersListQueryParams>(ActionTypes.FETCH_CUSTOMERS_LIST)
export const fetchCustomersListFailed = actionCreator<string>(ActionTypes.FETCH_CUSTOMERS_LIST_FAILED)

export const fetchCustomersListSuccess = actionCreator<PagedResultCustomerModel_>(
  ActionTypes.FETCH_CUSTOMERS_LIST_SUCCES,
)
