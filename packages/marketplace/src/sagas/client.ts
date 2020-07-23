import { clientFetchAppSummarySuccess } from '../actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { APPS_PER_PAGE, FEATURED_APPS } from '@/constants/paginator'
import { Action } from '@/types/core'
import { selectClientId, selectFeaturedApps, selectDeveloperEditionId } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'

const DEFAULT_CATEGORY_LENGTH = 1
const DEFAULT_FEATURED_APP_PAGE_NUMBER = 1

export const clientDataFetch = function*({ data }) {
  try {
    const { page, search, category, searchBy, preview: isPreview } = data
    const clientId = yield select(selectClientId)
    if (!clientId) {
      return
    }
    const currentCategories = yield select(selectCategories)
    const currentFeaturedApps = yield select(selectFeaturedApps)
    const developerId = yield select(selectDeveloperEditionId)

    // because the https://dev.platformmarketplace.reapit.net/categories endpoint does not return a filter for Direct API so
    // we will have to manually check it here
    // TODO: have the endpoint return a category id for Direct API apps as well
    const isFilteringForDirectApiApps = category === 'DIRECT_API_APPS_FILTER'
    const shouldNotFetchFeatureApp = !!search || !!category
    const shouldNotFetchCategories = currentCategories.length > DEFAULT_CATEGORY_LENGTH

    const appsExternalAppId = isPreview
      ? [
          'u78db4v074cd35hfn0o22rjks',
          '12cpo3fvuf5i64hmh6jtiiikck',
          '61m5rglg0c7uhcvonits9te748',
          '3utn4gi7hkhej04nohq4seaker',
          '1pv68mhk7iggbmefhv7hd9619h',
          '3qtpkra3ucouh6dnu7e8rjvjmp',
          '5nclclrns6mfkqu4a3sgihfhp2',
          '22a8l6mesohb8k6mqe3io483v8',
          'cro58cpfh7hes4mi03mn1stk',
          'c8gukq556ibvr0ol15a6i3o9d',
          '2vats8l69ncaovvg0o8b6nrihd',
        ]
      : undefined

    const appsFetchParams = isPreview
      ? {
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          externalAppId: appsExternalAppId,
        }
      : {
          clientId,
          developerId: developerId ? [developerId] : [],
          category: isFilteringForDirectApiApps ? undefined : category,
          [searchBy]: search,
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          isFeatured: isFilteringForDirectApiApps ? undefined : false,
          isDirectApi: isFilteringForDirectApiApps ? true : undefined,
        }

    const featuredAppsFetchParams = isPreview
      ? {
          pageNumber: DEFAULT_FEATURED_APP_PAGE_NUMBER,
          pageSize: FEATURED_APPS,
          isFeatured: true,
          externalAppId: [],
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

      shouldNotFetchFeatureApp ? currentFeaturedApps : call(fetchAppsList, featuredAppsFetchParams),

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
