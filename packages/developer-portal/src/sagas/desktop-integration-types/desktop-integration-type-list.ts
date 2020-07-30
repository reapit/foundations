import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchDesktopIntegrationTypeList,
  fetchDesktopIntegrationTypeListSuccess,
  fetchDesktopIntegrationTypeListFailed,
} from '@/actions/desktop-integration-types'
import { logger } from '@reapit/utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { fetchDesktopIntegrationTypeListAPI } from '@/services/desktop-integration-types'

export const fetchDesktopIntegrationTypeListSaga = function*() {
  try {
    const desktopIntegrationTypes = yield call(fetchDesktopIntegrationTypeListAPI, {})
    yield put(fetchDesktopIntegrationTypeListSuccess(desktopIntegrationTypes))
  } catch (err) {
    yield put(fetchDesktopIntegrationTypeListFailed(err))
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchDesktopIntegrationTypeListListen = function*() {
  yield takeLatest<Action<void>>(fetchDesktopIntegrationTypeList.type, fetchDesktopIntegrationTypeListSaga)
}

const DesktopIntegrationTypeListSagas = function*() {
  yield all([fork(fetchDesktopIntegrationTypeListListen)])
}

export default DesktopIntegrationTypeListSagas
