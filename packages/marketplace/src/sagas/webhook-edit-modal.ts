import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import { WebhookModal } from '@/reducers/webhook-edit-modal'
import {
  webhookEditLoading,
  requestWebhookSubcriptionReceiveFailure,
  requestWebhookSubcriptionReceiveData,
  SubscriptionCustomersRequestParams,
  SubscriptionTopicsRequestParams,
  CreateWebhookParams,
  EditWebhookParams,
  requestWebhookReceiveData,
  requestWebhookReceiveDataFailure,
  requestWebhookSubcriptionData,
  FetchWebhookRequestParams,
  DeleteWebhookParams,
  DeleteWebhookRequestParams,
  webhookSetOpenModal,
} from '@/actions/webhook-edit-modal'
import { logger } from 'logger'
import errorMessages from '../constants/error-messages'
import { errorThrownServer } from '../actions/error'
import { initAuthorizedRequestHeaders } from '@/constants/api'
import { fetcher, setQueryParams } from '@reapit/elements'
import { URLS, generateHeader } from '../constants/api'
import { fetchSubscriptions } from './webhook-subscriptions'
import { webhookSubscriptionsReceiveData, setApplicationId } from '@/actions/webhook-subscriptions'
import { PagedResultWebhookModel_ } from '@/reducers/webhook-subscriptions'

export const fetchWebhookSubscriptionTopics = async (params: SubscriptionTopicsRequestParams) => {
  try {
    const { applicationId, headers } = params
    const response = await fetcher({
      url: `${URLS.webhook}/topics?${setQueryParams({ applicationId })}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhookSubscriptionCustomers = async (params: SubscriptionCustomersRequestParams) => {
  try {
    const { AppId } = params
    const response = await fetcher({
      url: `${URLS.installations}?${setQueryParams({ AppId })}`,
      api: window.reapit.config.marketplaceApiUrl,
      method: 'GET',
      headers: generateHeader(window.reapit.config.marketplaceApiKey),
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const fetchWebhookData = async (params: FetchWebhookRequestParams) => {
  try {
    const { webhookId, headers } = params
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions/${webhookId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const postCreateWebhook = async (params: CreateWebhookParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const response = await fetcher({
      url: `${URLS.webhookSubscriptions}`,
      api: window.reapit.config.platformApiUrl,
      method: 'POST',
      headers: headers,
      body: params,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const putEditWebhook = async (params: EditWebhookParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { webhookId, ...rest } = params
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions/${webhookId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'PUT',
      headers: headers,
      body: rest,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const deleteEditWebhook = async (params: DeleteWebhookRequestParams) => {
  try {
    const headers = await initAuthorizedRequestHeaders()
    const { webhookId } = params
    const response = await fetcher({
      url: `${URLS.webhook}/subscriptions/${webhookId}`,
      api: window.reapit.config.platformApiUrl,
      method: 'DELETE',
      headers: headers,
    })
    return response
  } catch (error) {
    logger(error)
    throw new Error(error)
  }
}

export const requestSupcriptionData = function*({ data: applicationId }: Action<string>) {
  yield put(webhookEditLoading(true))
  yield put(setApplicationId(applicationId))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const [subcriptionTopics, subcriptionCustomers] = yield all([
      call(fetchWebhookSubscriptionTopics, { applicationId, headers }),
      call(fetchWebhookSubscriptionCustomers, { AppId: applicationId }),
    ])
    if (subcriptionCustomers && subcriptionTopics) {
      yield put(
        requestWebhookSubcriptionReceiveData({
          subcriptionCustomers,
          subcriptionTopics,
        }),
      )
    } else {
      yield put(requestWebhookSubcriptionReceiveFailure())
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

export const createNewWebhook = function*({ data }: Action<CreateWebhookParams>) {
  try {
    const createResponse = yield call(postCreateWebhook, data)
    let newListResponse = false
    if (createResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchSubscriptions, applicationId)
    }
    if (newListResponse) {
      yield put(webhookSubscriptionsReceiveData(newListResponse as PagedResultWebhookModel_))
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

export const editWebhook = function*({ data }: Action<EditWebhookParams>) {
  try {
    const editResponse = yield call(putEditWebhook, data)
    let newListResponse = false
    if (editResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchSubscriptions, applicationId)
    }
    if (newListResponse) {
      yield put(webhookSubscriptionsReceiveData(newListResponse as PagedResultWebhookModel_))
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

export const deleteWebhook = function*({ data }: Action<DeleteWebhookParams>) {
  try {
    const { webhookId, applicationId } = data
    const headers = yield call(initAuthorizedRequestHeaders)
    const deleteResponse = yield call(deleteEditWebhook, { webhookId, headers })
    let newListResponse = false
    if (deleteResponse) {
      yield put(webhookSetOpenModal(''))
      newListResponse = yield call(fetchSubscriptions, applicationId)
    }
    if (newListResponse) {
      yield put(webhookSubscriptionsReceiveData(newListResponse as PagedResultWebhookModel_))
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

export const requestWebhookData = function*({ data: webhookId }: Action<string>) {
  try {
    yield put(webhookEditLoading(true))
    const headers = yield call(initAuthorizedRequestHeaders)
    const data: WebhookModal = yield call(fetchWebhookData, { webhookId, headers })
    if (data) {
      const { applicationId } = data
      yield put(requestWebhookReceiveData(data))
      yield put(requestWebhookSubcriptionData(applicationId))
    } else {
      yield put(requestWebhookReceiveDataFailure())
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

export const requestWebhookSupcriptionDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA, requestSupcriptionData)
}

export const createWebhookListen = function*() {
  yield takeLatest<Action<CreateWebhookParams>>(ActionTypes.WEBHOOK_CREATE, createNewWebhook)
}

export const editWebhookListen = function*() {
  yield takeLatest<Action<EditWebhookParams>>(ActionTypes.WEBHOOK_EDIT, editWebhook)
}

export const requestWebhookDataListen = function*() {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_REQUEST_DATA, requestWebhookData)
}

export const deleteWebhookListen = function*() {
  yield takeLatest<Action<DeleteWebhookParams>>(ActionTypes.WEBHOOK_DELETE, deleteWebhook)
}

const developerWebhookSagas = function*() {
  yield all([
    fork(requestWebhookSupcriptionDataListen),
    fork(createWebhookListen),
    fork(editWebhookListen),
    fork(requestWebhookDataListen),
    fork(deleteWebhookListen),
  ])
}

export default developerWebhookSagas
