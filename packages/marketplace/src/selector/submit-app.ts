import { ReduxState } from '@/types/core'
import { SubmitAppState } from '@/reducers/submit-app'
import { SubmitRevisionState } from '@/reducers/submit-revision'

export const selectSubmitAppState = (state: ReduxState): SubmitAppState => {
  return state.submitApp
}

export const selectSubmitAppRevisionState = (state: ReduxState): SubmitRevisionState => {
  return state.submitRevision
}
