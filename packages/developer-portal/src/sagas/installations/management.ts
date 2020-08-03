import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { UninstallParams, InstallParams } from '@/actions/app-installations'
import { logger } from '@reapit/utils'
import { createInstallation, removeAccessToAppById } from '@/services/installations'
import { getClientId, getLoggedUserEmail } from '@/utils/session'
import { setInstallationsFormState } from '@/actions/installations'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'

export const createInstallationSaga = function*(options) {
  const data: InstallParams = options.data
  try {
    yield put(setInstallationsFormState('SUBMITTING'))

    const email = yield getLoggedUserEmail()
    const clientId = yield getClientId()

    if (!clientId) {
      throw new Error('ClientId not exist')
    }

    yield call(createInstallation, { ...data, clientId, approvedBy: email })
    if (data.callback) {
      data.callback()
    }
    yield put(setInstallationsFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(setInstallationsFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const requestInstallationTerminateSaga = function*(options) {
  const data: UninstallParams = options.data
  try {
    yield put(setInstallationsFormState('SUBMITTING'))
    const email = yield getLoggedUserEmail()

    yield call(removeAccessToAppById, { ...data, terminatedBy: email })
    if (data.callback) {
      data.callback()
    }
    yield put(setInstallationsFormState('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(setInstallationsFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const managementInstallationsListen = function*() {
  yield takeLatest<Action<UninstallParams>>(
    ActionTypes.REQUEST_INSTALLATIONS_TERMINATE,
    requestInstallationTerminateSaga,
  )
  yield takeLatest<Action<InstallParams>>(ActionTypes.CREATE_INSTALLATIONS, createInstallationSaga)
}

export const managementInstallationsSagas = function*() {
  yield all([fork(managementInstallationsListen)])
}

export default managementInstallationsSagas
