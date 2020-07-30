import { InstallState } from '@/reducers/installations/install'
import { UninstallState } from '@/reducers/installations/uninstall'
import { ReduxState } from '@/types/core'

export const selectInstallAppState = (state: ReduxState): InstallState => {
  return state.installations.install
}

export const selectUninstallAppState = (state: ReduxState): UninstallState => {
  return state.installations.uninstall
}
