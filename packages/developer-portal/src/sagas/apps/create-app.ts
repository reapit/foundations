import { notification } from '@reapit/elements'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { logger } from '@reapit/utils'
import { createAppAPI, fetchAppByIdByRawUrl, CreateAppParams } from '@/services/apps'
import { selectDeveloperId } from '@/selector/auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { createAppSuccess, createAppFailed } from '@/actions/apps'

export const submitApp = function*({ data }: Action<CreateAppParams>) {
  const { successCallback, ...appProps } = data
  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      return
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
    console.log('err', err)
    logger(err)
    yield put(createAppFailed(err?.description))
    yield call(notification.error, {
      message: err?.response?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
      duration: 0,
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
