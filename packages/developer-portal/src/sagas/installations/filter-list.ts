import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { fetchInstallationsFilterListSuccess, fetchInstallationsFilterListFailed } from '@/actions/installations'
import { logger } from '@reapit/utils'
import { fetchInstallationsList, FetchInstallationsListParams } from '@/services/installations'
import { getDeveloperId } from '@/utils/session'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'

export const fetchInstallationsFilterListSaga = function*({ data }) {
  try {
    const developerId = yield getDeveloperId()
    const response = yield call(fetchInstallationsList, { ...data, developerId })
    yield put(fetchInstallationsFilterListSuccess(response))
  } catch (err) {
    logger(err)
    yield put(fetchInstallationsFilterListFailed())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchInstallationsFilterListListen = function*() {
  yield takeLatest<Action<FetchInstallationsListParams>>(
    ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST,
    fetchInstallationsFilterListSaga,
  )
}

export const fetchInstallationsFilterListSagas = function*() {
  yield all([fork(fetchInstallationsFilterListListen)])
}

export default fetchInstallationsFilterListSagas
