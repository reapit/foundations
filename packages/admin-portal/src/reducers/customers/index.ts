import { combineReducers } from 'redux'
import customersList, { CustomersListState } from './list'

export type CustomersState = {
  list: CustomersListState
}
export default combineReducers<CustomersListState>({
  list: customersList,
})
