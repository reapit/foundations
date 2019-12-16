import { fetcher } from '@reapit/elements'
import { MARKETPLACE_HEADERS } from '../constants/api'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { history } from '../core/router'
import Routes from '@/constants/routes'
import { Action } from '@/types/core'
import { forgotPasswordLoading } from '@/actions/forgot-password'

export const callAPIForgotPassword = async email => {
  const FORGOT_PASSWORD_URL = '/password/reset'
  const response = await fetcher({
    url: FORGOT_PASSWORD_URL,
    // please refer to this ticket https://reapit.atlassian.net/browse/CLD-620
    api: 'https://rbsbshnxvb.execute-api.eu-west-2.amazonaws.com/dev/api',
    method: 'POST',
    headers: MARKETPLACE_HEADERS,
    body: {
      userName: email
    }
  })
  return response
}

export const requestForgotPassword = function*({ data: email }) {
  yield put(forgotPasswordLoading(true))
  try {
    const response = yield call(callAPIForgotPassword, email)
    if (response.CodeDeliveryDetails) {
      yield history.push(`${Routes.FORGOT_PASSWORD}?isSuccess=1`)
    }
  } catch (error) {
    console.error(error.message)
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
