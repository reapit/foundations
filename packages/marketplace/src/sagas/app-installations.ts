import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { appInstallationsSetFormState, UninstallParams, InstallParams } from '@/actions/app-installations'
import { selectLoggedUserEmail } from '@/selector/client'
import { logger } from '@reapit/utils'
import { createInstallation, removeAccessToAppById } from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { CLIENT_ID_NOT_FOUND_ERROR } from '@/constants/errors'

export const appInstallSaga = function*(options) {
  const data: InstallParams = options.data
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))

    // FIXME(selectClientId): install
    // Install-able

    const connectSession = yield call(reapitConnectBrowserSession.connectSession)

    const clientId = yield call(selectClientId, connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)

    if (!clientId) {
      throw CLIENT_ID_NOT_FOUND_ERROR
    }

    yield call(createInstallation, { ...data, clientId, approvedBy: email })
    if (data.callback) {
      data.callback()
    }
    yield put(appInstallationsSetFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(appInstallationsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appUninstallSaga = function*(options) {
  const data: UninstallParams = options.data
  // FIXME(selectLoggedUserEmail)
  // uninstallable
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)

    yield call(removeAccessToAppById, { ...data, terminatedBy: email })
    if (data.callback) {
      data.callback()
    }
    yield put(appInstallationsSetFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(appInstallationsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appInstallationsListen = function*() {
  yield takeLatest<Action<UninstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL, appUninstallSaga)
  yield takeLatest<Action<InstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL, appInstallSaga)
}

export const appInstallationsSagas = function*() {
  yield all([fork(appInstallationsListen)])
}

export default appInstallationsSagas
