import { clientFetchAppSummarySuccess } from '../actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { FEATURED_APPS } from '@/constants/paginator'
import { Action } from '@/types/core'
import { selectFeaturedApps, selectDeveloperEditionId } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'
import { getNumberOfItems } from '@/utils/browse-app'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId } from '@/selector/auth'

const DEFAULT_CATEGORY_LENGTH = 1
const DEFAULT_FEATURED_APP_PAGE_NUMBER = 1

export const clientDataFetch = function*({ data }) {
  try {
    const { page, search, category, searchBy, preview: isPreview } = data
    const connectSession = yield call(reapitConnectBrowserSession.connectSession)

    const clientId = yield call(selectClientId, connectSession)
    if (!clientId) {
      return
    }
    const currentCategories = yield select(selectCategories)
    const currentFeaturedApps = yield select(selectFeaturedApps)
    const developerId = yield call(selectDeveloperEditionId, connectSession)

    // because the https://dev.platformmarketplace.reapit.net/categories endpoint does not return a filter for Direct API so
    // we will have to manually check it here
    // TODO: have the endpoint return a category id for Direct API apps as well
    const isFilteringForDirectApiApps = category === 'DIRECT_API_APPS_FILTER'
    const shouldNotFetchFeaturedApps = !!search || !!category
    const shouldNotFetchCategories = currentCategories.length > DEFAULT_CATEGORY_LENGTH

    // PREVIEW APPS FEATURE when ?preview=true
    const appsExternalAppIds = isPreview ? window.reapit.config.previewExternalAppIds : undefined
    const featuredAppsExternalAppIds = isPreview ? window.reapit.config.previewFeaturedExternalAppIds : undefined

    const normalAppsPerPage = getNumberOfItems()

    const appsFetchParams = isPreview
      ? {
          pageNumber: page,
          pageSize: normalAppsPerPage,
          externalAppId: appsExternalAppIds,
        }
      : {
          clientId,
          developerId: developerId ? [developerId] : [],
          category: isFilteringForDirectApiApps ? undefined : category,
          [searchBy]: search,
          pageNumber: page,
          pageSize: normalAppsPerPage,
          isFeatured: isFilteringForDirectApiApps ? undefined : false,
          isDirectApi: isFilteringForDirectApiApps ? true : undefined,
        }

    const featuredAppsFetchParams = isPreview
      ? {
          pageNumber: DEFAULT_FEATURED_APP_PAGE_NUMBER,
          pageSize: FEATURED_APPS,
          externalAppId: featuredAppsExternalAppIds,
        }
      : {
          clientId,
          developerId: developerId ? [developerId] : [],
          pageNumber: DEFAULT_FEATURED_APP_PAGE_NUMBER,
          pageSize: FEATURED_APPS,
          isFeatured: true,
        }

    const [apps, featuredApps, categories] = yield all([
      call(fetchAppsList, appsFetchParams),

      shouldNotFetchFeaturedApps ? currentFeaturedApps : call(fetchAppsList, featuredAppsFetchParams),

      shouldNotFetchCategories ? currentCategories : call(fetchCategoriesList, {}),
    ])

    const clientItem: ClientAppSummary = { apps: apps, featuredApps: featuredApps?.data }
    yield put(clientFetchAppSummarySuccess(clientItem))
    yield put(categoriesReceiveData(categories))
  } catch (err) {
    logger(err)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const clientDataListen = function*() {
  yield takeLatest<Action<ClientAppSummaryParams>>(ActionTypes.CLIENT_FETCH_APP_SUMMARY, clientDataFetch)
}

const clientSagas = function*() {
  yield all([fork(clientDataListen)])
}

export default clientSagas
