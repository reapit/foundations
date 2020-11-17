import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  fetchSubscriptionListValues,
} from '@/actions/subscriptions'

import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString } from '@reapit/utils'
import { fetchSubscriptionsList } from '@/services/subscriptions'

export const fetchSubscriptionListHandler = function*({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const type = queryParams.get('type') || ''
    const developerId = queryParams.get('developerId') || ''

    const response = yield call(fetchSubscriptionsList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: page,
      type,
      developerId,
    })

    yield put(fetchSubscriptionListSuccess(response))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
      placement: 'bottomRight',
    })
    yield put(fetchSubscriptionListFailed(networkErrorString))
  }
}

export const fetchSubscriptionListListen = function*() {
  yield takeLatest<Action<fetchSubscriptionListValues>>(
    ActionTypes.FETCH_SUBCRIPTION_LIST,
    fetchSubscriptionListHandler,
  )
}

const subscriptionsListSagas = function*() {
  yield all([fork(fetchSubscriptionListListen)])
}

export default subscriptionsListSagas
