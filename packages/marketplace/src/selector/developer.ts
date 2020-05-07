import { ReduxState } from '@/types/core'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

export const selectDeveloperId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.developerId
}

export const selectDeveloperEmail = (state: ReduxState) => {
  return state?.settings?.developerInfomation?.email
}

export const selectDeveloper = (state: ReduxState) => {
  return state.developer
}

export const selectDeveloperApps = (state: ReduxState) => {
  return state?.developer?.developerData?.data?.data || ([] as AppSummaryModel[])
}
