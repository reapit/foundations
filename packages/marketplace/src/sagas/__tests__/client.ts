import clientSagas, { clientDataFetch, clientDataListen } from '../client'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { clientAppSummaryReceiveData, clientAppSummaryRequestDataFailure } from '@/actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { featuredAppsDataStub, appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '@/constants/api'
import { APPS_PER_PAGE, FEATURED_APPS } from '@/constants/paginator'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectClientId, selectFeaturedApps } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import {
  PagedResultCategoryModel_,
  PagedResultAppSummaryModel_,
  AppSummaryModel,
} from '@reapit/foundations-ts-definitions'
import { appCategorieStub } from '../__stubs__/app-categories'

jest.mock('@reapit/elements')
const params = { data: { page: 1, search: '', category: '' } }

describe('client fetch data', () => {
  const gen = cloneableGenerator(clientDataFetch as any)(params)

  expect(gen.next().value).toEqual(select(selectClientId))
  expect(gen.next('1').value).toEqual(select(selectCategories))
  expect(gen.next([]).value).toEqual(select(selectFeaturedApps))

  expect(gen.next([]).value).toEqual(
    all([
      call(fetcher, {
        url: `${URLS.apps}?${setQueryParams({
          clientId: '1',
          category: params.data.category,
          appName: params.data.search,
          pageNumber: params.data.page,
          pageSize: APPS_PER_PAGE,
          IsFeatured: false,
        })}`,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      }),
      call(fetcher, {
        url: `${URLS.apps}?clientId=1&PageNumber=${params.data.page}&PageSize=${FEATURED_APPS}&IsFeatured=true`,
        api: window.reapit.config.marketplaceApiUrl,
        method: 'GET',
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      }),
      call(fetcher, {
        url: `${URLS.categories}`,
        method: 'GET',
        api: window.reapit.config.marketplaceApiUrl,
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      }),
    ]),
  )

  test('api call success', () => {
    const clone = gen.clone()
    const response = [appsDataStub.data, featuredAppsDataStub.data, appCategorieStub]
    expect(clone.next(response).value).toEqual(
      put(
        clientAppSummaryReceiveData({
          apps: response[0] as PagedResultAppSummaryModel_,
          featuredApps: response[1].data as AppSummaryModel[],
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(categoriesReceiveData(response[2] as PagedResultCategoryModel_)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next([]).value).toEqual(put(clientAppSummaryRequestDataFailure('api call fail')))
    expect(clone.next().done).toBe(true)
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
  })
})

describe('client fetch data error', () => {
  const gen = cloneableGenerator(clientDataFetch as any)(params)

  expect(gen.next('').value).toEqual(select(selectClientId))

  // @ts-ignore
  expect(gen.throw('error').value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    ),
  )
})

describe('client thunks', () => {
  describe('clientListen', () => {
    it('should request data when called', () => {
      const gen = clientDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_DATA, clientDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clientSagas', () => {
    it('should listen data request', () => {
      const gen = clientSagas()

      expect(gen.next().value).toEqual(all([fork(clientDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
