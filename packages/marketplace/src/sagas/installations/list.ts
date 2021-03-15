import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { fetchInstallationsListSuccess, fetchInstallationsListFailed } from '@/actions/installations'
import { fetchInstallationsList, FetchInstallationsListParams } from '@/services/installations'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements'

export const fetchInstallationsListSaga = function* ({ data }) {
  try {
    const response = yield call(fetchInstallationsList, data)
    yield put(fetchInstallationsListSuccess(response))
  } catch (err) {
    yield put(fetchInstallationsListFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const fetchInstallationsListListen = function* () {
  yield takeLatest<Action<FetchInstallationsListParams>>(
    ActionTypes.FETCH_INSTALLATIONS_LIST,
    fetchInstallationsListSaga,
  )
}

export const installationsListSagas = function* () {
  yield all([fork(fetchInstallationsListListen)])
}
