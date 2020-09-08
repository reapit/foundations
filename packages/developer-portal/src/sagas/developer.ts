import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import {
  developerSetFormState,
  setMyIdentity,
  fetchBillingSuccess,
  fetchBillingFailure,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
  developerSetWebhookPingStatus,
} from '@/actions/developer'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { PingWebhooksByIdParams, pingWebhooksById } from '@/services/webhooks'
import { createDeveloper, fetchDeveloperById } from '@/services/developers'
import {
  fetchBillings,
  fetchBillingsByMonth,
  FetchBillingsParams,
  FetchBillingsByMonthParams,
} from '@/services/billing'
import { getDeveloperId } from '@/utils/session'
import { notification } from '@reapit/elements'

export const developerCreate = function*({ data }: Action<CreateDeveloperModel>) {
  yield put(developerSetFormState('SUBMITTING'))

  try {
    const regResponse = yield call(createDeveloper, data)
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(developerSetFormState(status))
  } catch (err) {
    yield put(developerSetFormState('ERROR'))
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchMyIdentitySagas = function*() {
  try {
    const developerId = yield call(getDeveloperId)
    if (!developerId) {
      return
    }
    const developerIdentity = yield call(fetchDeveloperById, { id: developerId })
    if (developerIdentity) {
      yield put(setMyIdentity(developerIdentity))
    }
  } catch (err) {
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchBillingSagas = function*({ data }: Action<FetchBillingsParams>) {
  try {
    const billingResponse = yield call(fetchBillings, data)
    yield put(fetchBillingSuccess(billingResponse))
  } catch (err) {
    yield put(fetchBillingFailure(err))
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const fetchMonthlyBillingSagas = function*({ data }: Action<FetchBillingsByMonthParams>) {
  try {
    const billingResponse = yield call(fetchBillingsByMonth, data)
    yield put(fetchMonthlyBillingSuccess(billingResponse))
  } catch (err) {
    yield put(fetchMonthlyBillingFailure(err))
    yield call(notification.error, {
      message: err?.description ?? errorMessages.DEFAULT_SERVER_ERROR,
      placement: 'bottomRight',
    })
  }
}

export const developerWebhookPing = function*({ data }: Action<PingWebhooksByIdParams>) {
  try {
    yield put(developerSetWebhookPingStatus('LOADING'))
    yield call(pingWebhooksById, data)
    yield put(developerSetWebhookPingStatus('SUCCESS'))
  } catch (err) {
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
