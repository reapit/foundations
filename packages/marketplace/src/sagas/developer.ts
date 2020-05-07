import { fetcher } from '@reapit/elements'
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
} from '@/actions/developer'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { DeveloperItem, DeveloperRequestParams } from '@/reducers/developer'
import { errorThrownServer } from '@/actions/error'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { URLS, generateHeader } from '@/constants/api'
import { Action } from '@/types/core'
import { selectDeveloperId } from '@/selector'
import api, { FetchBillingParams } from './api'

export const developerDataFetch = function*({ data }) {
  yield put(developerLoading(true))

  try {
    const developerId = yield select(selectDeveloperId)

    if (!developerId) {
      throw new Error('Developer id does not exist in state')
    }

    const { page, appsPerPage = APPS_PER_PAGE } = data
    const [appsData, scopes] = yield all([
      call(fetcher, {
        url: `${URLS.apps}?developerId=${developerId}&PageNumber=${page}&PageSize=${appsPerPage}`,
        method: 'GET',
        api: window.reapit.config.marketplaceApiUrl,
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      }),
      call(fetcher, {
        url: `${URLS.scopes}`,
        method: 'GET',
        api: window.reapit.config.marketplaceApiUrl,
        headers: generateHeader(window.reapit.config.marketplaceApiKey),
      }),
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
    const regResponse: true | undefined = yield call(fetcher, {
      url: URLS.developers,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'POST',
      body: data,
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
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
    const developerIdentity = yield call(api.fetchMyIdentity, developerId)
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

export const fetchBillingSagas = function*({ data }: Action<FetchBillingParams>) {
  try {
    const billingResponse = yield call(api.fetchBilling, data)
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

const developerSagas = function*() {
  yield all([
    fork(developerRequestDataListen),
    fork(developerCreateListen),
    fork(fetchMyIdentitySagasListen),
    fork(fetchBillingSagasListen),
  ])
}

export default developerSagas
