import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import messages from '@/constants/messages'
import { settingShowLoading, requestDeveloperDataSuccess, ChangePasswordParams } from '@/actions/settings'
import { errorThrownServer } from '@/actions/error'
import { showNotificationMessage } from '@/actions/notification-message'
import { UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectSettingsPageDeveloperInformation } from '@/selector/settings'
import { logger } from '@reapit/utils'
import { fetchDeveloperById, updateDeveloperById } from '@/services/developers'
import { getDeveloperId } from '@/utils/session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { changePasswordService } from '@/services/cognito-identity'
import { selectDeveloperEmail } from '@/selector'

export const developerInformationFetch = function*() {
  yield put(settingShowLoading(true))
  try {
    const developerId = yield call(getDeveloperId)
    if (!developerId) {
      return
    }
    const response = yield call(fetchDeveloperById, { id: developerId })
    if (response) {
      yield put(requestDeveloperDataSuccess(response))
    }
  } catch (error) {
    logger(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export type UpdateDeveloperInfoParams = {
  developerId: string
  values: UpdateDeveloperModel
}

export const developerInfomationChange = function*({ data }: Action<UpdateDeveloperModel>) {
  yield put(settingShowLoading(true))
  try {
    const developerId = yield call(getDeveloperId)
    if (!developerId) {
      return
    }

    // merge input data with current data. Input data could may not have required attirbutes. (require)
    const currentData = yield select(selectSettingsPageDeveloperInformation)
    const inputApiData = {
      ...currentData,
      id: developerId,
      ...data,
      companyName: data.companyName || currentData.company,
    }

    const response = yield call(updateDeveloperById, inputApiData)
    if (response) {
      yield put(
        showNotificationMessage({
          variant: 'info',
          message: messages.CHANGE_SAVE_SUCCESSFULLY,
        }),
      )
      const newResponse = yield call(fetchDeveloperById, { id: developerId })
      yield put(requestDeveloperDataSuccess(newResponse))
    }
  } catch (error) {
    logger(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export type CallChangePasswordParams = {
  values: ChangePasswordParams
  email: string
}

export const developerPasswordChange = function*({ data }: Action<ChangePasswordParams>) {
  yield put(settingShowLoading(true))
  try {
    const email = yield select(selectDeveloperEmail)
    /* rename for compatible reason */
    const { currentPassword: password, password: newPassword } = data
    const cognitoClientId = window.reapit.config.cognitoClientId
    const response = yield call(changePasswordService, {
      userName: email,
      password,
      newPassword,
      cognitoClientId,
    })
    const isCallAPISuccess = response === 'SUCCESS'
    if (!isCallAPISuccess) {
      throw new Error('Server error')
    }
    localStorage.setItem('isPasswordChanged', 'true')
    reapitConnectBrowserSession.connectLogoutRedirect()
  } catch (error) {
    logger(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export const developerInformationFetchListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.SETTING_FETCH_DEVELOPER_INFO, developerInformationFetch)
}

export const developerInformationChangeListen = function*() {
  yield takeLatest<Action<UpdateDeveloperModel>>(ActionTypes.SETTING_UPDATE_DEVELOPER, developerInfomationChange)
}

export const developerPasswordChangeListen = function*() {
  yield takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, developerPasswordChange)
}

export const settingsSagas = function*() {
  yield all([
    fork(developerInformationFetchListen),
    fork(developerInformationChangeListen),
    fork(developerPasswordChangeListen),
  ])
}

export default settingsSagas
