import { ReduxState } from '@/types/core'

export const selectSubmitAppState = (state: ReduxState) => {
  return state.submitApp
}

export const selectSubmitAppRevisionState = (state: ReduxState) => {
  return state.submitRevision
}
