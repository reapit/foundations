import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { fetchAppListSuccess, fetchAppListFailed, AppsFeaturedParams } from '@/actions/apps-management'
import { selectAppsData } from '@/selector/admin'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import { featureAppById, unfeatureAppById, fetchAppsList } from '@/services/apps'
import { APPS_PER_PAGE } from '@/constants/paginator'

export const appsManagementFetch = function*({ data }) {
  try {
    const response = yield call(fetchAppsList, { ...data, pageSize: APPS_PER_PAGE, pageNumber: data.page })

    yield put(fetchAppListSuccess(response))
  } catch (err) {
    logger(err)
    yield put(fetchAppListFailed())
  }
}

export const appsManagementFeatured = function*({ data: { id, isFeatured } }) {
  const { data, ...rest } = yield select(selectAppsData)
  try {
    const featuredCount = data.filter((item: AppDetailModel) => item.isFeatured).length
    if (isFeatured && featuredCount === 3) {
      return
    }

    // update store first after changing isFeatured field
    const newData = data.map(d => ({ ...d, isFeatured: d.id === id ? isFeatured : d.isFeatured }))
    yield put(fetchAppListSuccess({ ...rest, data: newData }))

    if (isFeatured) {
      yield call(featureAppById, { id })
    } else {
      yield call(unfeatureAppById, { id })
    }
  } catch (err) {
    logger(err)

    // if error revert back the old store
    yield put(fetchAppListSuccess({ ...rest, data }))
  }
}

export const appsManagementListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.FETCH_APP_LIST, appsManagementFetch)
  yield takeLatest<Action<AppsFeaturedParams>>(ActionTypes.REQUEST_MARK_APP_AS_FEATURED, appsManagementFeatured)
}

const appsManagementSagas = function*() {
  yield all([fork(appsManagementListen)])
}

export default appsManagementSagas
