import { put, takeLatest, all, fork, call } from 'redux-saga/effects'
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { select } from 'redux-saga/effects'
import { selectDeveloperId } from '@/selector/auth'
import errorMessages from '@/constants/error-messages'
import { logger } from '@reapit/utils'
import {
  developerFetchSubscriptions,
  developerFetchSubscriptionsSuccess,
  developerCreateSubscriptionSuccess,
  developerCreateSubscriptionFalure,
  CreateSubscriptionParams,
} from '@/actions/developer-subscriptions'
import {
  createDeveloperSubscription,
  fetchSubscriptionsList,
  FetchSubscriptionsListParams,
  deleteSubscription,
} from '@/services/developer-subscriptions'

export const developerFetchSubcriptionsList = function*({ data }: Action<FetchSubscriptionsListParams>) {
  try {
    const { developerId } = data
    if (!developerId) {
      throw new Error('developerId is not exist')
    }
    const response = yield call(fetchSubscriptionsList, { developerId })
    yield put(developerFetchSubscriptionsSuccess(response))
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

export const developerCreateSubscription = function*({ data }: Action<CreateSubscriptionParams>) {
  try {
    const response = yield call(createDeveloperSubscription, data.params)
    if (response) {
      yield put(developerCreateSubscriptionSuccess(response))
      data.onCreated()
    } else {
      yield put(developerCreateSubscriptionFalure())
    }
  } catch (err) {
    logger(err)
    yield put(developerCreateSubscriptionFalure())
  }
}

export const developerDeleteSubcription = function*({ data: id }: Action<string>) {
  try {
    yield call(deleteSubscription, { id })
    const developerId = yield select(selectDeveloperId)
    yield put(developerFetchSubscriptions({ developerId }))
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

export const developerFetchSubcriptionsListListen = function*() {
  yield takeLatest<Action<FetchSubscriptionsListParams>>(
    ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS,
    developerFetchSubcriptionsList,
  )
}

export const developerCreateSubcriptionListen = function*() {
  yield takeLatest<Action<CreateSubscriptionParams>>(
    ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE,
    developerCreateSubscription,
  )
}

export const developerDeleteSubcriptionListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION, developerDeleteSubcription)
}

export const developerSubcriptionsListSagas = function*() {
  yield all([
    fork(developerFetchSubcriptionsListListen),
    fork(developerCreateSubcriptionListen),
    fork(developerDeleteSubcriptionListen),
  ])
}

export default developerSubcriptionsListSagas
