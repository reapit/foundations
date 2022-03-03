import { put, fork, takeLatest, takeEvery, all, call } from '@redux-saga/core/effects'
import {
  fetchSubscriptionListSuccess,
  fetchSubscriptionListFailed,
  FetchSubscriptionListQuery,
  CancelSubscriptionActionParams,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailed,
  FetchSubscriptionsByTypeAndDevQuery,
  fetchSubscriptionsByTypeAndDevSuccess,
  createSubscriptionFailed,
  createSubscriptionSuccess,
} from '@/actions/subscriptions'

import { notification } from '@reapit/elements-legacy'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { extractNetworkErrString, errorMessages } from '@reapit/utils-common'
import { fetchSubscriptionListApi, cancelSubscriptionApi } from '@/services/subscriptions'
import { CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { createSubscriptionApi } from '../../services/subscriptions'

export const fetchSubscriptionListHandler = function* ({ data: { page, queryString } }) {
  try {
    const queryParams = new URLSearchParams(queryString)
    const subscriptionType = queryParams.get('type') || ''
    const developerName = queryParams.get('developerName') || ''
    const userEmail = queryParams.get('userEmail') || ''
    const appName = queryParams.get('appName') || ''
    const status = queryParams.get('status') || ''

    const response = yield call(fetchSubscriptionListApi, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: page,
      subscriptionType,
      developerName,
      userEmail,
      appName,
      status,
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

export const fetchSubscriptionsByDevAndTypeHandler = function* ({
  data: { subscriptionType, developerId, appId },
}: Action<FetchSubscriptionsByTypeAndDevQuery>) {
  try {
    const response = yield call(fetchSubscriptionListApi, {
      subscriptionType,
      developerId,
      applicationId: appId,
    })

    yield put(fetchSubscriptionsByTypeAndDevSuccess(response))
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    yield call(notification.error, {
      message: networkErrorString,
    })
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
    const networkErrorString = extractNetworkErrString(err)
    notification.error({
      message: networkErrorString,
    })
    yield put(cancelSubscriptionFailed())
  }
}

export const createSubscriptionHandler = function* ({ data }) {
  try {
    const response = yield call(createSubscriptionApi, data)
    if (response) {
      yield put(createSubscriptionSuccess())
    } else {
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      })
      yield put(createSubscriptionFailed())
    }
  } catch (err) {
    const networkErrorString = extractNetworkErrString(err)
    notification.error({
      message: networkErrorString,
    })
    yield put(createSubscriptionFailed())
  }
}

export const fetchSubscriptionListListen = function* () {
  yield takeLatest<Action<FetchSubscriptionListQuery>>(
    ActionTypes.FETCH_SUBSCRIPTION_LIST,
    fetchSubscriptionListHandler,
  )
}

export const fetchSubscriptionsByDevAndTypeListen = function* () {
  yield takeEvery<Action<FetchSubscriptionsByTypeAndDevQuery>>(
    ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV,
    fetchSubscriptionsByDevAndTypeHandler,
  )
}

export const cancelSubscriptionListen = function* () {
  yield takeLatest<Action<CancelSubscriptionActionParams>>(ActionTypes.CANCEL_SUBSCRIPTION, cancelSubscriptionHandler)
}

export const createSubscriptionListen = function* () {
  yield takeLatest<Action<CreateSubscriptionModel>>(ActionTypes.CREATE_SUBSCRIPTION, createSubscriptionHandler)
}

const subscriptionsListSagas = function* () {
  yield all([
    fork(fetchSubscriptionListListen),
    fork(cancelSubscriptionListen),
    fork(createSubscriptionListen),
    fork(fetchSubscriptionsByDevAndTypeListen),
  ])
}

export default subscriptionsListSagas
