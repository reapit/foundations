import { notification } from '@reapit/elements'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { logger } from '@reapit/utils'
import { createAppAPI, fetchAppByIdByRawUrl, CreateAppParams } from '@/services/apps'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { createAppSuccess, createAppFailed } from '@/actions/apps'
import { getDeveloperId } from '@/utils/session'

export const submitApp = function*({ data: { successCallback, ...appProps } }: Action<CreateAppParams>) {
  try {
    const developerId = yield call(getDeveloperId)
    if (typeof developerId !== 'string') {
      throw new Error('Cant select developer id')
    }
    const headers: Headers = yield call(createAppAPI, { ...appProps, developerId })
    // ^ got Illegal invocation when: const locationHeader = yield call(headers.get, 'location')
    const locationHeader = headers.get('location')
    if (typeof locationHeader !== 'string') {
      throw new Error("Location header is not returned from Create App API's response")
    }
    const appDetail: AppDetailModel = yield call(fetchAppByIdByRawUrl, locationHeader)
    if (successCallback) {
      successCallback(appDetail)
    }
    yield put(createAppSuccess())
  } catch (err) {
    logger(err)
    yield put(createAppFailed(err?.description))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const createAppListen = function*() {
  yield takeLatest<Action<CreateAppParams>>(ActionTypes.CREATE_APP, submitApp)
}

export const createAppSagas = function*() {
  yield all([fork(createAppListen)])
}

export default createAppSagas
