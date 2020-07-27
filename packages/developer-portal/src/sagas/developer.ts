import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { logger } from '@reapit/utils'
import {
  developerSetFormState,
  setMyIdentity,
  fetchBillingSuccess,
  fetchBillingFailure,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
  developerSetWebhookPingStatus,
} from '@/actions/developer'
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { selectDeveloperId } from '@/selector'
import { PingWebhooksByIdParams, pingWebhooksById } from '@/services/webhooks'
import { createDeveloper, fetchDeveloperById } from '@/services/developers'
import {
  fetchBillings,
  fetchBillingsByMonth,
  FetchBillingsParams,
  FetchBillingsByMonthParams,
} from '@/services/traffic-events'

export const developerCreate = function*({ data }: Action<CreateDeveloperModel>) {
  yield put(developerSetFormState('SUBMITTING'))

  try {
    const regResponse = yield call(createDeveloper, data)
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(developerSetFormState(status))
  } catch (err) {
    logger(err)
    yield put(developerSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: err?.response?.description || errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchMyIdentitySagas = function*() {
  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      return
    }
    const developerIdentity = yield call(fetchDeveloperById, { id: developerId })
    if (developerIdentity) {
      yield put(setMyIdentity(developerIdentity))
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

export const fetchBillingSagas = function*({ data }: Action<FetchBillingsParams>) {
  try {
    const billingResponse = yield call(fetchBillings, data)
    yield put(fetchBillingSuccess(billingResponse))
  } catch (err) {
    logger(err)
    yield put(fetchBillingFailure(err))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchMonthlyBillingSagas = function*({ data }: Action<FetchBillingsByMonthParams>) {
  try {
    const billingResponse = yield call(fetchBillingsByMonth, data)
    yield put(fetchMonthlyBillingSuccess(billingResponse))
  } catch (err) {
    logger(err)
    yield put(fetchMonthlyBillingFailure(err))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const developerWebhookPing = function*({ data }: Action<PingWebhooksByIdParams>) {
  try {
    yield put(developerSetWebhookPingStatus('LOADING'))
    yield call(pingWebhooksById, data)
    yield put(developerSetWebhookPingStatus('SUCCESS'))
  } catch (err) {
    logger(err)
    yield put(developerSetWebhookPingStatus('FAILED'))
  }
}

export const developerCreateListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_CREATE, developerCreate)
}

export const fetchMyIdentitySagasListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY, fetchMyIdentitySagas)
}

export const fetchBillingSagasListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_FETCH_BILLING, fetchBillingSagas)
}

export const fetchMonthlyBillingSagasListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING, fetchMonthlyBillingSagas)
}

export const developerWebhookPingListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_PING_WEBHOOK, developerWebhookPing)
}

const developerSagas = function*() {
  yield all([
    fork(developerCreateListen),
    fork(fetchMyIdentitySagasListen),
    fork(fetchBillingSagasListen),
    fork(fetchMonthlyBillingSagasListen),
    fork(developerWebhookPingListen),
  ])
}

export default developerSagas
