import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '../types/core'
import {
  PagedResultInstallationModel_,
  TerminateInstallationModel,
  CreateInstallationModel,
} from '@reapit/foundations-ts-definitions'

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

export type InstallParams = CreateInstallationModel & { callback?: () => void }

export type UninstallParams = {
  installationId: string
  callback?: () => void
} & TerminateInstallationModel

export const appInstallationsRequestData = actionCreator<InstallationParams>(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA)
export const appInstallationsReceiveData = actionCreator<PagedResultInstallationModel_>(
  ActionTypes.APP_INSTALLATIONS_RECEIVE_DATA,
)
export const appInstallationsRequestDataFailure = actionCreator<void>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_DATA_FAILURE,
)
export const appInstallationsFilterRequestData = actionCreator<InstallationParams>(
  ActionTypes.APP_INSTALLATIONS_FILTER_REQUEST_DATA,
)
export const appInstallationsFilterReceiveData = actionCreator<PagedResultInstallationModel_>(
  ActionTypes.APP_INSTALLATIONS_FILTER_RECEIVE_DATA,
)
export const appInstallationsFilterRequestDataFailure = actionCreator<void>(
  ActionTypes.APP_INSTALLATIONS_FILTER_REQUEST_DATA_FAILURE,
)

export const appInstallationsRequestInstall = actionCreator<InstallParams>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL,
)
export const appInstallationsRequestUninstall = actionCreator<UninstallParams>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL,
)
export const appInstallationsSetFormState = actionCreator<FormState>(ActionTypes.APP_INSTALLATIONS_SET_FORM_STATE)
