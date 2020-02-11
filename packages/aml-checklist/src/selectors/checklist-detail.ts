import { ReduxState } from '@/types/core'
import { defaultStatus } from '@/constants/section-status'

export const selectCheckListDetailStatus = (state: ReduxState) => {
  return state?.checklistDetail?.status || defaultStatus
}

export const selectCheckListDetailContact = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.contact || null
}

export const selectCheckListDetailIsSubmitting = (state: ReduxState) => {
  return state?.checklistDetail?.isSubmitting || false
}

export const selectCheckListDetailIdCheck = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck || null
}

export const selectCheckListDetailPrimaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.identityDocument1
}

export const selectCheckListDetailSecondaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.identityDocument2
}

export const selectDeclarationRisk = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.contact?.metadata?.declarationRisk || {}
}

export const selectIdentityTypes = (state: ReduxState) => {
  return state?.identityTypes?.identityTypes || []
}
