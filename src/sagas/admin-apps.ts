import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { fetcher, setQueryParams } from '@reapit/elements'
import { Action } from '@/types/core'
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
      api: process.env.MARKETPLACE_API_BASE_URL as string,
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
  yield put(adminAppsSetFormState('SUBMITTING'))
  const { data, ...rest } = yield select(selectAdminAppsData)
  try {
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

    // update store first after changing isFeatured field
    const newData = data.map(d => ({ ...d, isFeatured: d.id === id ? isFeatured : d.isFeatured }))
    yield put(adminAppsReceiveData({ ...rest, data: newData }))

    yield call(fetcher, {
      url: `${URLS.apps}/${id}/feature`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
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
    // if error revert back the old store
    yield put(adminAppsReceiveData({ ...rest, data }))
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
