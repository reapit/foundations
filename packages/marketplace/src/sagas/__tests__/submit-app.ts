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
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { submitAppSetFormState, SubmitAppArgs, submitAppLoading, submitAppReceiveData } from '@/actions/submit-app'
import { categoriesReceiveData } from '@/actions/app-categories'
import { errorThrownServer } from '@/actions/error'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { appSubmitStubWithActions, appSubmitStub } from '../__stubs__/apps-submit'
import { appCategorieStub } from '../__stubs__/app-categories'
import { ScopeModel, PagedResultCategoryModel_ } from '@reapit/foundations-ts-definitions'

jest.mock('@reapit/elements')

export const params: Action<SubmitAppArgs> = { data: appSubmitStubWithActions.data, type: 'DEVELOPER_SUBMIT_APP' }
const generateDumpPromise = () => new Promise(() => null)

describe('submit-app post data', () => {
  const imageUploaderRequests = [
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
  ]
  const imageUploaderResults = [
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
  ]
  const updatedData = {
    ...appSubmitStub.data,
    iconImageUrl: 'base64 string...',
    screen1ImageUrl: 'base64 string...',
    screen2ImageUrl: 'base64 string...',
    screen3ImageUrl: 'base64 string...',
    screen4ImageUrl: 'base64 string...',
    screen5ImageUrl: 'base64 string...',
  }

  const gen = cloneableGenerator(submitAppSaga)(params)

  expect(gen.next().value).toEqual(put(submitAppSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(all(imageUploaderRequests))

  expect(gen.next(imageUploaderResults).value).toEqual(
    call(fetcher, {
      url: URLS.apps,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'POST',
      body: { ...updatedData, categoryId: undefined },
      headers: MARKETPLACE_HEADERS,
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(submitAppSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(put(submitAppSetFormState('ERROR')))
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
    const err = new Error('Call API Failed')
    // @ts-ignore
    err.response = {
      description: 'test',
    }
    // @ts-ignore
    expect(clone.throw(err).value).toEqual(call(params.data.actions.setErrors, { [FIELD_ERROR_DESCRIPTION]: 'test' }))
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
    all([
      call(fetcher, {
        url: `${URLS.scopes}`,
        method: 'GET',
        api: process.env.MARKETPLACE_API_BASE_URL as string,
        headers: MARKETPLACE_HEADERS,
      }),
      call(fetcher, {
        url: `${URLS.categories}`,
        method: 'GET',
        api: process.env.MARKETPLACE_API_BASE_URL as string,
        headers: MARKETPLACE_HEADERS,
      }),
    ]),
  )

  test('api fetch success', () => {
    const clone = gen.clone()
    const response = [[{ name: '1', description: '1' }], appCategorieStub]
    expect(clone.next(response).value).toEqual(put(submitAppLoading(false)))
    expect(clone.next().value).toEqual(put(submitAppReceiveData(response[0] as ScopeModel[])))
    expect(clone.next().value).toEqual(put(categoriesReceiveData(response[1] as PagedResultCategoryModel_)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(put(submitAppLoading(false)))
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
