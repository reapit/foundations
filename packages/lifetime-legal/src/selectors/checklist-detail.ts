import { ReduxState } from '@/types/core'
import { defaultStatus } from '@/reducers/checklist-detail'
import { ContactIdentityCheckModel, ContactModel } from '@reapit/foundations-ts-definitions'

export const selectCheckListDetailStatus = (state: ReduxState) => {
  return state?.checklistDetail?.status || defaultStatus
}

export const selectCheckListDetailContact = (state: ReduxState): ContactModel => {
  return state?.checklistDetail?.checklistDetailData?.contact || {}
}

export const selectCheckListDetailIdCheck = (state: ReduxState): ContactIdentityCheckModel => {
  return state?.checklistDetail?.checklistDetailData?.idCheck || {}
}

export const selectCheckListDetailPrimaryIdUrl = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.metadata?.primaryIdUrl
}

export const selectCheckListDetailSecondaryIdUrl = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.metadata?.secondaryIdUrl
}

export const selectCheckListDetailPrimaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.documents?.[0]
}

export const selectCheckListDetailSecondaryId = (state: ReduxState) => {
  return state?.checklistDetail?.checklistDetailData?.idCheck?.documents?.[1]
}

export const selectCheckListDetailIsSubmitting = (state: ReduxState) => {
  return state?.checklistDetail?.isSubmitting || false
}
