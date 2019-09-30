import { fetcher } from '@reapit/elements'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS, REAPIT_API_BASE_URL } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm,
  checkListDetailHideModal
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import { ContactModel } from '@/types/contact-api-schema'

export const checklistDetailDataFetch = function*({ data: id }) {
  yield put(checklistDetailLoading(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const response = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: headers
    })
    yield put(checklistDetailReceiveData({ contact: response }))
  } catch (err) {
    console.error(err.message)
    yield put(checklistDetailLoading(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export type UpdateCheckListDetailParams = {
  data: ContactModel
}

export const updateChecklistDetail = function*({ data: { id, ...rest } }: UpdateCheckListDetailParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: { ...rest }
    })
    if (responseUpdate) {
      const response = yield call(fetcher, {
        url: `${URLS.contacts}/${id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: headers
      })
      yield put(checklistDetailReceiveData({ contact: response }))
    }
    yield put(checkListDetailSubmitForm(false))
    yield put(checkListDetailHideModal())
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export type UpdateAddressHistoryParams = {
  data: ContactModel
}

export const updateAddressHistory = function*({ data: { id, addresses } }: UpdateAddressHistoryParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    // const responseUploadImage = yield call(fetcher, {
    //   url: '/',
    //   api: UPLOAD_FILE_BASE_URL,
    //   method: 'POST',
    //   headers: headers,
    //   body: {
    //     name: 'abc',
    //     imageData: addresses.documentFileInput
    //   }
    // })
    // if (responseUploadImage) {
    const responseUpdate = yield call(fetcher, {
      url: `${URLS.contacts}/${id}`,
      api: REAPIT_API_BASE_URL,
      method: 'PATCH',
      headers: headers,
      body: {
        addresses
      }
    })
    if (responseUpdate) {
      const response = yield call(fetcher, {
        url: `${URLS.contacts}/${id}`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: headers
      })
      yield put(checklistDetailReceiveData({ contact: response }))
    }
    // }
    yield put(checkListDetailSubmitForm(false))
  } catch (err) {
    console.error(err.message)
    yield put(checkListDetailSubmitForm(false))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const checklistDetailDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.CHECKLIST_DETAIL_REQUEST_DATA, checklistDetailDataFetch)
}

export const checkListDetailUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_UPDATE_DATA, updateChecklistDetail)
}

export const checkListDetailAddressUpdateListen = function*() {
  yield takeLatest<Action<ContactModel>>(ActionTypes.CHECKLIST_DETAIL_ADDRESS_UPDATE_DATA, updateAddressHistory)
}

export const checklistDetailSagas = function*() {
  yield all([
    fork(checklistDetailDataListen),
    fork(checkListDetailUpdateListen),
    fork(checkListDetailAddressUpdateListen)
  ])
}

export default checklistDetailSagas
