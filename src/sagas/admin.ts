// import fetcher from '../utils/fetcher'
// import { URLS } from '../constants/api'
import { adminLoading, adminReceiveRevisions } from '../actions/admin'
import { put, delay, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { AppRevisionModel } from '../types/marketplace-api-schema'

export const mockMyAppRevisions: AppRevisionModel[] = []

export const appRevisionsFetch = function*() {
  yield put(adminLoading(true))

  try {
    yield delay(1000)
    yield put(adminReceiveRevisions(mockMyAppRevisions))
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appRevisionsDataListen = function*() {
  yield takeLatest(ActionTypes.ADMIN_REQUEST_REVISIONS, appRevisionsFetch)
}

const adminSagas = function*() {
  yield all([fork(appRevisionsDataListen)])
}

export default adminSagas
