import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { appInstallationsSetFormState, UninstallParams, InstallParams } from '@/actions/app-installations'
import { selectLoggedUserEmail, selectClientId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { createInstallation, removeAccessToAppById } from '@/services/installations'

export const appInstallSaga = function*(options) {
  const data: InstallParams = options.data
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))

    const email = yield select(selectLoggedUserEmail)
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('ClientId not exist')
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
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))
    const email = yield select(selectLoggedUserEmail)

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
