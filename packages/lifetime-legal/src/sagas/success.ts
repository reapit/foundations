import { submitCompleteSetFormState } from '../actions/success'
import { put, fork, all, takeLatest, delay, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { DynamicLinkParams, navigateDynamicApp } from '@reapit/elements'
import { logger } from 'logger'

export const submitComplete = function*({
  data: { dynamicLinkParams },
}: Action<{ id: string; dynamicLinkParams: DynamicLinkParams }>) {
  yield put(submitCompleteSetFormState('SUBMITTING'))
  try {
    yield delay(2000)
    yield put(submitCompleteSetFormState('SUCCESS'))
    yield call(navigateDynamicApp, dynamicLinkParams)
  } catch (err) {
    logger(err)
    yield put(submitCompleteSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const submitCompleteListen = function*() {
  yield takeLatest<Action<{ id: string; dynamicLinkParams: DynamicLinkParams }>>(
    ActionTypes.SUBMIT_COMPLETE,
    submitComplete,
  )
}

export const submitCompleteSagas = function*() {
  yield all([fork(submitCompleteListen)])
}

export default submitCompleteSagas
