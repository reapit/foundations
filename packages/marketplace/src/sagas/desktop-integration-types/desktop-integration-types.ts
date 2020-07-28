import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import {
  fetchDesktopIntegrationTypesFailure,
  fetchDesktopIntegrationTypesSuccess,
} from '@/actions/desktop-integration-types'
import ActionTypes from '@/constants/action-types'
import {
  fetchDesktopIntegrationTypesApi,
  FetchDesktopIntegrationTypesParams,
} from '@/services/desktop-integration-types'

export const fetchDesktopIntegrationTypes = function*({ data }: Action<FetchDesktopIntegrationTypesParams>) {
  try {
    const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypesApi, { ...data })
    yield put(fetchDesktopIntegrationTypesSuccess(desktopIntegrationTypes))
  } catch (err) {
    yield put(fetchDesktopIntegrationTypesFailure(err.description))
    notification.error({
      message: err.description,
    })
  }
}

export const fetchDesktopIntegrationTypesListen = function*() {
  yield takeLatest<Action<FetchDesktopIntegrationTypesParams>>(
    ActionTypes.FETCH_DESKTOP_INTEGRATION_TYPES,
    fetchDesktopIntegrationTypes,
  )
}

export const desktopIntegrationTypesSagas = function*() {
  yield all([fork(fetchDesktopIntegrationTypesListen)])
}
