import { clientFetchAppSummarySuccess } from '../actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { APPS_PER_PAGE, FEATURED_APPS } from '@/constants/paginator'
import { Action } from '@/types/core'
import { selectClientId, selectFeaturedApps } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import { ClientAppSummary, ClientAppSummaryParams } from '@/reducers/client/app-summary'
import { logger } from '@reapit/utils'
import { fetchAppsList } from '@/services/apps'
import { fetchCategoriesList } from '@/services/categories'

const DEFAULT_CATEGORY_LENGTH = 1

export const clientDataFetch = function*({ data }) {
  try {
    const { page, search, category, searchBy } = data
    const clientId = yield select(selectClientId)
    if (!clientId) {
      return
    }
    const currentCategories = yield select(selectCategories)
    const currentFeaturedApps = yield select(selectFeaturedApps)

    // because the https://dev.platformmarketplace.reapit.net/categories endpoint does not return a filter for Direct API so
    // we will have to manually check it here
    // TODO: have the endpoint return a category id for Direct API apps as well
    const isFilteringForDirectApiApps = category === 'DIRECT_API_APPS_FILTER'

    const [apps, featuredApps, categories] = yield all([
      call(fetchAppsList, {
        clientId,
        category: isFilteringForDirectApiApps ? undefined : category,
        [searchBy]: search,
        pageNumber: page,
        pageSize: APPS_PER_PAGE,
        isFeatured: isFilteringForDirectApiApps ? undefined : false,
        isDirectApi: isFilteringForDirectApiApps ? true : undefined,
      }),
      !!search || !!category
        ? currentFeaturedApps
        : call(fetchAppsList, { clientId, pageNumber: 1, pageSize: FEATURED_APPS, isFeatured: true }),
      currentCategories.length > DEFAULT_CATEGORY_LENGTH ? currentCategories : call(fetchCategoriesList, {}),
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
