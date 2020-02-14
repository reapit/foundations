import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import settingsSagas, {
  developerInformationFetchListen,
  developerInformationFetch,
  developerInformationChangeListen,
  developerInfomationChange,
  developerPasswordChange,
  developerPasswordChangeListen,
  fetchDeveloperInfo,
  updateDeveloperInfo,
} from '../settings'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { ChangePasswordParams, settingShowLoading, requestDeveloperDataSuccess } from '@/actions/settings'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { selectDeveloperId, selectDeveloperEmail } from '@/selector/developer'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import messages from '@/constants/messages'
import { developerStub } from '../__stubs__/developer'
import { removeSession, changePassword } from '@reapit/cognito-auth'
import { authLogout } from '@/actions/auth'
import { showNotificationMessage } from '@/actions/notification-message'

jest.mock('@reapit/elements')
jest.mock('../../core/router', () => ({
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}))

describe('settings', () => {
  describe('developerInformationFetch', () => {
    const gen = cloneableGenerator(developerInformationFetch)()
    expect(gen.next().value).toEqual(put(settingShowLoading(true)))
    expect(gen.next().value).toEqual(select(selectDeveloperId))
    it('should return', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })
    expect(gen.next('123').value).toEqual(call(fetchDeveloperInfo, '123'))
    it('should call api success', () => {
      const clone = gen.clone()
      expect(clone.next({}).value).toEqual(put(requestDeveloperDataSuccess({})))
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
    })
    test('api call error', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })
  })

  describe('developerInfomationChange', () => {
    const gen = cloneableGenerator(developerInfomationChange)({
      type: 'SETTING_UPDATE_DEVELOPER',
      data: { company: '123' },
    })
    expect(gen.next().value).toEqual(put(settingShowLoading(true)))
    expect(gen.next().value).toEqual(select(selectDeveloperId))
    it('should call api success', () => {
      const clone = gen.clone()
      expect(clone.next('123').value).toEqual(
        call(updateDeveloperInfo, { developerId: '123', values: { company: '123' } }),
      )
      expect(clone.next({ message: 'SUCCESS' }).value).toEqual(
        put(
          showNotificationMessage({
            variant: 'info',
            message: messages.CHANGE_SAVE_SUCCESSFULLY,
          }),
        ),
      )
      expect(clone.next({ message: 'SUCCESS' }).value).toEqual(call(fetchDeveloperInfo, '123'))
      expect(clone.next(developerStub).value).toEqual(put(requestDeveloperDataSuccess(developerStub)))
    })

    it('should return when no developerId', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })

    it('should call api not success', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })
  })

  describe('developerPasswordChange', () => {
    const data = { currentPassword: '123', password: '456', confirmPassword: '456' }
    const gen = cloneableGenerator(developerPasswordChange)({
      type: 'CHANGE_PASSWORD',
      data,
    })
    expect(gen.next().value).toEqual(put(settingShowLoading(true)))
    expect(gen.next().value).toEqual(select(selectDeveloperEmail))

    it('should call API success', () => {
      const clone = gen.clone()
      expect(clone.next('abc@gmail.com').value).toEqual(
        call(changePassword, {
          password: '123',
          newPassword: '456',
          userName: 'abc@gmail.com',
          cognitoClientId: process.env.COGNITO_CLIENT_ID_MARKETPLACE || '',
        }),
      )
      expect(clone.next('SUCCESS').value).toEqual(call(removeSession))
      expect(clone.next().value).toEqual(put(authLogout()))
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })

    it('should fail if API response !== "SUCCESS" ', () => {
      const clone = gen.clone()
      expect(clone.next('abc@gmail.com').value).toEqual(
        call(changePassword, {
          password: '123',
          newPassword: '456',
          userName: 'abc@gmail.com',
          cognitoClientId: process.env.COGNITO_CLIENT_ID_MARKETPLACE || '',
        }),
      )
      expect(clone.next('FAIL').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })

    it('should call API fail', () => {
      const clone = gen.clone()
      // @ts-ignore
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
      expect(clone.next().value).toEqual(put(settingShowLoading(false)))
      expect(clone.next().done).toEqual(true)
    })
  })
})

describe('settings thunks', () => {
  describe('developerInformationFetchListen', () => {
    it('should submit data when called', () => {
      const gen = developerInformationFetchListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.SETTING_FETCH_DEVELOPER_INFO, developerInformationFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerInformationChangeListen', () => {
    it('should submit data when called', () => {
      const gen = developerInformationChangeListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<DeveloperModel>>(ActionTypes.SETTING_UPDATE_DEVELOPER, developerInfomationChange),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerPasswordChangeListen', () => {
    it('should submit data when called', () => {
      const gen = developerPasswordChangeListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<ChangePasswordParams>>(ActionTypes.CHANGE_PASSWORD, developerPasswordChange),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('settingsSagas', () => {
    it('should listen saga', () => {
      const gen = settingsSagas()

      expect(gen.next().value).toEqual(
        all([
          fork(developerInformationFetchListen),
          fork(developerInformationChangeListen),
          fork(developerPasswordChangeListen),
        ]),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
