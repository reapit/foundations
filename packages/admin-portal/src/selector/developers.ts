import { ReduxState, FormState } from '@/types/core'
import { MemberModel } from '@reapit/foundations-ts-definitions'

export const selectCurrentMemberData = (state: ReduxState): MemberModel | undefined => {
  return state.developers.list.currentMember
}

export const selectDeveloperSetStatusFormState = (state: ReduxState): FormState => {
  return state.developers?.setStatusFormState
}
