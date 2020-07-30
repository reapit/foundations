import { notification } from '@reapit/elements'
import { submitApp as submitAppSaga, submitAppDataListen, submitAppSagas } from '../submit-app'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import { submitAppSetFormState, SubmitAppArgs } from '@/actions/submit-app'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { appSubmitStubWithActions, appSubmitStub } from '../__stubs__/apps-submit'
import { appDetailDataStub } from '../__stubs__/app-detail'
import { createAppAPI, fetchAppByIdByRawUrl } from '@/services/apps'
import { selectDeveloperId } from '@/selector/auth'
import { Saga } from 'redux-saga'
import { formFields } from '@/components/ui/submit-app-wizard/form-fields'
import { wizzardSteps } from '@/components/ui/submit-app-wizard/constant'

const { externalIdField, appIdField } = formFields

jest.mock('@/services/upload')
jest.mock('@/services/scopes')
jest.mock('@/services/apps')
jest.mock('@/services/categories')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

export const params: Action<SubmitAppArgs> = {
  data: appSubmitStubWithActions.data,
  type: 'DEVELOPER_SUBMIT_APP',
}

const castSagas = (submitAppSaga as unknown) as Saga<any>
describe('submit-app post data', () => {
  const gen = cloneableGenerator(castSagas)(params)

  expect(gen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(select(selectDeveloperId))
  expect(gen.next('id').value).toEqual(call(createAppAPI, { ...appSubmitStub.data, developerId: 'id' }))

  test('api call fail if cant select developer id', () => {
    const internalGen = cloneableGenerator(castSagas)(params)

    expect(internalGen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
    expect(internalGen.next().value).toEqual(select(selectDeveloperId))
    expect(internalGen.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(internalGen.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(internalGen.next().done).toBe(true)
  })

  test('api call success', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'location'
    const mockHeaders = { get: (param: string) => param }
    expect(clone.next(mockHeaders).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      call(params.data.setFieldValue, externalIdField.name, appDetailDataStub.data?.externalId),
    )
    expect(clone.next().value).toEqual(call(params.data.setFieldValue, appIdField.name, appDetailDataStub.data?.id))
    expect(clone.next().value).toEqual(call(params.data.setWizardStep, wizzardSteps.SUBMIT_APP_SUCCESS))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw('Call API Failed').value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail when create app response header not contain location field', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
  })
  test('api call fail when fetch detail app response is empty', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'location'
    const mockHeaders = { get: (param: string) => param }

    expect(clone.next(mockHeaders).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail when error response contains description field', () => {
    const clone = gen.clone()

    const err = {
      response: {
        description: 'test',
      },
    }
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw(err).value).toEqual(call(params.data.setErrors, { [FIELD_ERROR_DESCRIPTION]: 'test' }))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: 'test',
        placement: 'bottomRight',
        duration: 0,
      }),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-app thunks', () => {
  describe('submitAppDataListen', () => {
    it('should submit data when called', () => {
      const gen = submitAppDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<SubmitAppArgs>>(ActionTypes.DEVELOPER_SUBMIT_APP, submitAppSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('submitAppSagas', () => {
    it('should listen saga', () => {
      const gen = submitAppSagas()

      expect(gen.next().value).toEqual(all([fork(submitAppDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
