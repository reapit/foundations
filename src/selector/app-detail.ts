import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectAppDetailId = (state: ReduxState) => {
  return oc(state).appDetail.appDetailData.data.id()
}

export const selectAppDetailInstallationId = (state: ReduxState) => {
  return oc(state).appDetail.appDetailData.data.installationId()
}
