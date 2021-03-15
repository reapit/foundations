import { put, call, takeLatest, all } from '@redux-saga/core/effects'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchAppRevisionsById, FetchAppRevisionsByIdParams } from '@/services/apps'
import { fork } from 'redux-saga/effects'
import { fetchAppRevisionDetailSuccess, fetchAppRevisionDetail, fetchAppRevisionDetailFailed } from '@/actions/apps'
import { notification } from '@reapit/elements'

export const fetchRevisionDetailSaga = function* ({ data: { id, revisionId } }: Action<FetchAppRevisionsByIdParams>) {
  try {
    const response = yield call(fetchAppRevisionsById, { id, revisionId })
    yield put(fetchAppRevisionDetailSuccess(response))
  } catch (err) {
    yield put(fetchAppRevisionDetailFailed(err?.description || errorMessages.DEFAULT_SERVER_ERROR))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const fetchRevisionDetailDataListen = function* () {
  yield takeLatest<Action<FetchAppRevisionsByIdParams>>(fetchAppRevisionDetail.type, fetchRevisionDetailSaga)
}

const revisionDetailSagas = function* () {
  yield all([fork(fetchRevisionDetailDataListen)])
}

export default revisionDetailSagas
