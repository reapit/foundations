import { put, takeLatest, call } from '@redux-saga/core/effects'
import {
  setRequestDeveloperStatusFormStateSuccess,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateFailed,
} from '@/actions/developer-set-status'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import { updateDeveloperById } from '@/services/developers'
/*
 * TODOME(setRequestDeveloperStatusFormStateSaga)
 * *- failure with correct error
 *- notificaion
 */

export const setRequestDeveloperStatusFormStateSaga = function*({ data: dev }) {
  const { callback } = dev
  try {
    if (!dev.id) {
      throw new Error('developerId is not exist')
    }

    yield put(setRequestDeveloperStatusFormStateLoading())

    yield call(updateDeveloperById, { ...dev, companyName: dev.company })

    yield put(setRequestDeveloperStatusFormStateSuccess())
    callback && callback(true)
  } catch (err) {
    logger(err)
    callback && callback(false)
    yield put(setRequestDeveloperStatusFormStateFailed())
  }
}

export const setRequestDeveloperStatusFormStateListen = function*() {
  yield takeLatest<Action<DeveloperModel>>(
    ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE,
    setRequestDeveloperStatusFormStateSaga,
  )
}

export default setRequestDeveloperStatusFormStateListen
