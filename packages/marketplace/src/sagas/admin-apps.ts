import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import {
  adminAppsReceiveData,
  adminAppsRequestFailure,
  AdminAppsFeaturedParams,
  adminAppsSetFormState,
} from '@/actions/admin-apps'
import { selectAdminAppsData } from '@/selector/admin'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import { featureAppById, unfeatureAppById, fetchAppsList } from '@/services/apps'
import { APPS_PER_PAGE } from '@/constants/paginator'

export const adminAppsFetch = function*({ data }) {
  try {
    const response = yield call(fetchAppsList, { ...data, pageSize: APPS_PER_PAGE })

    yield put(adminAppsReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(adminAppsRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
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
          message: 'Max 3 featured apps only',
        }),
      )
      return
    }

    // update store first after changing isFeatured field
    const newData = data.map(d => ({ ...d, isFeatured: d.id === id ? isFeatured : d.isFeatured }))
    yield put(adminAppsReceiveData({ ...rest, data: newData }))

    if (isFeatured) {
      yield call(featureAppById, { id })
    } else {
      yield call(unfeatureAppById, { id })
    }

    yield put(adminAppsSetFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(adminAppsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
    // if error revert back the old store
    yield put(adminAppsReceiveData({ ...rest, data }))
  }
}

export const adminAppsListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.ADMIN_APPS_REQUEST_DATA, adminAppsFetch)
  yield takeLatest<Action<AdminAppsFeaturedParams>>(ActionTypes.ADMIN_APPS_REQUEST_FEATURED, adminAppsFeatured)
}

const adminAppsSagas = function*() {
  yield all([fork(adminAppsListen)])
}

export default adminAppsSagas
