import { STEPS } from './../components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { defaultStatus } from '@/constants/section-status'

export const selectCheckListDetailStatus = (state: ReduxState) => {
  return oc(state).checklistDetail.status(defaultStatus)
}

export const selectCheckListDetailContact = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact(null)
}

export const selectCheckListDetailIsSubmitting = (state: ReduxState) => {
  return oc(state).checklistDetail.isSubmitting(false)
}

export const selectCheckListDetailIdCheck = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck(null)
}

export const selectCheckListDetailPrimaryIdUrl = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.metadata.primaryIdUrl()
}

export const selectCheckListDetailSecondaryIdUrl = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.metadata.secondaryIdUrl()
}

export const selectCheckListDetailPrimaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.documents[0]()
}

export const selectCheckListDetailSecondaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.documents[1]()
}

export const selectDeclarationRisk = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact.metadata.declarationRisk({})
}

export const selectIdentityTypes = (state: ReduxState) => {
  return oc(state).identityTypes.identityTypes([])
}
