import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import {
  appUninstallRequestSuccess,
  appUninstallRequestDataFailure,
  appUninstallLoading
} from '@/actions/app-uninstall'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { selectAppDetailId, selectAppDetailInstallationId } from '@/selector/app-detail'
import { selectLoggedUserEmail } from '@/selector/client'

export const appUninstallSaga = function*() {
  try {
    yield put(appUninstallLoading())
    const appId = yield select(selectAppDetailId)
    const email = yield select(selectLoggedUserEmail)
    const installationId = yield select(selectAppDetailInstallationId)

    if (!installationId) {
      throw new Error('installationId does not exist')
    }

    const body = {
      appId,
      terminatedBy: email,
      terminatedReason: 'User uninstall'
    }

    yield call(fetcher, {
      url: `${URLS.installations}/${installationId}/terminate`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      headers: MARKETPLACE_HEADERS,
      body
    })
    yield put(appUninstallRequestSuccess())
  } catch (err) {
    yield put(appUninstallRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const appUninstallDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.APP_UNINSTALL_REQUEST_DATA, appUninstallSaga)
}

export const appUninstallSagas = function*() {
  yield all([fork(appUninstallDataListen)])
}

export default appUninstallSagas
