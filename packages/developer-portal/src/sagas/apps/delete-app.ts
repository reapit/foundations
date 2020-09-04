import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import errorMessages from '@/constants/error-messages'
import { deleteAppById, DeleteAppByIdParams } from '@/services/apps'
import { deleteAppSuccess, deleteAppFailed, deleteApp } from '@/actions/apps'
import { notification } from '@reapit/elements'

export const deleteAppSaga = function*({ data: { successCallback, id } }: Action<DeleteAppByIdParams>) {
  try {
    yield call(deleteAppById, { id })
    yield put(deleteAppSuccess())
    if (successCallback) {
      successCallback()
    }
  } catch (err) {
    yield put(deleteAppFailed())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const deleteAppSagaListen = function*() {
  yield takeLatest<Action<DeleteAppByIdParams>>(deleteApp.type, deleteAppSaga)
}

export const deleteAppSagas = function*() {
  yield all([fork(deleteAppSagaListen)])
}

export default deleteAppSagas
