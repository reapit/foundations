import { CreateInstallationParams, RemoveAccessToAppByIdParams } from '@/services/installations'
import { actionCreator } from '@/utils/actions'
import ActionTypes from '@/constants/action-types'

export const installApp = actionCreator<CreateInstallationParams>(ActionTypes.INSTALL_APP)
export const installAppSuccess = actionCreator<void>(ActionTypes.INSTALL_APP_SUCCESS)
export const installAppFailed = actionCreator<string>(ActionTypes.INSTALL_APP_FAILED)

export const uninstallApp = actionCreator<RemoveAccessToAppByIdParams>(ActionTypes.UNINSTALL_APP)
export const uninstallAppSuccess = actionCreator<void>(ActionTypes.UNINSTALL_APP_SUCCESS)
export const uninstallAppFailed = actionCreator<string>(ActionTypes.UNINSTALL_APP_FAILED)
