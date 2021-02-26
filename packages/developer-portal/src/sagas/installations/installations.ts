import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import {
  installAppSuccess,
  installAppFailed,
  uninstallAppSuccess,
  uninstallAppFailed,
  fetchInstallationsListSuccess,
} from '@/actions/installations'
import { selectDeveloperId, selectLoggedUserEmail } from '@/selector/auth'
import {
  createInstallation,
  CreateInstallationParams,
  fetchInstallationsList,
  removeAccessToAppById,
  RemoveAccessToAppByIdParams,
} from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'
import { notification } from '@reapit/elements'
import { GET_ALL_PAGE_SIZE } from '../../constants/paginator'

export const installSagas = function* ({ data }) {
  try {
    const { callback, appId, ...restParams } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)
    const clientId = yield call(selectClientId, connectSession)
    const developerId = yield call(selectDeveloperId, connectSession)

    if (!clientId || !developerId) {
      return
    }
    yield call(createInstallation, { ...restParams, appId, clientId, approvedBy: email })
    yield put(installAppSuccess())
    const response = yield call(fetchInstallationsList, {
      pageNumber: 1,
      pageSize: GET_ALL_PAGE_SIZE,
      isInstalled: true,
      developerId,
      appId,
    })
    yield put(fetchInstallationsListSuccess(response))
    callback && callback()
  } catch (err) {
    yield put(installAppFailed(err.description))
    notification.error({ message: err.description, placement: 'bottomRight' })
  }
}

export const uninstallSagas = function* ({ data }) {
  try {
    const { callback, appId, ...restParams } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)
    const email = yield call(selectLoggedUserEmail, connectSession)
    const developerId = yield call(selectDeveloperId, connectSession)

    yield call(removeAccessToAppById, { ...restParams, appId, terminatedBy: email })
    yield put(uninstallAppSuccess())
    const response = yield call(fetchInstallationsList, {
      pageNumber: 1,
      pageSize: GET_ALL_PAGE_SIZE,
      isInstalled: true,
      developerId,
      appId,
    })
    yield put(fetchInstallationsListSuccess(response))
    callback && callback()
  } catch (err) {
    yield put(uninstallAppFailed(err.description))
    notification.error({ message: err.description, placement: 'bottomRight' })
  }
}

export const appInstallationsListen = function* () {
  yield takeLatest<Action<RemoveAccessToAppByIdParams>>(ActionTypes.UNINSTALL_APP, uninstallSagas)
  yield takeLatest<Action<CreateInstallationParams>>(ActionTypes.INSTALL_APP, installSagas)
}

export const installationsSagas = function* () {
  yield all([fork(appInstallationsListen)])
}

export default installationsSagas
