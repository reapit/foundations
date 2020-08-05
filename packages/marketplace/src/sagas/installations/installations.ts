import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { installAppSuccess, installAppFailed, uninstallAppSuccess, uninstallAppFailed } from '@/actions/installations'
import { selectLoggedUserEmail } from '@/selector/auth'
import {
  createInstallation,
  CreateInstallationParams,
  removeAccessToAppById,
  RemoveAccessToAppByIdParams,
} from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { notification } from '@reapit/elements'

export const installSagas = function*({ data }) {
  try {
    const { callback, ...restParams } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)
    const clientId = yield call(selectClientId, connectSession)

    if (!clientId) {
      return
    }
    yield call(createInstallation, { ...restParams, clientId, approvedBy: email })
    yield put(installAppSuccess())
    callback && callback()
  } catch (err) {
    yield put(installAppFailed(err.description))
    notification.error({ message: err.description, placement: 'bottomRight' })
  }
}

export const uninstallSagas = function*({ data }) {
  try {
    const { callback, ...restParams } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)
    yield call(removeAccessToAppById, { ...restParams, terminatedBy: email })
    yield put(uninstallAppSuccess())
    callback && callback()
  } catch (err) {
    yield put(uninstallAppFailed(err.description))
    notification.error({ message: err.description, placement: 'bottomRight' })
  }
}

export const appInstallationsListen = function*() {
  yield takeLatest<Action<RemoveAccessToAppByIdParams>>(ActionTypes.UNINSTALL_APP, uninstallSagas)
  yield takeLatest<Action<CreateInstallationParams>>(ActionTypes.INSTALL_APP, installSagas)
}

export const installationsSagas = function*() {
  yield all([fork(appInstallationsListen)])
}
