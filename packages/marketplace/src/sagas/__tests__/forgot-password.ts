import forgotPasswordSagas, { requestForgotPasswordListen, requestForgotPassword } from '../forgot-password'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { forgotPasswordLoading } from '@/actions/forgot-password'
import { history } from '@/core/router'
import Routes from '@/constants/routes'
import { resetPassword } from '@reapit/cognito-auth'

jest.mock('@reapit/cognito-auth')

describe('requestForgotPassword', () => {
  process.env.COGNITO_CLIENT_ID_MARKETPLACE = 'cognitoClientId'
  const gen = cloneableGenerator(requestForgotPassword)({ data: 'abc@gmail.com' })
  expect(gen.next().value).toEqual(put(forgotPasswordLoading(true)))
  expect(gen.next().value).toEqual(
    call(resetPassword, { userName: 'abc@gmail.com', cognitoClientId: 'cognitoClientId' }),
  )

  it('should call API success', () => {
    const clone = gen.clone()
    expect(clone.next({ CodeDeliveryDetails: {} }).value).toEqual(history.push(`${Routes.FORGOT_PASSWORD}?isSuccess=1`))
    expect(clone.next().value).toEqual(put(forgotPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })

  it('dont do anything, set loading to false if result not correct', () => {
    const clone = gen.clone()
    expect(clone.next({ CodeDeliveryDetails: undefined }).value).toEqual(put(forgotPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })

  it('should call API failed', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Client id is not exists')).value).toEqual(
      history.push(`${Routes.FORGOT_PASSWORD}?isError=1`),
    )
    expect(clone.next().value).toEqual(put(forgotPasswordLoading(false)))
    expect(clone.next().done).toEqual(true)
  })
})

describe('forgot-password thunks', () => {
  describe('requestForgotPasswordListen', () => {
    it('should request data when called', () => {
      const gen = requestForgotPasswordListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.FORGOT_PASSWORD_SUBMIT_EMAIL, requestForgotPassword),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('forgotPasswordSagas', () => {
    it('should listen request data', () => {
      const gen = forgotPasswordSagas()

      expect(gen.next().value).toEqual(all([fork(requestForgotPasswordListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
