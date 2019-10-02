import { fetcher } from '@reapit/elements'
import { put, fork, takeLatest, all, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { URLS, REAPIT_API_BASE_URL, UPLOAD_FILE_BASE_URL } from '@/constants/api'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { errorThrownServer } from '../actions/error'
import {
  checklistDetailLoading,
  checklistDetailReceiveData,
  checkListDetailSubmitForm,
  checkListDetailHideModal,
  checklistDetailRequestData,
  checkListDetailUpdateData
} from '../actions/checklist-detail'
import errorMessages from '../constants/error-messages'
import { ContactModel, AddressModel } from '@/types/contact-api-schema'

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
    yield put(checklistDetailLoading(false))
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
      yield put(checklistDetailRequestData(id as string))
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

export const uploadImage = async ({ name, imageData, headers }) => {
  try {
    const responseUploadImage = await fetcher({
      url: '/',
      api: UPLOAD_FILE_BASE_URL,
      method: 'POST',
      headers: headers,
      body: {
        name,
        imageData
      }
    })
    return responseUploadImage
  } catch (err) {
    console.error(err.message)
    return err
  }
}

export type AddressMetaModel = {
  year?: string
  month?: string
  documentType?: string
  documentFileInput?: string
}

export const mapArrAddressToUploadImageFunc = ({ addresses, headers, addressesMeta }): Promise<any>[] => {
  if (!addresses || !addressesMeta) {
    return []
  }
  return addresses.map((address: AddressModel, index) => {
    if (!addressesMeta[index].documentFileInput) {
      return null
    }
    return uploadImage({
      headers,
      name: `${address.type}-${address.buildingNumber}-${address.buildingName}-${address.postcode}`,
      imageData: addressesMeta[index].documentFileInput
    })
  })
}

export const mapAddressToMetaData = ({ addressesMeta, responseUploadImages }) => {
  if (!addressesMeta) {
    return []
  }
  return addressesMeta.map((addressMeta, index) => {
    return {
      documentImage:
        responseUploadImages && responseUploadImages[index] && responseUploadImages[index].Url
          ? responseUploadImages[index].Url
          : addressMeta.documentImage,
      year: addressMeta.year,
      month: addressMeta.month,
      documentType: addressMeta.documentType
    }
  })
}

export const updateAddressHistory = function*({ data: { id, addresses, metadata } }: UpdateAddressHistoryParams) {
  yield put(checkListDetailSubmitForm(true))
  const headers = yield call(initAuthorizedRequestHeaders)
  try {
    const addressesMeta = metadata && metadata.addresses
    const uploadImageFunc = mapArrAddressToUploadImageFunc({ headers, addresses, addressesMeta })
    const responseUploadImages = yield all(uploadImageFunc)
    const addressMeta = mapAddressToMetaData({ addressesMeta, responseUploadImages })
    if (responseUploadImages) {
      yield put(checkListDetailUpdateData({ id, addresses, metadata: { addresses: addressMeta } }))
    }
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
