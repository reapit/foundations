import { ReduxState } from '@/types/core'
import { ScopeModel } from '@reapit/foundations-ts-definitions'

export const selectScopeList = (state: ReduxState): ScopeModel[] => {
  return state.scopes?.list?.data || []
}
