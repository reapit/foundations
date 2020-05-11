// TODO: Will move all developerSelector to here for reusable
import { ReduxState } from '@/types/core'
import { AppSummaryModel, DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Billing, MonthlyBilling } from '@/reducers/developer'

export const selectDeveloperId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.developerId
}

export const selectDeveloperEmail = (state: ReduxState) => {
  return state?.settings?.developerInfomation?.email
}

export const selectDeveloper = (state: ReduxState) => {
  return state.developer
}

export const selectDeveloperApps = (state: ReduxState): AppSummaryModel[] => {
  return state.developer?.developerData?.data.data || ([] as AppSummaryModel[])
}

export const selectMyIdentity = (state: ReduxState): DeveloperModel => {
  return state.developer?.myIdentity || {}
}

export const selectBilling = (state: ReduxState): Billing | null => {
  return state.developer?.billing || null
}

export const selectDeveloperLoading = (state: ReduxState): boolean => {
  return state.developer?.loading
}

export const selectIsServiceChartLoading = (state: ReduxState): boolean => {
  return state.developer?.isServiceChartLoading
}

export const selectMonthlyBilling = (state: ReduxState): MonthlyBilling | null => {
  return state.developer?.monthlyBilling
}

export const selectMonthlyBillingLoading = (state: ReduxState): boolean => {
  return state.developer?.isMonthlyBillingLoading
}
