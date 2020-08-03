import { ReduxState } from '@/types/core'
import { InstallationModel } from '@reapit/foundations-ts-definitions'

export const selectInstallationsListLoading = (state: ReduxState) => {
  return state.installations.installationsList.loading
}

export const selectInstallationFormState = (state: ReduxState) => {
  return state.installations.formState.state
}

export const selectInstallationsListData = (state: ReduxState): InstallationModel[] => {
  return state.installations.installationsList?.pagedResult?.data || []
}

export const selectInstallationsFilterListData = (state: ReduxState): InstallationModel[] => {
  return state.installations.installationsFilterList?.pagedResult?.data || []
}

export const selectInstallationsFilterList = (state: ReduxState) => {
  return state.installations.installationsFilterList?.pagedResult
}

export const selectInstallationsLoading = (state: ReduxState) => {
  return state.installations.installationsList?.loading
}
