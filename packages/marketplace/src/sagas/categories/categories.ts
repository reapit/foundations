import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import { fetchCategoriesFailed, fetchCategoriesSuccess } from '@/actions/categories'
import ActionTypes from '@/constants/action-types'
import { fetchCategoriesApi, FetchCategoriesParams } from '@/services/categories'

export const fetchCategories = function* ({ data }: Action<FetchCategoriesParams>) {
  try {
    const desktopIntegrationTypes = yield call(fetchCategoriesApi, { ...data })
    yield put(fetchCategoriesSuccess(desktopIntegrationTypes))
  } catch (err) {
    yield put(fetchCategoriesFailed(err.description))
    notification.error({
      message: err.description,
      placement: 'bottomRight',
    })
  }
}

export const fetchCategoriesListen = function* () {
  yield takeLatest<Action<FetchCategoriesParams>>(ActionTypes.FETCH_CATEGORIES, fetchCategories)
}

export const categoriesSagas = function* () {
  yield all([fork(fetchCategoriesListen)])
}
