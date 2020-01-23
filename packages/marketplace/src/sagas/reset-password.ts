import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { fetcher } from '@reapit/elements'
import { MARKETPLACE_HEADERS } from '@/constants/api'
import { resetPasswordLoading, ResetPasswordParams } from '@/actions/reset-password'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { errorThrownServer } from '@/actions/error'
import Routes from '@/constants/routes'
import { history } from '@/core/router'
import { confirmPassword } from '@reapit/cognito-auth'

export const developerResetPassword = function*({ data }: Action<ResetPasswordParams>) {
  yield put(resetPasswordLoading(true))
  try {
    const response = yield call(confirmPassword, {
      newPassword: data.password,
      userName: data.email,
      verificationCode: data.verificationCode
    })
    const isSuccess = response === 'SUCCESS'
    if (isSuccess) {
      yield history.push(`${Routes.DEVELOPER_LOGIN}?isChangePasswordSuccess=1`)
    }
  } catch (error) {
    console.error(error.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  } finally {
    yield put(resetPasswordLoading(false))
  }
}

export const developerResetPasswordListen = function*() {
  yield takeLatest<Action<ResetPasswordParams>>(ActionTypes.RESET_PASSWORD, developerResetPassword)
}

const resetPasswordSagas = function*() {
  yield all([fork(developerResetPasswordListen)])
}

export default resetPasswordSagas
