import { ReduxState } from '@/types/core'
import { CustomersListState } from '@/reducers/customers/list'

export const selectCustomersList = (state: ReduxState): CustomersListState => {
  return state.customers.list
}
