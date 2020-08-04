import {
  createInstallationSaga,
  requestInstallationTerminateSaga,
  managementInstallationsListen,
  managementInstallationsSagas,
} from '../management'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { setInstallationsFormState, UninstallParams, InstallParams } from '@/actions/installations'
import { put, call, takeLatest, fork, all } from 'redux-saga/effects'
import { getLoggedUserEmail, getDeveloperId } from '@/utils/session'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { createInstallation, removeAccessToAppById } from '@/services/installations'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'

const installParams = {
  data: {
    appId: '1',
  },
}

const uninstallParams = {
  data: {
    appId: '1',
    installationId: '1',
  },
}
describe('createInstallationSaga', () => {
  const gen = cloneableGenerator(createInstallationSaga)(installParams)
  expect(gen.next().value).toEqual(put(setInstallationsFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(getLoggedUserEmail())
  expect(gen.next('1').value).toEqual(getDeveloperId())

  test('clientId not exist', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setInstallationsFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next('1').value).toEqual(
      call(createInstallation, { ...installParams.data, clientId: '1', approvedBy: '1' }),
    )
    expect(clone.next().value).toEqual(put(setInstallationsFormState('SUCCESS')))
  })
})

describe('appUninstallSaga', () => {
  const gen = cloneableGenerator(requestInstallationTerminateSaga)(uninstallParams)
  expect(gen.next().value).toEqual(put(setInstallationsFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(getLoggedUserEmail())

  expect(gen.next('1').value).toEqual(call(removeAccessToAppById, { ...uninstallParams.data, terminatedBy: '1' }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(setInstallationsFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api fail sagas', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(setInstallationsFormState('ERROR')))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    }
    expect(clone.next().done).toBe(true)
  })
})

describe('thunks', () => {
  describe('managementInstallationsListen', () => {
    it('should trigger app install when called', () => {
      const gen = managementInstallationsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<UninstallParams>>(
          ActionTypes.REQUEST_INSTALLATIONS_TERMINATE,
          requestInstallationTerminateSaga,
        ),
      )
      expect(gen.next().value).toEqual(
        takeLatest<Action<InstallParams>>(ActionTypes.CREATE_INSTALLATIONS, createInstallationSaga),
      )

      expect(gen.next().done).toBe(true)
    })
  })
  describe('appDetailSagas', () => {
    it('should listen data request', () => {
      const gen = managementInstallationsSagas()
      expect(gen.next().value).toEqual(all([fork(managementInstallationsListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
