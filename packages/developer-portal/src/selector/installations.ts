import { ReduxState } from '@/types/core'
import { InstallationModel } from '@reapit/foundations-ts-definitions'

export const getInstallations = (state: ReduxState) => {
  return state.installations
}

export const selectInstallationsListLoading = (state: ReduxState) => {
  return state.installations2.installationsList.loading
}

export const selectInstallationFormState = (state: ReduxState) => {
  return state.installations2.formState.state
}

export const selectInstallationAppData = (state: ReduxState) => {
  return state.installations.installationsAppData
}

export const selectInstallationsListData = (state: ReduxState): InstallationModel[] => {
  return state.installations2.installationsList?.pagedResult?.data || []
}

export const selectInstallationsFilterListData = (state: ReduxState): InstallationModel[] => {
  return state.installations2.installationsFilterList?.pagedResult?.data || []
}

export const selectInstallationsFilterList = (state: ReduxState) => {
  return state.installations2.installationsFilterList?.pagedResult
}

export const selectInstallationsLoading = (state: ReduxState) => {
  return state.installations2.installationsList?.loading
}
