import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { defaultStatus } from '@/reducers/checklist-detail'

export const selectCheckListDetailStatus = (state: ReduxState) => {
  return oc(state).checklistDetail.status(defaultStatus)
}

export const selectCheckListDetailContact = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact({})
}

export const selectCheckListDetailPrimaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact.metadata['primaryId'][0]['documents'][0]({})
}

export const selectCheckListDetailSecondaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact.metadata['secondaryId'][0]['documents'][0]({})
}
