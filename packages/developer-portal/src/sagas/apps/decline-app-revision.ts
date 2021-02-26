import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { rejectAppRevisionById, RejectAppRevisionByIdParams } from '@/services/apps'
import { declineAppRevisionSuccess, declineAppRevisionFailed, declineAppRevision } from '@/actions/apps'
import { notification } from '@reapit/elements'

export const declineAppRevisionSaga = function* ({
  data: { successCallback, ...body },
}: Action<RejectAppRevisionByIdParams>) {
  try {
    yield call(rejectAppRevisionById, body)
    yield put(declineAppRevisionSuccess())
    if (successCallback) {
      successCallback()
    }
  } catch (err) {
    yield put(declineAppRevisionFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const declineAppRevisionSagaListen = function* () {
  yield takeLatest<Action<RejectAppRevisionByIdParams>>(declineAppRevision.type, declineAppRevisionSaga)
}

export const declineAppRevisionSagas = function* () {
  yield all([fork(declineAppRevisionSagaListen)])
}

export default declineAppRevisionSagas
