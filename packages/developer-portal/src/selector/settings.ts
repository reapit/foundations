import { ReduxState } from '@/types/core'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export const selectSettingsPageIsLoading = (state: ReduxState): boolean => {
  return state?.settings?.loading || false
}

export const selectSettingsPageDeveloperInformation = (state: ReduxState): DeveloperModel => {
  return state?.settings?.developerInfomation || {}
}
