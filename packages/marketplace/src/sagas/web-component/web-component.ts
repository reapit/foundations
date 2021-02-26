import { notification } from '@reapit/elements'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import {
  fetchWebComponentConfigApi,
  FetchWebComponentConfigParams,
  updateWebComponentConfigApi,
  UpdateWebComponentConfigParams,
} from '@/services/web-component'
import {
  fetchWebComponentConfigSuccess,
  fetchWebComponentConfigFailed,
  updateWebComponentConfigFailed,
  updateWebComponentConfigSuccess,
} from '@/actions/web-component'

export const fetchWebComponentConfigSaga = function* ({ data }: Action<FetchWebComponentConfigParams>) {
  try {
    const response = yield call(fetchWebComponentConfigApi, { ...data })
    yield put(fetchWebComponentConfigSuccess(response))
  } catch (err) {
    yield put(fetchWebComponentConfigFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const updateWebComponentConfigSaga = function* ({ data }: Action<UpdateWebComponentConfigParams>) {
  try {
    const { callback, ...restParams } = data
    const response = yield call(updateWebComponentConfigApi, restParams)
    yield put(updateWebComponentConfigSuccess())
    yield put(fetchWebComponentConfigSuccess(response))
    callback && callback()
  } catch (err) {
    yield put(updateWebComponentConfigFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const webComponentSagasListen = function* () {
  yield takeLatest<Action<FetchWebComponentConfigParams>>(
    ActionTypes.FETCH_WEB_COMPONENT_CONFIG,
    fetchWebComponentConfigSaga,
  )
  yield takeLatest<Action<UpdateWebComponentConfigParams>>(
    ActionTypes.UPDATE_WEB_COMPONENT_CONFIG,
    updateWebComponentConfigSaga,
  )
}

export const webComponentSagas = function* () {
  yield all([fork(webComponentSagasListen)])
}

export default webComponentSagas
