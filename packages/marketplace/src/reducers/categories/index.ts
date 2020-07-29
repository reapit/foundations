import { combineReducers } from 'redux'
import { categoriesReducer, CategoriesState } from './list'

export type CategoriesRootState = {
  list: CategoriesState
}

export default combineReducers<CategoriesRootState>({
  list: categoriesReducer,
})
