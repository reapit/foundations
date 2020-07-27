import clientSagas, { clientDataFetch, clientDataListen } from '../client'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { clientFetchAppSummarySuccess } from '@/actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { featuredAppsDataStub, appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { BROWSE_APPS_PER_PAGE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectFeaturedApps, selectDeveloperEditionId } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import {
  PagedResultCategoryModel_,
  PagedResultAppSummaryModel_,
  AppSummaryModel,
} from '@reapit/foundations-ts-definitions'
import { appCategorieStub } from '../__stubs__/app-categories'
import { fetchAppsList } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'

jest.mock('@/services/apps')
jest.mock('@/services/categories')
jest.mock('@reapit/elements')

const params = { data: { page: 1, search: 'app1', category: 'category1', searchBy: 'appName' } }
const clientId = 'DXX'
const developerId = '1234'
const connectSession = 'connectSession'

describe('clientDataFetch', () => {
  const gen = cloneableGenerator(clientDataFetch as any)(params)

  it('should work in success case', () => {
    const clone = gen.clone()

    expect(clone.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(clone.next(connectSession).value).toEqual(
      call(selectClientId, (connectSession as unknown) as ReapitConnectSession),
    )
    expect(clone.next(clientId).value).toEqual(select(selectCategories))

    expect(clone.next(appCategorieStub.data).value).toEqual(select(selectFeaturedApps))
    expect(clone.next(featuredAppsDataStub.data).value).toEqual(select(selectDeveloperEditionId))

    const response = [appsDataStub.data, featuredAppsDataStub.data, appCategorieStub]
    expect(clone.next(developerId).value).toEqual(
      all([
        call(fetchAppsList, {
          clientId,
          developerId: [developerId],
          category: params.data.category as any,
          appName: params.data.search,
          pageNumber: params.data.page,
          pageSize: BROWSE_APPS_PER_PAGE,
          isFeatured: false,
          isDirectApi: undefined,
        }),
        featuredAppsDataStub.data,
        appCategorieStub.data,
      ]),
    )
    expect(clone.next(response).value).toEqual(
      put(
        clientFetchAppSummarySuccess({
          apps: response[0] as PagedResultAppSummaryModel_,
          featuredApps: response[1].data as AppSummaryModel[],
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(categoriesReceiveData(response[2] as PagedResultCategoryModel_)))
    expect(clone.next().done).toBe(true)
  })

  it('should work when ?preview=true ', () => {
    ;(global as any).window.reapit.config = {
      previewExternalAppIds: ['id1'],
      previewFeaturedExternalAppIds: ['id2'],
    }
    const gen = cloneableGenerator(clientDataFetch as any)({
      data: {
        ...params.data,
        preview: true,
      },
    })
    const clone = gen.clone()
    expect(clone.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(clone.next(connectSession).value).toEqual(
      call(selectClientId, (connectSession as unknown) as ReapitConnectSession),
    )
    expect(clone.next(clientId).value).toEqual(select(selectCategories))
    expect(clone.next(appCategorieStub.data).value).toEqual(select(selectFeaturedApps))
    expect(clone.next(featuredAppsDataStub.data).value).toEqual(select(selectDeveloperEditionId))

    const response = [appsDataStub.data, featuredAppsDataStub.data, appCategorieStub]
    expect(clone.next(developerId).value).toEqual(
      all([
        call(fetchAppsList, {
          pageNumber: params.data.page,
          pageSize: BROWSE_APPS_PER_PAGE,
          externalAppId: ['id1'],
        }),
        featuredAppsDataStub.data,
        appCategorieStub.data,
      ]),
    )
    expect(clone.next(response).value).toEqual(
      put(
        clientFetchAppSummarySuccess({
          apps: response[0] as PagedResultAppSummaryModel_,
          featuredApps: response[1].data as AppSummaryModel[],
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(categoriesReceiveData(response[2] as PagedResultCategoryModel_)))
    expect(clone.next().done).toBe(true)
  })
})

describe('client fetch data error', () => {
  const gen = cloneableGenerator(clientDataFetch as any)(params)

  expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
  expect(gen.next(connectSession).value).toEqual(
    call(selectClientId, (connectSession as unknown) as ReapitConnectSession),
  )

  if (!gen.throw) throw new Error('Generator object cannot throw')
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
        takeLatest<Action<number>>(ActionTypes.CLIENT_FETCH_APP_SUMMARY, clientDataFetch),
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
