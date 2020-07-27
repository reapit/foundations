import { ReduxState } from '@/types/core'
import { AppListState } from '@/reducers/apps/app-list'

export const selectAppListState = (state: ReduxState): AppListState => {
  return state.apps.list
}
