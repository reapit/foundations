import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import { fetcher } from '@reapit/elements'
import { removeSession } from '@reapit/cognito-auth'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import messages from '@/constants/messages'
import { MARKETPLACE_HEADERS, URLS } from '@/constants/api'
import { settingShowLoading, requestDeveloperDataSuccess, ChangePasswordParams } from '@/actions/settings'
import { errorThrownServer } from '@/actions/error'
import { showNotificationMessage } from '@/actions/notification-message'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { selectDeveloperId, selectDeveloperEmail } from '@/selector/developer'
import { authLogoutSuccess } from '@/actions/auth'
import Routes from '@/constants/routes'
import { history } from '../core/router'

export const fetchDeveloperInfo = async (developerId: string | null | undefined) => {
  const response = await fetcher({
    url: `${URLS.developers}/${developerId}`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'GET',
    headers: MARKETPLACE_HEADERS
  })
  return response
}

export const developerInformationFetch = function*() {
  yield put(settingShowLoading(true))
  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      return
    }
    const response = yield call(fetchDeveloperInfo, developerId)
    if (response) {
      yield put(requestDeveloperDataSuccess(response))
    }
  } catch (error) {
    console.error(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export type UpdateDeveloperInfoParams = {
  developerId: string
  values: DeveloperModel
}

export const updateDeveloperInfo = async ({ developerId, values }: UpdateDeveloperInfoParams) => {
  const response = await fetcher({
    url: `${URLS.developers}/${developerId}`,
    api: process.env.MARKETPLACE_API_BASE_URL as string,
    method: 'PUT',
    headers: MARKETPLACE_HEADERS,
    body: values
  })
  return response
}

export const developerInfomationChange = function*({ data }: Action<DeveloperModel>) {
  yield put(settingShowLoading(true))
  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      return
    }
    const response = yield call(updateDeveloperInfo, { developerId, values: data })
    if (response) {
      yield put(
        showNotificationMessage({
          variant: 'info',
          message: messages.CHANGE_SAVE_SUCCESSFULLY
        })
      )
      const newResponse = yield call(fetchDeveloperInfo, developerId)
      yield put(requestDeveloperDataSuccess(newResponse))
    }
  } catch (error) {
    console.error(error)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export type CallChangePasswordParams = {
  values: ChangePasswordParams
  email: string
}

export const callChangePassword = async ({ values, email }: CallChangePasswordParams) => {
  const CHANGE_PASSWORD_URL = '/password/change'
  const response = await fetcher({
    url: CHANGE_PASSWORD_URL,
    api: process.env.COGNITO_API_BASE_URL as string,
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: {
      password: values.currentPassword,
      newPassword: values.password,
      userName: email
    }
  })
  return response
}

export const developerPasswordChange = function*({ data }: Action<ChangePasswordParams>) {
  yield put(settingShowLoading(true))
  try {
    const email = yield select(selectDeveloperEmail)
    const response = yield call(callChangePassword, { values: data, email })
    const isCallAPISuccess = response.message === 'SUCCESS'
    if (isCallAPISuccess) {
      yield put(
        showNotificationMessage({
          variant: 'info',
          message: messages.CHANGE_SAVE_SUCCESSFULLY
        })
      )
      const SUCCESS_ALERT_LOGIN_PAGE = `${Routes.DEVELOPER_LOGIN}?isChangePasswordSuccess=1`
      yield call(removeSession)
      yield put(authLogoutSuccess())
      yield history.replace(SUCCESS_ALERT_LOGIN_PAGE)
    }
  } catch (error) {
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(settingShowLoading(false))
  }
}

export const developerInformationFetchListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.SETTING_FETCH_DEVELOPER_INFO, developerInformationFetch)
}

export const developerInformationChangeListen = function*() {
  yield takeLatest<Action<DeveloperModel>>(ActionTypes.SETTING_UPDATE_DEVELOPER, developerInfomationChange)
}

export const developerPasswordChangeListen = function*() {
  yield takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, developerPasswordChange)
}

export const settingsSagas = function*() {
  yield all([
    fork(developerInformationFetchListen),
    fork(developerInformationChangeListen),
    fork(developerPasswordChangeListen)
  ])
}

export default settingsSagas
