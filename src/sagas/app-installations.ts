import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '../constants/api'
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
  appInstallationsRequestDataFailure
} from '@/actions/app-installations'
import { selectLoggedUserEmail, selectClientId } from '@/selector/client'

export const fetchInstallations = async (data: InstallationParams) => {
  const response = await fetcher({
    url: `${URLS.installations}?${setQueryParams({ ...data })}`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'GET',
    headers: MARKETPLACE_HEADERS
  })
  return response
}

export const fetchInstallApp = async ({ data, clientId, email }) => {
  const { appId } = data
  const response = await fetcher({
    url: `${URLS.installations}`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: { appId, clientId, approvedBy: email }
  })
  return response
}

export const fetchUninstallApp = async ({ data, email }) => {
  const { installationId, ...body } = data
  const response = await fetcher({
    url: `${URLS.installations}/${installationId}/terminate`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: { ...body, terminatedBy: email }
  })
  return response
}

export const installationsSaga = function*({ data }) {
  try {
    const response = yield call(fetchInstallations, data)
    yield put(appInstallationsReceiveData(response))
  } catch (err) {
    yield put(appInstallationsRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appInstallSaga = function*({ data }) {
  const { appId } = data
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))

    const email = yield select(selectLoggedUserEmail)
    const clientId = yield select(selectClientId)

    if (!clientId) {
      throw new Error('ClientId not exist')
    }

    yield call(fetchInstallApp, { data, clientId, email })
    yield put(appInstallationsSetFormState('SUCCESS'))
  } catch (err) {
    yield put(appInstallationsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appUninstallSaga = function*({ data }) {
  try {
    yield put(appInstallationsSetFormState('SUBMITTING'))
    const email = yield select(selectLoggedUserEmail)

    yield call(fetchUninstallApp, { data, email })
    yield put(appInstallationsSetFormState('SUCCESS'))
  } catch (err) {
    yield put(appInstallationsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appInstallationsListen = function*() {
  yield takeLatest<Action<InstallationParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA, installationsSaga)
  yield takeLatest<Action<UninstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL, appUninstallSaga)
  yield takeLatest<Action<InstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL, appInstallSaga)
}

export const appInstallationsSagas = function*() {
  yield all([fork(appInstallationsListen)])
}

export default appInstallationsSagas
