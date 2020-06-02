import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '../types/core'
import ActionTypes from '../constants/action-types'
import { WebhookModal } from '@/reducers/webhook-edit-modal'
import {
  requestWebhookSubcriptionReceiveFailure,
  requestWebhookSubcriptionReceiveData,
  CreateWebhookParams,
  EditWebhookParams,
  requestWebhookReceiveData,
  requestWebhookReceiveDataFailure,
  requestWebhookSubcriptionData,
  DeleteWebhookParams,
  webhookSetOpenModal,
} from '@/actions/webhook-edit-modal'
import { logger } from '@reapit/utils'
import errorMessages from '../constants/error-messages'
import { errorThrownServer } from '../actions/error'
import { webhookSubscriptionsReceiveData, setApplicationId } from '@/actions/webhook-subscriptions'
import { PagedResultWebhookModel_ } from '@/reducers/webhook-subscriptions'
import {
  fetchWebhooksTopicsList,
  createWebhooksSubscription,
  updateWebhooksSubscriptionById,
  deleteWebhooksSubscriptionById,
  fetchWebhooksSubscriptionsList,
  fetchWebhooksSubscriptionById,
} from '@/services/webhooks'
import { fetchInstallationsList } from '@/services/installations'

export const requestSupcriptionData = function*({ data: applicationId }: Action<string>) {
  yield put(setApplicationId(applicationId))
  try {
    const [subcriptionTopics, subcriptionCustomers] = yield all([
      call(fetchWebhooksTopicsList, { applicationId }),
      call(fetchInstallationsList, { appId: [applicationId] }),
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
    const createResponse = yield call(createWebhooksSubscription, data)
    let newListResponse = false
    if (createResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchWebhooksSubscriptionsList, { applicationId: [applicationId] })
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
    const editResponse = yield call(updateWebhooksSubscriptionById, { id: data.webhookId, ...data })
    let newListResponse = false
    if (editResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchWebhooksSubscriptionsList, { applicationId: [applicationId] })
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
    const deleteResponse = yield call(deleteWebhooksSubscriptionById, { id: webhookId })
    let newListResponse = false
    if (deleteResponse) {
      yield put(webhookSetOpenModal(''))
      newListResponse = yield call(fetchWebhooksSubscriptionsList, { applicationId: [applicationId] })
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
    const data: WebhookModal = yield call(fetchWebhooksSubscriptionById, { id: webhookId })
    const { applicationId } = data
    yield put(requestWebhookReceiveData(data))
    yield put(requestWebhookSubcriptionData(applicationId))
  } catch (err) {
    logger(err)
    yield put(requestWebhookReceiveDataFailure())
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
