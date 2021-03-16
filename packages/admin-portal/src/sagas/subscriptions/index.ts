import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  FetchSubscriptionListQuery,
  CancelSubscriptionActionParams,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailed,
} from '@/actions/subscriptions'

import { notification } from '@reapit/elements'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString, errorMessages } from '@reapit/utils'
import { fetchSubscriptionListApi, cancelSubscriptionApi } from '@/services/subscriptions'

export const fetchSubscriptionListHandler = function* ({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const type = queryParams.get('type') || ''
    const developerId = queryParams.get('developerId') || ''

    const response = yield call(fetchSubscriptionListApi, {
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
    })
    yield put(fetchSubscriptionListFailed(networkErrorString))
  }
}

export const cancelSubscriptionHandler = function* ({ data: { id } }) {
  try {
    const response = yield call(cancelSubscriptionApi, { id })
    if (response) {
      yield put(cancelSubscriptionSuccess())
    } else {
      yield put(cancelSubscriptionFailed())
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      })
    }
  } catch (err) {
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
    yield put(cancelSubscriptionFailed())
  }
}

export const fetchSubscriptionListListen = function* () {
  yield takeLatest<Action<FetchSubscriptionListQuery>>(
    ActionTypes.FETCH_SUBSCRIPTION_LIST,
    fetchSubscriptionListHandler,
  )
}

export const cancelSubscriptionListen = function* () {
  yield takeLatest<Action<CancelSubscriptionActionParams>>(ActionTypes.CANCEL_SUBSCRIPTION, cancelSubscriptionHandler)
}

const subscriptionsListSagas = function* () {
  yield all([fork(fetchSubscriptionListListen), fork(cancelSubscriptionListen)])
}

export default subscriptionsListSagas
