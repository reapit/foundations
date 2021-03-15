import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { WebhookModal } from '@/reducers/webhooks-subscriptions/webhook-edit-modal'
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
} from '@/actions/webhooks-subscriptions'
import errorMessages from '@/constants/error-messages'
import { fetchWebhooksSubscriptionsSuccess, setApplicationId } from '@/actions/webhooks-subscriptions'
import {
  fetchWebhooksTopicsListApi,
  createWebhooksSubscription,
  updateWebhooksSubscriptionById,
  deleteWebhooksSubscriptionById,
  fetchWebhooksSubscriptionsListApi,
  fetchWebhooksSubscriptionById,
  PagedResultWebhookModel_,
} from '@/services/webhooks'
import { fetchInstallationsList } from '@/services/installations'
import { notification } from '@reapit/elements'

export const requestSubcriptionData = function* ({ data: applicationId }: Action<string>) {
  yield put(setApplicationId(applicationId))
  try {
    const [subcriptionTopics, subcriptionCustomers] = yield all([
      call(fetchWebhooksTopicsListApi, { applicationId }),
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
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const createNewWebhook = function* ({ data }: Action<CreateWebhookParams>) {
  try {
    const createResponse = yield call(createWebhooksSubscription, data)
    let newListResponse = false
    if (createResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchWebhooksSubscriptionsListApi, { applicationId: [applicationId] })
    }
    if (newListResponse) {
      yield put(fetchWebhooksSubscriptionsSuccess(newListResponse as PagedResultWebhookModel_))
    }
  } catch (err) {
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const editWebhook = function* ({ data }: Action<EditWebhookParams>) {
  try {
    const editResponse = yield call(updateWebhooksSubscriptionById, { id: data.webhookId, ...data })
    let newListResponse = false
    if (editResponse) {
      yield put(webhookSetOpenModal(''))
      const { applicationId } = data
      newListResponse = yield call(fetchWebhooksSubscriptionsListApi, { applicationId: [applicationId] })
    }
    if (newListResponse) {
      yield put(fetchWebhooksSubscriptionsSuccess(newListResponse as PagedResultWebhookModel_))
    }
  } catch (err) {
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const deleteWebhook = function* ({ data }: Action<DeleteWebhookParams>) {
  try {
    const { webhookId, applicationId } = data
    const deleteResponse = yield call(deleteWebhooksSubscriptionById, { id: webhookId })
    let newListResponse = false
    if (deleteResponse) {
      yield put(webhookSetOpenModal(''))
      newListResponse = yield call(fetchWebhooksSubscriptionsListApi, { applicationId: [applicationId] })
    }
    if (newListResponse) {
      yield put(fetchWebhooksSubscriptionsSuccess(newListResponse as PagedResultWebhookModel_))
    }
  } catch (err) {
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const requestWebhookData = function* ({ data: webhookId }: Action<string>) {
  try {
    const data: WebhookModal = yield call(fetchWebhooksSubscriptionById, { id: webhookId })
    const { applicationId } = data
    yield put(requestWebhookReceiveData(data))
    yield put(requestWebhookSubcriptionData(applicationId))
  } catch (err) {
    yield put(requestWebhookReceiveDataFailure())
    notification.error({
      message: err?.description || errorMessages.DEFAULT_SERVER_ERROR,
    })
  }
}

export const requestWebhookSupcriptionDataListen = function* () {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_EDIT_SUBCRIPTION_REQUEST_DATA, requestSubcriptionData)
}

export const createWebhookListen = function* () {
  yield takeLatest<Action<CreateWebhookParams>>(ActionTypes.WEBHOOK_CREATE, createNewWebhook)
}

export const editWebhookListen = function* () {
  yield takeLatest<Action<EditWebhookParams>>(ActionTypes.WEBHOOK_EDIT, editWebhook)
}

export const requestWebhookDataListen = function* () {
  yield takeLatest<Action<string>>(ActionTypes.WEBHOOK_REQUEST_DATA, requestWebhookData)
}

export const deleteWebhookListen = function* () {
  yield takeLatest<Action<DeleteWebhookParams>>(ActionTypes.WEBHOOK_DELETE, deleteWebhook)
}

export const webhooksEditSubscription = function* () {
  yield all([
    fork(requestWebhookSupcriptionDataListen),
    fork(createWebhookListen),
    fork(editWebhookListen),
    fork(requestWebhookDataListen),
    fork(deleteWebhookListen),
  ])
}
