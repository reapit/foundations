import { ReduxState } from '@/types/core'
import { SubmitAppState } from '@/reducers/submit-app'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { ScopeModel } from '@reapit/foundations-ts-definitions'

export const selectSubmitAppScopes = (state: ReduxState): ScopeModel[] => {
  return state.submitApp.submitAppData?.scopes || []
}

export const selectSubmitAppState = (state: ReduxState): SubmitAppState => {
  return state.submitApp
}

export const selectSubmitAppLoadingState = (state: ReduxState): boolean => {
  return state.submitApp.loading
}

export const selectSubmitAppRevisionState = (state: ReduxState): SubmitRevisionState => {
  return state.submitRevision
}
