import { fetchStatisticsSucces, fetchStatisticsFailed, StatisticsRequestParams } from '@/actions/statistics'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import dayjs from 'dayjs'
import ActionTypes from '@/constants/action-types'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { getDateRange } from '@/utils/statistics'
import { extractNetworkErrString } from '@reapit/utils-common'
import { fetchDevelopersList } from '@/services/developers'
import { fetchInstallationsList } from '@/services/installations'
import { notification } from '@reapit/elements-legacy'
import { fetchAppsList } from '../../services/apps'

export const MARKETPLACE_GOLIVE_DATE = '2020-02-14'

export const statisticsDataFetch = function* ({ data }) {
  try {
    const { area, range } = data
    const queryParams = {} as any
    if (range !== 'ALL') {
      const dateRange = getDateRange(range)
      queryParams.RegisteredFrom = dateRange.from.toISOString()
      queryParams.RegisteredTo = dateRange.to.toISOString()
    } else {
      queryParams.RegisteredFrom = dayjs(MARKETPLACE_GOLIVE_DATE).toDate().toISOString()
    }
    const servicesToCall = {
      DEVELOPERS: fetchDevelopersList,
      INSTALLATIONS: fetchInstallationsList,
      APPS: fetchAppsList,
    }

    const response = yield call(servicesToCall[area], { pageSize: GET_ALL_PAGE_SIZE, ...queryParams })

    if (area === 'INSTALLATIONS') {
      const apps = yield call(servicesToCall['APPS'], {
        pageSize: GET_ALL_PAGE_SIZE,
      })
      const installationsWithAppName =
        response?.data?.map((installation) => {
          const appName = apps.data?.find((app) => app.id === installation.appId)?.name ?? ''

          return {
            ...installation,
            appName,
          }
        }) || []

      yield put(fetchStatisticsSucces({ data: installationsWithAppName, totalCount: response.totalCount }))
    } else {
      yield put(fetchStatisticsSucces({ data: response.data, totalCount: response.totalCount }))
    }
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
    })

    yield put(fetchStatisticsFailed(networkErrorString))
  }
}

export const statisticsDataListen = function* () {
  yield takeLatest<Action<StatisticsRequestParams>>(ActionTypes.FETCH_STATISTICS, statisticsDataFetch)
}

const statisticsSagas = function* () {
  yield all([fork(statisticsDataListen)])
}

export default statisticsSagas
