import { logger } from '@reapit/utils'
import { put, takeLatest, all, fork, call } from 'redux-saga/effects'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '../../../elements/src/utils/validators/error-messages'
import ActionTypes from '@/constants/action-types'
import { Action } from '@/types/core'
import { fetchSubscriptionsList, FetchSubscriptionsListParams, deleteSubscription } from '@/services/subscriptions'
import { developerFetchSubscriptionsSuccess, developerFetchSubscriptions } from '@/actions/developer'
import { select } from 'redux-saga/effects' //    <- here it is
import { selectDeveloperId } from '@/selector/auth'

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
export const developerDeleteSubcriptionListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION, developerDeleteSubcription)
}

export const developerSubcriptionsListSagas = function*() {
  yield all([fork(developerFetchSubcriptionsListListen), fork(developerDeleteSubcriptionListen)])
}

export default developerSubcriptionsListSagas
