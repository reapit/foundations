import { InstallState } from '@/reducers/installations/install'
import { UninstallState } from '@/reducers/installations/uninstall'
import { ReduxState } from '@/types/core'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'

export const selectInstallAppState = (state: ReduxState): InstallState => {
  return state?.installations?.install
}

export const selectUninstallAppState = (state: ReduxState): UninstallState => {
  return state?.installations?.uninstall
}

export const selectInstallationsList = (state: ReduxState): InstallationModelPagedResult | null => {
  return state?.installations?.list.list
}

export const selectInstallationsLoading = (state: ReduxState): boolean => {
  return state?.installations?.list.isLoading
}
