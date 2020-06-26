import {
  submitApp as submitAppSaga,
  submitAppDataListen,
  submitAppSagas,
  submitAppDataFetchListen,
  submitAppsDataFetch,
} from '../submit-app'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import { submitAppSetFormState, SubmitAppArgs, submitAppLoading, submitAppReceiveData } from '@/actions/submit-app'
import { categoriesReceiveData } from '@/actions/app-categories'
import { integrationTypesReceiveData, PagedResultDesktopIntegrationTypeModel_ } from '@/actions/app-integration-types'
import { errorThrownServer } from '@/actions/error'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { appSubmitStubWithActions, appSubmitStub } from '../__stubs__/apps-submit'
import { appDetailDataStub } from '../__stubs__/app-detail'
import { appCategorieStub } from '../__stubs__/app-categories'
import { ScopeModel, PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'
import { fetchScopesList } from '@/services/scopes'
import { createApp, fetchAppByIdByRawUrl } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'
import { fetchDesktopIntegrationTypesList } from '@/services/desktop-integration-types'
import { selectDeveloperId } from '@/selector/auth'
import { Saga } from 'redux-saga'
import { formFields } from '@/components/ui/submit-app-wizard/form-fields'

const { externalIdFields } = formFields

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
  expect(gen.next('id').value).toEqual(call(createApp, { ...appSubmitStub.data, developerId: 'id' }))

  test('api call fail if cant select developer id', () => {
    const internalGen = cloneableGenerator(castSagas)(params)

    expect(internalGen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
    expect(internalGen.next().value).toEqual(select(selectDeveloperId))
    expect(internalGen.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(internalGen.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(internalGen.next().done).toBe(true)
  })

  test('api call success', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'url'
    const mockHeaders = { get: (param: string) => param }

    expect(clone.next(mockHeaders).value).toEqual(call(mockHeaders.get, 'location'))
    expect(clone.next(mockLocationHeader).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      call(params.data.setFieldValue, externalIdFields.name, appDetailDataStub.data.externalId),
    )
    expect(clone.next().value).toEqual(call(params.data.setWizardStep, 'SUBMIT_APP_SUCCESS'))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw('Call API Failed').value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail when create app response header not contain location field', () => {
    const clone = gen.clone()
    const mockHeaders = { get: (param: string) => param }

    expect(clone.next(mockHeaders).value).toEqual(call(mockHeaders.get, 'location'))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })
  test('api call fail when fetch detail app response is empty', () => {
    const clone = gen.clone()
    const mockLocationHeader = 'url'
    const mockHeaders = { get: (param: string) => param }

    expect(clone.next(mockHeaders).value).toEqual(call(mockHeaders.get, 'location'))
    expect(clone.next(mockLocationHeader).value).toEqual(call(fetchAppByIdByRawUrl, mockLocationHeader))
    expect(clone.next().value).toEqual(put(submitAppSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
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
      put(
        errorThrownServer({
          type: 'SERVER',
          message: 'test',
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-app fetch data', () => {
  const gen = cloneableGenerator(submitAppsDataFetch as any)()

  expect(gen.next().value).toEqual(put(submitAppLoading(true)))
  expect(gen.next().value).toEqual(
    all([call(fetchScopesList), call(fetchCategoriesList, {}), call(fetchDesktopIntegrationTypesList, {})]),
  )

  test('api fetch success', () => {
    const clone = gen.clone()
    const response = [[{ name: '1', description: '1' }], appCategorieStub]
    expect(clone.next(response).value).toEqual(put(submitAppLoading(false)))
    expect(clone.next().value).toEqual(put(submitAppReceiveData(response[0] as ScopeModel[])))
    expect(clone.next().value).toEqual(put(categoriesReceiveData(response[1] as PagedResultCategoryModel_)))
    expect(clone.next().value).toEqual(
      put(integrationTypesReceiveData(response[2] as PagedResultDesktopIntegrationTypeModel_)),
    )
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw('Call API Failed').value).toEqual(put(submitAppLoading(false)))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
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

  describe('submitAppDataFetchListen', () => {
    it('should submit data when called', () => {
      const gen = submitAppDataFetchListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<void>>(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA, submitAppsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('submitAppSagas', () => {
    it('should listen saga', () => {
      const gen = submitAppSagas()

      expect(gen.next().value).toEqual(all([fork(submitAppDataListen), fork(submitAppDataFetchListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
