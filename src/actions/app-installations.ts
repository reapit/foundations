import { actionCreator } from '../utils/actions'
import ActionTypes from '../constants/action-types'
import { FormState } from '../types/core'
import {
  PagedResultInstallationModel_,
  TerminateInstallationModel,
  CreateInstallationModel
} from '@reapit/foundations-ts-definitions'

export interface InstallationParams {
  appId?: string[]
  developerId?: string[]
  clientId?: string[]
  externalAppId?: string[]
  showTerminated?: boolean
  pageSize?: number
  pageNumber?: number
}

export type InstallParams = CreateInstallationModel

export type UninstallParams = {
  installationId: string
} & TerminateInstallationModel

export const appInstallationsRequestData = actionCreator<InstallationParams>(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA)
export const appInstallationsReceiveData = actionCreator<PagedResultInstallationModel_>(
  ActionTypes.APP_INSTALLATIONS_RECEIVE_DATA
)
export const appInstallationsRequestDataFailure = actionCreator<void>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_DATA_FAILURE
)
export const appInstallationsRequestInstall = actionCreator<InstallParams>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL
)
export const appInstallationsRequestUninstall = actionCreator<UninstallParams>(
  ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL
)
export const appInstallationsSetFormState = actionCreator<FormState>(ActionTypes.APP_INSTALLATIONS_SET_FORM_STATE)
