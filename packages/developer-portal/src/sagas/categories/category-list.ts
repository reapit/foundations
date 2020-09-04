import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchCategoryList, fetchCategoryListSuccess, fetchCategoryListFailed } from '@/actions/categories'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchCategoryListAPI } from '@/services/categories'
import { notification } from '@reapit/elements'

export const fetchCategoryListSaga = function*() {
  try {
    const categories = yield call(fetchCategoryListAPI, {})
    yield put(fetchCategoryListSuccess(categories))
  } catch (err) {
    yield put(fetchCategoryListFailed(err))
    notification.error({
      message: errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchCategoryListListen = function*() {
  yield takeLatest<Action<void>>(fetchCategoryList.type, fetchCategoryListSaga)
}

const categoryListSagas = function*() {
  yield all([fork(fetchCategoryListListen)])
}

export default categoryListSagas
