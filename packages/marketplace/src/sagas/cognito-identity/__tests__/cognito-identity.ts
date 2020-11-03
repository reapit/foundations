import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { cognitoIdentitySagas, clientPasswordChange, clientPasswordChangeListen } from '../cognito-identity'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { ChangePasswordParams, changePasswordSuccess, changePasswordFailed } from '@/actions/cognito-identity'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { changePasswordService } from '@/services/cognito-identity'

jest.mock('@/core/router', () => ({
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}))
jest.mock('@/services/cognito-identity', () => ({
  changePasswordService: jest.fn().mockResolvedValue('SUCCESS'),
}))

describe('cognitoIdentitySagas', () => {
  describe('clientPasswordChange', () => {
    const data = { currentPassword: '123', password: '456', confirmPassword: '456', email: 'tester@reapit.com' }
    const gen = cloneableGenerator(clientPasswordChange)({
      type: 'CHANGE_PASSWORD',
      data,
    })
    expect(gen.next().value).toEqual(
      call(changePasswordService, {
        password: '123',
        newPassword: '456',
        userName: 'tester@reapit.com',
        connectClientId: window.reapit.config.connectClientId,
      }),
    )

    it('should call API success', () => {
      const clone = gen.clone()
      expect(clone.next('SUCCESS').value).toEqual(put(changePasswordSuccess()))
    })

    it('should fail if API response !== "SUCCESS" ', () => {
      const clone = gen.clone()
      expect(clone.next('').value).toEqual(put(changePasswordFailed('Server error')))
      expect(clone.next().done).toEqual(true)
    })
  })
})

describe('settings thunks', () => {
  describe('clientPasswordChangeListen', () => {
    it('should submit data when called', () => {
      const gen = clientPasswordChangeListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, clientPasswordChange),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('cognitoIdentitySagas', () => {
    it('should listen saga', () => {
      const gen = cognitoIdentitySagas()

      expect(gen.next().value).toEqual(all([fork(clientPasswordChangeListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
