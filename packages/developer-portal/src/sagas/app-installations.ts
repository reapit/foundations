import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import {
  appInstallationsReceiveData,
  InstallationParams,
  appInstallationsSetFormState,
  UninstallParams,
  InstallParams,
  appInstallationsRequestDataFailure,
  appInstallationsFilterReceiveData,
  appInstallationsFilterRequestDataFailure,
} from '@/actions/app-installations'
import { selectLoggedUserEmail, selectClientId } from '@/selector/client'
import { logger } from '@reapit/utils'
import { fetchInstallationsList, createInstallation, removeAccessToAppById } from '@/services/installations'
import { selectDeveloperId } from '@/selector/auth'

export const installationsSaga = function*({ data }) {
  try {
    const developerId = yield select(selectDeveloperId)
    const response = yield call(fetchInstallationsList, { ...data, developerId })
    yield put(appInstallationsReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(appInstallationsRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const installationsFilterSaga = function*({ data }) {
  try {
    const developerId = yield select(selectDeveloperId)
    const response = yield call(fetchInstallationsList, { ...data, developerId })
    yield put(appInstallationsFilterReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(appInstallationsFilterRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

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
  yield takeLatest<Action<InstallationParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA, installationsSaga)
  yield takeLatest<Action<InstallationParams>>(
    ActionTypes.APP_INSTALLATIONS_FILTER_REQUEST_DATA,
    installationsFilterSaga,
  )
  yield takeLatest<Action<UninstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL, appUninstallSaga)
  yield takeLatest<Action<InstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL, appInstallSaga)
}

export const appInstallationsSagas = function*() {
  yield all([fork(appInstallationsListen)])
}

export default appInstallationsSagas
