import { cloneableGenerator } from '@redux-saga/testing-utils'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { ResetPasswordParams, resetPasswordLoading } from '@/actions/reset-password'
import { history } from '@/core/router'
import resetPasswordSagas, { developerResetPassword, developerResetPasswordListen } from '../reset-password'
import Routes from '@/constants/routes'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { confirmPassword } from '@reapit/cognito-auth'

jest.mock('@reapit/cognito-auth')

describe('developerResetPassword', () => {
  const gen = cloneableGenerator(developerResetPassword)({
    type: 'RESET_PASSWORD',
    data: { password: '123', email: '123@gmail.com', verificationCode: '123', confirmPassword: '123' },
  })
  expect(gen.next().value).toEqual(put(resetPasswordLoading(true)))

  it('should call API success', () => {
    const clone = gen.clone()
    const body = { newPassword: '123', userName: '123@gmail.com', verificationCode: '123' }
    expect(clone.next().value).toEqual(call(confirmPassword, body))
    expect(clone.next('SUCCESS').value).toEqual(history.push(`${Routes.DEVELOPER_LOGIN}?isChangePasswordSuccess=1`))
    expect(clone.next().value).toEqual(put(resetPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })

  it('should do nothing and set loading to false when message is not SUCCESS', () => {
    const clone = gen.clone()
    const body = { newPassword: '123', userName: '123@gmail.com', verificationCode: '123' }
    expect(clone.next().value).toEqual(call(confirmPassword, body))
    expect(clone.next(undefined).value).toEqual(put(resetPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })

  it('should call API fail', () => {
    const clone = gen.clone()
    const body = { newPassword: '123', userName: '123@gmail.com', verificationCode: '123' }
    expect(clone.next().value).toEqual(call(confirmPassword, body))
    // @ts-ignore
    expect(clone.throw(new Error('123')).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(resetPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })
})

describe('reset-password thunks', () => {
  describe('developerResetPasswordListen', () => {
    it('should submit data when called', () => {
      const gen = developerResetPasswordListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ResetPasswordParams>>(ActionTypes.RESET_PASSWORD, developerResetPassword),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('resetPasswordSagas', () => {
    it('should listen saga', () => {
      const gen = resetPasswordSagas()

      expect(gen.next().value).toEqual(all([fork(developerResetPasswordListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
