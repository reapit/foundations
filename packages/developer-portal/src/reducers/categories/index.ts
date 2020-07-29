import { combineReducers } from 'redux'
import categoryListReducer, { CategoryListState } from './category-list'

export type CategoriesRootState = {
  list: CategoryListState
}
export default combineReducers<CategoriesRootState>({
  list: categoryListReducer,
})
