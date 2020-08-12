import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'

import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { ChangePasswordParams, settingLoadingVisibility } from '@/actions/settings'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { changePasswordService } from '@/services/cognito-identity'
import { notification } from '@reapit/elements'

export const clientPasswordChange = function*({ data }: Action<ChangePasswordParams>) {
  yield put(settingLoadingVisibility(true))
  try {
    /* rename for compatible reason */
    const { currentPassword: password, password: newPassword, email } = data
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
    notification.error({
      message: error.message,
      placement: 'bottomRight',
    })
  } finally {
    yield put(settingLoadingVisibility(false))
  }
}

export const clientPasswordChangeListen = function*() {
  yield takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, clientPasswordChange)
}

export const settingsSagas = function*() {
  yield all([fork(clientPasswordChangeListen)])
}

export default settingsSagas
