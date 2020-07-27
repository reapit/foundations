// TODO: Will move all developerSelector to here for reusable
import { ReduxState, FormState } from '@/types/core'
import {
  BillingBreakdownForMonthV2Model,
  BillingOverviewForPeriodV2Model,
  DeveloperModel,
} from '@reapit/foundations-ts-definitions'
import { WebhookPingTestStatus } from '@/reducers/developer'

export const selectDeveloperId = (state: ReduxState) => {
  return state.auth.loginSession?.loginIdentity.developerId
}

export const selectDeveloperEmail = (state: ReduxState) => {
  return state?.settings?.developerInfomation?.email
}

export const selectDeveloper = (state: ReduxState) => {
  return state.developer
}

export const selectDeveloperAppModalVisible = (state: ReduxState) => {
  return state.developer.isVisible
}

export const selectMyIdentity = (state: ReduxState): DeveloperModel => {
  return state.developer?.myIdentity || {}
}

export const selectBilling = (state: ReduxState): BillingOverviewForPeriodV2Model | null => {
  return state.developer?.billing || null
}

export const selectDeveloperLoading = (state: ReduxState): boolean => {
  return state.developer?.loading
}

export const selectIsServiceChartLoading = (state: ReduxState): boolean => {
  return state.developer?.isServiceChartLoading
}

export const selectMonthlyBilling = (state: ReduxState): BillingBreakdownForMonthV2Model => {
  return state.developer?.monthlyBilling || {}
}

export const selectMonthlyBillingLoading = (state: ReduxState): boolean => {
  return state.developer?.isMonthlyBillingLoading
}

export const selectWebhookTestStatus = (state: ReduxState): WebhookPingTestStatus => {
  return state.developer?.webhookPingTestStatus
}

export const selectDeveloperFormState = (state: ReduxState): FormState => {
  return state.developer?.formState
}
