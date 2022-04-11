// TODO: Will move all developerSelector to here for reusable
import { ReduxState, FormState } from '@/types/core'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { WebhookPingTestStatus } from '@/reducers/developer'

export const selectDeveloper = (state: ReduxState) => {
  return state.developer
}

export const selectDeveloperAppModalVisible = (state: ReduxState) => {
  return state.developer.isVisible
}

export const selectMyIdentity = (state: ReduxState): DeveloperModel => {
  return state.developer?.myIdentity || {}
}

export const selectDeveloperLoading = (state: ReduxState): boolean => {
  return state.developer?.loading
}

export const selectIsServiceChartLoading = (state: ReduxState): boolean => {
  return state.developer?.isServiceChartLoading
}

export const selectWebhookTestStatus = (state: ReduxState): WebhookPingTestStatus => {
  return state.developer?.webhookPingTestStatus
}

export const selectDeveloperFormState = (state: ReduxState): FormState => {
  return state.developer?.formState
}
