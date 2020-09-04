import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { fetchAppList, fetchAppListSuccess, fetchAppListFailed } from '@/actions/apps'
import { fetchAppsListAPI } from '@/services/apps'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { FetchAppListParams } from '@/reducers/apps/app-list'
import { Action } from '@/types/core'
import { getDeveloperId } from '@/utils/session'

export const fetchAppListSaga = function*({ data }) {
  try {
    const developerId = yield call(getDeveloperId)
    if (!developerId) {
      return
    }
    const { page, appsPerPage = APPS_PER_PAGE } = data
    const appsData = yield call(fetchAppsListAPI, {
      developerId: [developerId],
      pageNumber: page,
      pageSize: appsPerPage,
    })
    yield put(fetchAppListSuccess(appsData))
  } catch (err) {
    yield put(fetchAppListFailed(err))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchAppListListen = function*() {
  yield takeLatest<Action<FetchAppListParams>>(fetchAppList.type, fetchAppListSaga)
}

const appListSagas = function*() {
  yield all([fork(fetchAppListListen)])
}

export default appListSagas
