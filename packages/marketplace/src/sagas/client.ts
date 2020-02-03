import { clientLoading, clientReceiveData, clientRequestDataFailure } from '../actions/client'
import { categoriesReceiveData } from '@/actions/app-categories'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE, FEATURED_APPS } from '@/constants/paginator'
import { fetcher, setQueryParams } from '@reapit/elements'
import { Action } from '@/types/core'
import { selectClientId, selectFeaturedApps } from '@/selector/client'
import { selectCategories } from '@/selector/app-categories'
import { ClientItem, ClientParams } from '@/reducers/client'
import { logger } from '@/utils/error-logger'

export const clientDataFetch = function*({ data }) {
  yield put(clientLoading(true))

  try {
    const { page, search, category, searchBy } = data
    const clientId = yield select(selectClientId)
    if (!clientId) {
      throw new Error('Client id does not exist in state')
    }
    const currentCategories = yield select(selectCategories)
    const currentFeaturedApps = yield select(selectFeaturedApps)

    // because the https://dev.platformmarketplace.reapit.net/categories endpoint does not return a filter for Direct API so
    // we will have to manually check it here
    // TODO: have the endpoint return a category id for Direct API apps as well
    const isFilteringForDirectApiApps = category === 'DIRECT_API_APPS_FILTER'

    const [apps, featuredApps, categories] = yield all([
      call(fetcher, {
        url: `${URLS.apps}?${setQueryParams({
          clientId,
          category: isFilteringForDirectApiApps ? undefined : category,
          [searchBy]: search,
          pageNumber: page,
          pageSize: APPS_PER_PAGE,
          IsFeatured: isFilteringForDirectApiApps ? undefined : false,
          IsDirectApi: isFilteringForDirectApiApps ? true : undefined,
        })}`,
        api: process.env.MARKETPLACE_API_BASE_URL as string,
        method: 'GET',
        headers: MARKETPLACE_HEADERS,
      }),
      !!search || !!category
        ? currentFeaturedApps
        : call(fetcher, {
            url: `${URLS.apps}?clientId=${clientId}&PageNumber=1&PageSize=${FEATURED_APPS}&IsFeatured=true`,
            api: process.env.MARKETPLACE_API_BASE_URL as string,
            method: 'GET',
            headers: MARKETPLACE_HEADERS,
          }),
      currentCategories.length > 1
        ? currentCategories
        : call(fetcher, {
            url: `${URLS.categories}`,
            method: 'GET',
            api: process.env.MARKETPLACE_API_BASE_URL as string,
            headers: MARKETPLACE_HEADERS,
          }),
    ])
    if (apps && categories && featuredApps) {
      const clientItem: ClientItem = { apps: apps, featuredApps: featuredApps?.data }
      yield put(clientReceiveData(clientItem))
      yield put(categoriesReceiveData(categories))
    } else {
      yield put(clientRequestDataFailure())
    }
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
  yield takeLatest<Action<ClientParams>>(ActionTypes.CLIENT_REQUEST_DATA, clientDataFetch)
}

const clientSagas = function*() {
  yield all([fork(clientDataListen)])
}

export default clientSagas
