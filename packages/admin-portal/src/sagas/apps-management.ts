import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { appsReceiveData, appsRequestFailure, AppsFeaturedParams, appsSetFormState } from '@/actions/apps-management'
import { selectAppsData } from '@/selector/admin'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import { featureAppById, unfeatureAppById, fetchAppsList } from '@/services/apps'
import { APPS_PER_PAGE } from '@/constants/paginator'

export const appsManagementFetch = function*({ data }) {
  try {
    const response = yield call(fetchAppsList, { ...data, pageSize: APPS_PER_PAGE, pageNumber: data.page })

    yield put(appsReceiveData(response))
  } catch (err) {
    logger(err)
    yield put(appsRequestFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const appsManagementFeatured = function*({ data: { id, isFeatured } }) {
  yield put(appsSetFormState('SUBMITTING'))
  const { data, ...rest } = yield select(selectAppsData)
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
    yield put(appsReceiveData({ ...rest, data: newData }))

    if (isFeatured) {
      yield call(featureAppById, { id })
    } else {
      yield call(unfeatureAppById, { id })
    }

    yield put(appsSetFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(appsSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
    // if error revert back the old store
    yield put(appsReceiveData({ ...rest, data }))
  }
}

export const appsManagementListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.APPS_REQUEST_DATA, appsManagementFetch)
  yield takeLatest<Action<AppsFeaturedParams>>(ActionTypes.APPS_REQUEST_FEATURED, appsManagementFeatured)
}

const appsManagementSagas = function*() {
  yield all([fork(appsManagementListen)])
}

export default appsManagementSagas
