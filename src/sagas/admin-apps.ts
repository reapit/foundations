import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { fetcher, setQueryParams } from '@reapit/elements'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../constants/api'
import {
  adminAppsReceiveData,
  adminAppsRequestFailure,
  AdminAppsParams,
  AdminAppsFeaturedParams,
  adminAppsSetFormState
} from '@/actions/admin-apps'
import { selectAdminAppsData } from '@/selector/admin'
import { AppDetailModel } from '@/types/marketplace-api-schema'

export const adminAppsFetch = function*({ data }) {
  try {
    const response = yield call(fetcher, {
      url: `${URLS.apps}?${setQueryParams({
        ...data,
        pageSize: APPS_PER_PAGE
      })}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
    yield put(adminAppsReceiveData(response))
  } catch (err) {
    yield put(adminAppsRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const adminAppsFeatured = function*({ data: { id, isFeatured } }) {
  try {
    yield put(adminAppsSetFormState('SUBMITTING'))
    const { data } = yield select(selectAdminAppsData)
    const featuredCount = data.filter((item: AppDetailModel) => item.isFeatured).length
    if (isFeatured && featuredCount === 3) {
      yield put(
        errorThrownServer({
          type: 'SERVER',
          message: 'Max 3 featured apps only'
        })
      )
      return
    }

    yield call(fetcher, {
      url: `${URLS.apps}/${id}/feature`,
      api: REAPIT_API_BASE_URL,
      body: isFeatured ? { isFeatured } : undefined,
      method: isFeatured ? 'PUT' : 'DELETE',
      headers: MARKETPLACE_HEADERS
    })

    yield put(adminAppsSetFormState('SUCCESS'))
  } catch (err) {
    yield put(adminAppsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const adminAppsListen = function*() {
  yield takeLatest<Action<AdminAppsParams>>(ActionTypes.ADMIN_APPS_REQUEST_DATA, adminAppsFetch)
  yield takeLatest<Action<AdminAppsFeaturedParams>>(ActionTypes.ADMIN_APPS_REQUEST_FEATURED, adminAppsFeatured)
}

const adminAppsSagas = function*() {
  yield all([fork(adminAppsListen)])
}

export default adminAppsSagas
