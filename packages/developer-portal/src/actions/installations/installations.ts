import ActionTypes from '@/constants/action-types'
import { actionCreator } from '@/utils/actions'
import {
  TerminateInstallationModel,
  PagedResultInstallationModel_,
  CreateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { FetchInstallationsListParams } from '@/services/installations'
import { FormState } from '@/types/core'

export type UninstallParams = {
  installationId: string
  callback?: () => void
} & TerminateInstallationModel

export type InstallParams = CreateInstallationModel & { callback?: () => void }

// Installations List
export const fetchInstallationsList = actionCreator<FetchInstallationsListParams>(ActionTypes.FETCH_INSTALLATIONS_LIST)
export const fetchInstallationsListSuccess = actionCreator<PagedResultInstallationModel_>(
  ActionTypes.FETCH_INSTALLATIONS_LIST_SUCCESS,
)
export const fetchInstallationsListFailed = actionCreator<void>(ActionTypes.FETCH_INSTALLATIONS_LIST_FAILED)

// Installations Filter List
export const fetchInstallationsFilterList = actionCreator<FetchInstallationsListParams>(
  ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST,
)
export const fetchInstallationsFilterListSuccess = actionCreator<PagedResultInstallationModel_>(
  ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST_SUCCESS,
)
export const fetchInstallationsFilterListFailed = actionCreator<void>(
  ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST_FAILED,
)
export const setInstallationsFormState = actionCreator<FormState>(ActionTypes.SET_INSTALLATIONS_FORM_STATE)

// CREATE INSTALLATIONS
export const createInstallations = actionCreator<InstallParams>(ActionTypes.CREATE_INSTALLATIONS)

// Terminate INSTALLATIONS
export const requestInstallationsTerminate = actionCreator<UninstallParams>(ActionTypes.REQUEST_INSTALLATIONS_TERMINATE)
