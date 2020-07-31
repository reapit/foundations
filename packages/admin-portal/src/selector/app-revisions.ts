import { ReduxState, FormState } from '@/types/core'
import { AppRevisionModel } from '@reapit/foundations-ts-definitions'
import { RevisionDetailState } from '@/reducers/apps/revisions'

export const selectAppRevisionFormState = (state: ReduxState): FormState => {
  return state.apps?.revision.formState
}

export const selectAppRevisionDetail = (state: ReduxState): RevisionDetailState => {
  return state.apps?.revision || {}
}

export const selectAppRevisionDetailData = (state: ReduxState): AppRevisionModel => {
  return state?.apps?.revision?.data || {}
}
