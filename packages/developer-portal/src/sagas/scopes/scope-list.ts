import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchScopeList, fetchScopeListSuccess, fetchScopeListFailed } from '@/actions/scopes'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchScopeListAPI } from '@/services/scopes'
import { notification } from '@reapit/elements'

export const fetchScopeListSaga = function* () {
  try {
    const scopes = yield call(fetchScopeListAPI)
    yield put(fetchScopeListSuccess(scopes))
  } catch (err) {
    yield put(fetchScopeListFailed(err))
    notification.error({
      message: errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchScopeListListen = function* () {
  yield takeLatest<Action<void>>(fetchScopeList.type, fetchScopeListSaga)
}

const scopeListSagas = function* () {
  yield all([fork(fetchScopeListListen)])
}

export default scopeListSagas
