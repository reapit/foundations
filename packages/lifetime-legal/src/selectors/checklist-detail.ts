import { ReduxState } from '@/types/core'
import { defaultStatus } from '@/reducers/checklist-detail'
import { IdentityCheckModel, ContactModel } from '@reapit/foundations-ts-definitions'

export const selectStatus = (state: ReduxState) => {
  return state?.checklistDetail?.status || defaultStatus
}

export const selectContact = (state: ReduxState): ContactModel => {
  return state?.checklistDetail?.checklistDetailData?.contact || {}
}

export const selectIdentityCheck = (state: ReduxState): IdentityCheckModel => {
  return state?.checklistDetail?.checklistDetailData?.idCheck || {}
}

export const selectPrimaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.identityDocument1 || {}
}

export const selectSecondaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.identityDocument2 || {}
}

export const selectIsSubmitting = (state: ReduxState) => {
  return state?.checklistDetail?.isSubmitting || false
}
