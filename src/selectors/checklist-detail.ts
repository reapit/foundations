import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { defaultStatus } from '@/reducers/checklist-detail'

export const selectCheckListDetailStatus = (state: ReduxState) => {
  return oc(state).checklistDetail.status(defaultStatus)
}

export const selectCheckListDetailContact = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact({})
}

export const selectCheckListDetailIdCheck = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck(undefined)
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

export const selectCheckListDetailIsSubmitting = (state: ReduxState) => {
  return oc(state).checklistDetail.isSubmitting(false)
}
