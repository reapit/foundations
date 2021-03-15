import { put, takeLatest, call } from '@redux-saga/core/effects'
import {
  setRequestDeveloperStatusFormStateSuccess,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateFailed,
} from '@/actions/developer-set-status'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { extractNetworkErrString } from '@reapit/utils'
import { updateDeveloperById } from '@/services/developers'
import { notification } from '@reapit/elements'

export const DEVELOPER_ID_NOT_EXIST = 'developerId is not exist'
export const setRequestDeveloperStatusFormStateSaga = function* ({ data: dev }) {
  const { callback } = dev
  try {
    if (!dev.id) {
      throw DEVELOPER_ID_NOT_EXIST
    }

    yield put(setRequestDeveloperStatusFormStateLoading())

    yield call(updateDeveloperById, { ...dev, companyName: dev.company })

    yield put(setRequestDeveloperStatusFormStateSuccess())
    callback && callback(true)
  } catch (err) {
    callback && callback(false)
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
    })
    yield put(setRequestDeveloperStatusFormStateFailed())
  }
}

export const setRequestDeveloperStatusFormStateListen = function* () {
  yield takeLatest<Action<DeveloperModel>>(
    ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE,
    setRequestDeveloperStatusFormStateSaga,
  )
}

export default setRequestDeveloperStatusFormStateListen
