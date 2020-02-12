import { submitChecksSetFormState } from '../actions/submit-checks'
import { put, fork, all, takeLatest, delay } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import routes from '@/constants/routes'
import { history } from '@/core/router'
import { logger } from 'logger'

export const submitCheck = function*({ data: id }: Action<string>) {
  yield put(submitChecksSetFormState('SUBMITTING'))
  try {
    yield delay(2000)
    yield put(submitChecksSetFormState('SUCCESS'))
    yield history.push(routes.PROFILE_SUCCESS.replace(':id', id))
  } catch (err) {
    logger(err)
    yield put(submitChecksSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const submitCheckListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.SUBMIT_CHECKS, submitCheck)
}

export const submitCheckSagas = function*() {
  yield all([fork(submitCheckListen)])
}

export default submitCheckSagas
