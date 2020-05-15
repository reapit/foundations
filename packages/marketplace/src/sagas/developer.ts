import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { logger } from 'logger'
import {
  developerLoading,
  developerReceiveData,
  developerSetFormState,
  developerRequestDataFailure,
  setMyIdentity,
  fetchBillingSuccess,
  fetchBillingFailure,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
  developerSetWebhookPingStatus,
} from '@/actions/developer'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { DeveloperItem, DeveloperRequestParams } from '@/reducers/developer'
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import { selectDeveloperId } from '@/selector'
import { PingWebhooksByIdParams, pingWebhooksById } from '@/services/webhooks'
import { fetchAppsList } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { createDeveloper, fetchDeveloperById } from '@/services/developers'
import {
  fetchBillings,
  fetchBillingsByMonth,
  FetchBillingsParams,
  FetchBillingsByMonthParams,
} from '@/services/traffic-events'

export const developerDataFetch = function*({ data }) {
  yield put(developerLoading(true))

  try {
    const developerId = yield select(selectDeveloperId)

    if (!developerId) {
      throw new Error('Developer id does not exist in state')
    }

    const { page, appsPerPage = APPS_PER_PAGE } = data
    const [appsData, scopes] = yield all([
      call(fetchAppsList, { developerId, pageNumber: page, pageSize: appsPerPage }),
      call(fetchScopesList),
    ])

    const developerData: DeveloperItem = {
      data: appsData,
      scopes,
    }
    if (developerData.data && developerData.scopes) {
      yield put(developerReceiveData(developerData))
    } else {
      yield put(developerRequestDataFailure())
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
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  }
}

export const fetchMyIdentitySagas = function*() {
  try {
    yield put(developerLoading(true))
    const developerId = yield select(selectDeveloperId)
    const developerIdentity = yield call(fetchDeveloperById, { id: developerId })
    if (developerIdentity) {
      yield put(setMyIdentity(developerIdentity))
    }
    yield put(developerLoading(false))
  } catch (err) {
    logger(err)
    yield put(developerLoading(false))
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
    const billingResponse = yield call(fetchBillingsByMonth, { ...data, applicationId: data.applicationId })
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

export const developerRequestDataListen = function*() {
  yield takeLatest<Action<DeveloperRequestParams>>(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
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
    fork(developerRequestDataListen),
    fork(developerCreateListen),
    fork(fetchMyIdentitySagasListen),
    fork(fetchBillingSagasListen),
    fork(fetchMonthlyBillingSagasListen),
    fork(developerWebhookPingListen),
  ])
}

export default developerSagas
