import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import settingsSagas, { clientPasswordChange, clientPasswordChangeListen } from '../settings'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { ChangePasswordParams, settingLoadingVisibility } from '@/actions/settings'
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

describe('settings', () => {
  describe('clientPasswordChange', () => {
    const data = { currentPassword: '123', password: '456', confirmPassword: '456', email: 'tester@reapit.com' }
    const gen = cloneableGenerator(clientPasswordChange)({
      type: 'CHANGE_PASSWORD',
      data,
    })
    expect(gen.next().value).toEqual(put(settingLoadingVisibility(true)))
    // expect(gen.next().value).toEqual(select(selectDeveloperEmail))

    it('should call API success', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(
        call(changePasswordService, {
          password: '123',
          newPassword: '456',
          userName: 'tester@reapit.com',
          cognitoClientId: window.reapit.config.cognitoClientId || '',
        }),
      )
    })

    it('should fail if API response !== "SUCCESS" ', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(
        call(changePasswordService, {
          password: '123',
          newPassword: '456',
          userName: 'tester@reapit.com',
          cognitoClientId: window.reapit.config.cognitoClientId || '',
        }),
      )
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw({ message: 'error message' }).value).toEqual(put(settingLoadingVisibility(false)))
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

  describe('settingsSagas', () => {
    it('should listen saga', () => {
      const gen = settingsSagas()

      expect(gen.next().value).toEqual(all([fork(clientPasswordChangeListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
