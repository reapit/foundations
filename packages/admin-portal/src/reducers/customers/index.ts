import { combineReducers } from 'redux'
import customersList, { CustomersListState, defaultState as defaultListState } from './list'

export type CustomersState = {
  list: CustomersListState
}

export const defaultState: CustomersState = {
  list: defaultListState,
}

export default combineReducers<CustomersState>({
  list: customersList,
})
