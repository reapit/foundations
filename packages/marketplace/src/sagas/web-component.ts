import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import {
  fetchWebComponentConfig,
  FetchWebComponentConfigParams,
  PutWebComponentConfigParams,
  putWebComponentConfig,
} from '@/services/web-component'
import errorMessages from '../../../elements/src/utils/validators/error-messages'
import { errorThrownServer } from '@/actions/error'
import {
  clientFetchWebComponentConfigSuccess,
  clientCloseWebComponentConfig,
  clientFetchNegotiatorsSuccess,
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
    yield put(clientCloseWebComponentConfig())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const putWebComponentConfigSaga = function*({ data }: Action<PutWebComponentConfigParams>) {
  try {
    const respone = yield call(putWebComponentConfig, data)
    yield put(clientFetchWebComponentConfigSuccess(respone))
  } catch (err) {
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
export const putWebComponentConfigListen = function*() {
  yield takeLatest<Action<PutWebComponentConfigParams>>(
    ActionTypes.CLIENT_PUT_WEB_COMPONENT_CONFIG,
    putWebComponentConfigSaga,
  )
}

const webComponentSagas = function*() {
  yield all([fork(fetchWebComponentConfigListen), fork(putWebComponentConfigListen)])
}

export default webComponentSagas
