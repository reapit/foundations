import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import {
  fetchWebComponentConfig,
  FetchWebComponentConfigParams,
  UpdateWebComponentConfigParams,
  updateWebComponentConfig,
} from '@/services/web-component'
import errorMessages from '../../../elements/src/utils/validators/error-messages'
import { errorThrownServer } from '@/actions/error'
import {
  clientFetchWebComponentConfigSuccess,
  clientFetchNegotiatorsSuccess,
  clientFetchWebComponentConfigFailed,
  clientUpdateWebComponentConfigFailed,
} from '@/actions/client'
import { fetchNegotiators } from '@/services/negotiators'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'

export const fetchWebComponentConfigSaga = function*({ data }: Action<FetchWebComponentConfigParams>) {
  try {
    const [webComponentConfig, negotiators] = yield all([
      call(fetchWebComponentConfig, data),
      call(fetchNegotiators, { pageSize: GET_ALL_PAGE_SIZE }),
    ])
    if (webComponentConfig.message) throw Error(webComponentConfig.message)
    yield put(clientFetchWebComponentConfigSuccess(webComponentConfig))
    yield put(clientFetchNegotiatorsSuccess(negotiators))
  } catch (err) {
    yield put(clientFetchWebComponentConfigFailed())
  }
}

export const updateWebComponentConfigSaga = function*({ data }: Action<UpdateWebComponentConfigParams>) {
  try {
    const { callback, ...restParams } = data
    const respone = yield call(updateWebComponentConfig, restParams)
    yield put(clientFetchWebComponentConfigSuccess(respone))
    callback && callback()
  } catch (err) {
    yield put(clientUpdateWebComponentConfigFailed())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchWebComponentConfigListen = function*() {
  yield takeLatest<Action<FetchWebComponentConfigParams>>(
    ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG,
    fetchWebComponentConfigSaga,
  )
}
export const updateWebComponentConfigListen = function*() {
  yield takeLatest<Action<UpdateWebComponentConfigParams>>(
    ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG,
    updateWebComponentConfigSaga,
  )
}

const webComponentSagas = function*() {
  yield all([fork(fetchWebComponentConfigListen), fork(updateWebComponentConfigListen)])
}

export default webComponentSagas
