import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchScopeList, fetchScopeListSuccess, fetchScopeListFailed } from '@/actions/scopes'
import { logger } from '@reapit/utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchScopeListAPI } from '@/services/scopes'

export const fetchScopeListSaga = function*() {
  try {
    const scopes = yield call(fetchScopeListAPI)
    yield put(fetchScopeListSuccess(scopes))
  } catch (err) {
    yield put(fetchScopeListFailed(err))
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchScopeListListen = function*() {
  yield takeLatest<Action<void>>(fetchScopeList.type, fetchScopeListSaga)
}

const scopeListSagas = function*() {
  yield all([fork(fetchScopeListListen)])
}

export default scopeListSagas
