import { ReduxState } from '@/types/core'

export const selectAppRevisions = (state: ReduxState) => {
  return state.revisions.revisions || {}
}

export const selectAppRevisionDetail = (state: ReduxState) => {
  return state.revisionDetail || {}
}
