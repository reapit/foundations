import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { history } from '../core/router'
import Routes from '@/constants/routes'
import { Action } from '@/types/core'
import { forgotPasswordLoading } from '@/actions/forgot-password'
import { resetPassword } from '@reapit/cognito-auth'
import { logger } from 'logger'

export const requestForgotPassword = function*({ data: email }) {
  yield put(forgotPasswordLoading(true))
  try {
    const response = yield call(resetPassword, {
      userName: email,
      cognitoClientId: window.reapit.config.cognitoClientId,
    })
    if (response.CodeDeliveryDetails) {
      yield history.push(`${Routes.FORGOT_PASSWORD}?isSuccess=1`)
    }
  } catch (error) {
    logger(error)
    yield history.push(`${Routes.FORGOT_PASSWORD}?isError=1`)
  } finally {
    yield put(forgotPasswordLoading(false))
  }
}

export const requestForgotPasswordListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.FORGOT_PASSWORD_SUBMIT_EMAIL, requestForgotPassword)
}

const forgotPasswordSagas = function*() {
  yield all([fork(requestForgotPasswordListen)])
}

export default forgotPasswordSagas
