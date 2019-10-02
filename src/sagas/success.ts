import { submitCompleteSetFormState } from '../actions/success'
import { put, fork, all, takeLatest, delay } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'

export const submitComplete = function*() {
  yield put(submitCompleteSetFormState('SUBMITTING'))
  try {
    yield delay(2000)
    yield put(submitCompleteSetFormState('SUCCESS'))
  } catch (err) {
    console.error(err)
    yield put(submitCompleteSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitCompleteListen = function*() {
  yield takeLatest<Action<void>>(ActionTypes.SUBMIT_COMPLETE, submitComplete)
}

export const submitCompleteSagas = function*() {
  yield all([fork(submitCompleteListen)])
}

export default submitCompleteSagas
