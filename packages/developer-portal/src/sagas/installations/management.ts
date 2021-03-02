import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { UninstallParams, InstallParams } from '@/actions/installations'
import {
  createInstallation,
  CreateInstallationParams,
  removeAccessToAppById,
  RemoveAccessToAppByIdParams,
} from '@/services/installations'
import { getClientId, getLoggedUserEmail } from '@/utils/session'
import { setInstallationsFormState } from '@/actions/installations'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { notification } from '@reapit/elements'

export const createInstallationSaga = function* (options) {
  const data: InstallParams = options.data
  try {
    yield put(setInstallationsFormState('SUBMITTING'))

    const email = yield getLoggedUserEmail()
    const clientId = yield getClientId()

    if (!clientId) {
      const error = {
        description: 'ClientId not exist',
      }
      throw error
    }

    yield call(createInstallation, { ...data, clientId, approvedBy: email } as CreateInstallationParams)
    if (data.callback) {
      data.callback()
    }
    yield put(setInstallationsFormState('SUCCESS'))
  } catch (err) {
    yield put(setInstallationsFormState('ERROR'))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const requestInstallationTerminateSaga = function* (options) {
  const data: UninstallParams = options.data
  try {
    yield put(setInstallationsFormState('SUBMITTING'))
    const email = yield getLoggedUserEmail()

    yield call(removeAccessToAppById, { ...data, terminatedBy: email } as RemoveAccessToAppByIdParams)
    yield put(setInstallationsFormState('SUCCESS'))

    data.callback && data.callback()
  } catch (err) {
    yield put(setInstallationsFormState('ERROR'))
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const managementInstallationsListen = function* () {
  yield takeLatest<Action<UninstallParams>>(
    ActionTypes.REQUEST_INSTALLATIONS_TERMINATE,
    requestInstallationTerminateSaga,
  )
  yield takeLatest<Action<InstallParams>>(ActionTypes.CREATE_INSTALLATIONS, createInstallationSaga)
}

export const managementInstallationsSagas = function* () {
  yield all([fork(managementInstallationsListen)])
}

export default managementInstallationsSagas
