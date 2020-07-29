import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { fetchCategoryList, fetchCategoryListSuccess, fetchCategoryListFailed } from '@/actions/categories'
import { logger } from '@reapit/utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchCategoryListAPI } from '@/services/categories'

export const fetchCategoryListSaga = function*() {
  try {
    const categories = yield call(fetchCategoryListAPI, {})
    yield put(fetchCategoryListSuccess(categories))
  } catch (err) {
    yield put(fetchCategoryListFailed(err))
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchCategoryListListen = function*() {
  yield takeLatest<Action<void>>(fetchCategoryList.type, fetchCategoryListSaga)
}

const categoryListSagas = function*() {
  yield all([fork(fetchCategoryListListen)])
}

export default categoryListSagas
