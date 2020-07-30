import { CreateInstallationParams, RemoveAccessToAppByIdParams } from '@/services/installations'
import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'
import { FormState } from '@/types/core'

export interface InstallationParams {
  appId?: string[]
  developerId?: string[]
  clientId?: string[]
  externalAppId?: string[]
  showTerminated?: boolean
  isInstalled?: boolean
  installedDateFrom?: string
  installedDateTo?: string
  pageSize?: number
  pageNumber?: number
}

export type InstallParams = CreateInstallationParams & { callback?: () => void }

export type UninstallParams = {
  installationId: string
  callback?: () => void
} & RemoveAccessToAppByIdParams

export const appInstallationsSetFormState = actionCreator<FormState>(ActionTypes.APP_INSTALLATIONS_SET_FORM_STATE)

export const installApp = actionCreator<InstallParams>(ActionTypes.INSTALL_APP)
export const installAppSuccess = actionCreator<void>(ActionTypes.INSTALL_APP_SUCCESS)
export const installAppFailed = actionCreator<string>(ActionTypes.INSTALL_APP_FAILED)

export const uninstallApp = actionCreator<UninstallParams>(ActionTypes.UNINSTALL_APP)
export const uninstallAppSuccess = actionCreator<void>(ActionTypes.UNINSTALL_APP_SUCCESS)
export const uninstallAppFailed = actionCreator<string>(ActionTypes.UNINSTALL_APP_FAILED)
